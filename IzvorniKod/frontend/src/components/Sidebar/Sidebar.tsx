import { Dispatch, SetStateAction, useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Input, Menu, message, Popover } from "antd";
import {
  ArrowTurnDownRightIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { EventsDataType } from "../../pages/Events/hooks/useGetEvents.hook";
import { useNavigate } from "@tanstack/react-router";
import { eventsRoute } from "../../routes/events.routes";
import { facultySubjectsRoute } from "../../routes/faculty-subjects.routes";
import { SelectedFacultiesDataType } from "../../layouts/SidebarLayout/hooks/useGetSelectedFaculties.hook";

import { CreateEventModal } from "../CreateEventModal/CreateEventModal.component";
import { usePostFacultyYear } from "./hooks/usePostFacultyYear.hook";
import { useDeleteFacultyYear } from "./hooks/useDeleteFacultyYear.hook";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "../../utils/cn.util";
import { useDeleteFaculty } from "./hooks/useDeleteFaculty.hooks";
import { usePostCreateNewFaculty } from "./hooks/usePostCreateNewFaculty.hook";

type SidebarType = {
  list: SelectedFacultiesDataType[];
  events: EventsDataType;
  onYearSelect?: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ list, events, onYearSelect }: SidebarType) => {
  const [current, setCurrent] = useState<string | null>(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isCreatingFacultyYearFacultyId, setIsCreatingFacultyYearFacultyId] =
    useState<number | undefined>();
  const [newFacultyYearTitle, setNewFacultyYearTitle] = useState<
    string | undefined
  >();

  const [newFacultyTitle, setNewFacultyTitle] = useState<string | undefined>();
  const [isCreatingFacultyActive, setIsCreatingFacultyActive] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isAppAdmin = list[0]?.canEditFaculty == true;

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const { mutate: postFacultyYear } = usePostFacultyYear({
    onSuccess: () => {
      setIsCreatingFacultyYearFacultyId(undefined);
      setNewFacultyYearTitle(undefined);
      queryClient.invalidateQueries({
        queryKey: ["selected-faculties"],
      });
    },
  });

  const { mutate: deleteFacultyYear } = useDeleteFacultyYear({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selected-faculties"],
      });
    },
  });

  const { mutate: deleteFaculty } = useDeleteFaculty({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selected-faculties"],
      });
    },
  });

  const { mutate: createFaculty } = usePostCreateNewFaculty({
    onSuccess: () => {
      message.info("Faculty created successfully");
      queryClient.invalidateQueries({ queryKey: ["selected-faculties"] });
      setIsCreatingFacultyActive(false);
    },
  });

  const menuItems: MenuProps["items"] = [
    {
      key: "faculties",
      label: "Faculties",
      children: list.map((faculty) => ({
        key: `faculty-${faculty.facultyId}`,
        label: (
          <div className="flex justify-between w-max-[250px]">
            <p className="truncate w-32">{faculty.title}</p>
            {faculty.canEditFaculty && (
              <Popover
                arrow={false}
                content={
                  <button
                    onClick={() => {
                      deleteFaculty(faculty.facultyId);
                    }}
                    className="cursor-pointer text-red z-10"
                  >
                    Remove
                  </button>
                }
                trigger="click"
                className="w-[25px]"
              >
                <EllipsisVerticalIcon className="cursor-pointer" />
              </Popover>
            )}
          </div>
        ),
        children: [
          ...faculty.facultyYears.map((year) => ({
            key: `year-${year.yearId}`,
            label: (
              <div
                className="flex justify-between w-max-[250px]"
                onClick={() => {
                  if (onYearSelect != undefined) onYearSelect(false);
                  navigate({
                    to: facultySubjectsRoute.to,
                    params: {
                      facultyId: faculty.facultyId,
                      yearId: year.yearId,
                    },
                  });
                }}
              >
                <p className="truncate w-32">{year.yearName}</p>
                {faculty.canEditFacultyYear && (
                  <button className="cursor-pointer text-red ">
                    <TrashIcon
                      className="w-5 h-5"
                      onClick={() => {
                        deleteFacultyYear({
                          yearId: year.yearId,
                        });
                      }}
                    />
                  </button>
                )}
              </div>
            ),
          })),
          faculty.canEditFacultyYear && {
            key: `faculty-${faculty.facultyId}-add-year`,
            label: (
              <>
                {isCreatingFacultyYearFacultyId == faculty.facultyId ? (
                  <Input
                    placeholder="Create faculty year"
                    onChange={(e) => setNewFacultyYearTitle(e.target.value)}
                    suffix={
                      <button className={cn("w-5 h-5")}>
                        {newFacultyYearTitle ? (
                          <CheckIcon
                            className="w-5 h-5"
                            onClick={() => {
                              postFacultyYear({
                                facultyId: faculty.facultyId,
                                title: newFacultyYearTitle ?? "",
                              });

                              setNewFacultyTitle(undefined);
                              setIsCreatingFacultyYearFacultyId(undefined);
                            }}
                          />
                        ) : (
                          <ArrowTurnDownRightIcon
                            className="w-5 h-5"
                            color="gray"
                            onClick={() => {
                              setIsCreatingFacultyYearFacultyId(undefined);
                            }}
                          />
                        )}
                      </button>
                    }
                  />
                ) : (
                  <p
                    className="w-full"
                    onClick={() => {
                      setIsCreatingFacultyYearFacultyId(faculty.facultyId);
                    }}
                  >
                    + Add Year
                  </p>
                )}
              </>
            ),
          },
        ],
      })),
    },
    {
      key: "events",
      label: "Events",
      children: [
        ...events.map((event, index) => ({
          key: `event-${index}`,
          label: event.title,
          onClick: () => navigate({ to: eventsRoute.fullPath }),
        })),
        {
          key: `faculty-add-event`,
          label: (
            <p
              onClick={() => {
                setIsCreateEventModalOpen(true);
              }}
            >
              + Add Event
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <div className="w-[250px] ">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorText: "black",
              fontSize: 16,
              itemSelectedColor: "black",
              itemSelectedBg: "#ececec",
            },
          },
        }}
      >
        <div className="overflow-y-auto max-h-[39rem] max-[750px]:max-h-[30rem]">
          <Menu
            className="max-[500px]:w-full"
            onClick={handleClick}
            selectedKeys={current ? [current] : []}
            mode="inline"
            items={menuItems}
          />
        </div>
      </ConfigProvider>
      {isAppAdmin && (
        <div className="px-4 mt-2">
          {isCreatingFacultyActive ? (
            <Input
              placeholder="Create faculty"
              className=" w-full"
              onChange={(e) => setNewFacultyTitle(e.target.value)}
              suffix={
                <button className={cn("w-5 h-5")}>
                  {newFacultyTitle ? (
                    <CheckIcon
                      className="w-5 h-5"
                      onClick={() => {
                        createFaculty({ title: newFacultyTitle ?? "" });
                        setNewFacultyTitle(undefined);
                      }}
                    />
                  ) : (
                    <ArrowTurnDownRightIcon
                      className="w-5 h-5"
                      color="gray"
                      onClick={() => {
                        setIsCreatingFacultyActive(false);
                      }}
                    />
                  )}
                </button>
              }
            />
          ) : (
            <p
              className=" w-full p-0 cursor-pointer ml-4"
              onClick={() => setIsCreatingFacultyActive(true)}
            >
              + Create Faculty
            </p>
          )}
        </div>
      )}
      {isCreateEventModalOpen && (
        <CreateEventModal setState={setIsCreateEventModalOpen} />
      )}
    </div>
  );
};

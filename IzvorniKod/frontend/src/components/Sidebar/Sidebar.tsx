import { useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu, Popover } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { EventsDataType } from "../../pages/Events/hooks/useGetEvents.hook";
import { useNavigate } from "@tanstack/react-router";
import { eventsRoute } from "../../routes/events.routes";
import { facultySubjectsRoute } from "../../routes/faculty-subjects.routes";
import { SelectedFacultiesDataType } from "../../layouts/SidebarLayout/hooks/useGetSelectedFaculties.hook";

import { CreateEventModal } from "../CreateEventModal/CreateEventModal.component";

type SidebarType = {
  list: SelectedFacultiesDataType[];
  events: EventsDataType;
};

export const Sidebar = ({ list, events }: SidebarType) => {
  const [current, setCurrent] = useState<string | null>(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrent(`faculty-${e.key}`);
  };

  const addYear = (facultyId: number) => {
    console.log("add faculty year");
  };

  const content = (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cursor-pointer text-red"
      >
        Remove
      </button>
    </div>
  );

  const menuItems: MenuProps["items"] = [
    {
      key: "faculties",
      label: "Faculties",
      children: list.map((faculty) => ({
        key: `faculty-${faculty.facultyId}`,
        label: (
          <div className="flex justify-between w-[250px]">
            <p className="truncate">{faculty.title}</p>
            {faculty.canEditFaculty && (
              <Popover
                arrow={false}
                content={content}
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
                className="flex justify-between w-[250px]"
                onClick={() =>
                  navigate({
                    to: facultySubjectsRoute.to,
                    params: {
                      facultyId: faculty.facultyId,
                      yearId: year.yearId,
                    },
                  })
                }
              >
                <p className="truncate">{year.yearName ?? "asd"}</p>
                {faculty.canEditFacultyYear && (
                  <Popover
                    arrow={false}
                    content={content}
                    trigger="click"
                    className="w-[25px]"
                  >
                    <EllipsisVerticalIcon className="cursor-pointer" />
                  </Popover>
                )}
              </div>
            ),
          })),
          {
            key: `faculty-${faculty.facultyId}-add-year`,
            label: (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  addYear(faculty.facultyId);
                }}
              >
                + Add Year
              </p>
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
              onClick={(e) => {
                e.stopPropagation();
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
    <div className="min-w-[250px] h-screen">
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
        <Menu
          className="max-[500px]:w-full"
          onClick={handleClick}
          selectedKeys={current ? [current] : []}
          mode="inline"
          items={menuItems}
        />
      </ConfigProvider>
      {isCreateEventModalOpen && (
        <CreateEventModal setState={setIsCreateEventModalOpen} />
      )}
    </div>
  );
};

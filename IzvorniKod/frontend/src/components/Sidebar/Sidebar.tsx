import { useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu, Popover } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { EventsDataType } from "../../pages/Events/hooks/useGetEvents.hook";
import { useNavigate } from "@tanstack/react-router";
import { eventsRoute } from "../../routes/events.routes";
import { facultySubjectsRoute } from "../../routes/faculty-subjects.routes";

type FacultyComponent = {
  facultyId: number;
  title: string;
  canEditFaculty: boolean;
  canEditFacultyYear: boolean;
};

type SidebarType = {
  list: FacultyComponent[];
  events: EventsDataType;
};

export const Sidebar = ({ list, events }: SidebarType) => {
  const [current, setCurrent] = useState<string>("0");
  const [facultyYears, setFacultyYears] = useState<Record<number, string[]>>(
    list.reduce((acc, faculty) => {
      acc[faculty.facultyId] = ["Year 1", "Year 2"];
      return acc;
    }, {} as Record<number, string[]>)
  );

  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const addYear = (facultyId: number) => {
    setFacultyYears((prev) => ({
      ...prev,
      [facultyId]: [...prev[facultyId], `Year ${prev[facultyId].length + 1}`],
    }));
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
          ...facultyYears[faculty.facultyId].map((year, index) => ({
            key: `faculty-${faculty.facultyId}-year-${index}`,
            label: (
              <div
                className="flex justify-between w-[250px]"
                onClick={() =>
                  navigate({
                    to: facultySubjectsRoute.to,
                    // replace hardcoded year with actual year
                    params: { facultyId: faculty.facultyId, yearId: 1 },
                  })
                }
              >
                <p className="truncate">{year}</p>
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
      children: events.map((event, index) => ({
        key: `event-${index}`,
        label: event.title,
        onClick: () => navigate({ to: eventsRoute.fullPath }),
      })),
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
          selectedKeys={[current]}
          mode="inline"
          items={menuItems}
        />
      </ConfigProvider>
    </div>
  );
};

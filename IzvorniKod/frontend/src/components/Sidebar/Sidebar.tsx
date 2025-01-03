import { useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu, Popover } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

type FacultyComponent = {
  facultyId: number;
  title: string;
  canEditFaculty: boolean;
  canEditFacultyYear: boolean;
};

type SidebarType = {
  list: FacultyComponent[];
  events: string[];
};

export const Sidebar = ({ list, events }: SidebarType) => {
  const [current, setCurrent] = useState<string>("0");
  const [facultyYears, setFacultyYears] = useState<Record<number, string[]>>(
    list.reduce((acc, faculty) => {
      acc[faculty.facultyId] = ["Year 1", "Year 2"];
      return acc;
    }, {} as Record<number, string[]>)
  );

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
        className="cursor-pointer"
      >
        Edit
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
          <div className="flex justify-between w-[400px]">
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
            label: year,
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
        label: event,
      })),
    },
  ];

  return (
    <div>
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
          //expandIcon={null}
          onClick={handleClick}
          style={{
            borderRadius: "20px",
          }}
          selectedKeys={[current]}
          mode="inline"
          items={menuItems}
        />
      </ConfigProvider>
    </div>
  );
};

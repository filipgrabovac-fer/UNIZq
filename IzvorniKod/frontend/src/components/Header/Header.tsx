import { Popover } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";

export const sidebarDataMock = [
  {
    key: "faculties",
    label: "Faculties",
    children: [
      {
        key: "fer1",
        label: "FER",
        children: [
          { key: 1, label: "First Year" },
          { key: 2, label: "Second Year" },
          { key: 3, label: "Third Year" },
        ],
      },
      {
        key: "pmf1",
        label: "PMF",
        children: [
          { key: 4, label: "First Year" },
          { key: 5, label: "Second Year" },
          { key: 6, label: "Third Year" },
        ],
      },
      {
        key: "fsb1",
        label: "FSB",
        children: [
          { key: 7, label: "First Year" },
          { key: 8, label: "Second Year" },
          { key: 9, label: "Third Year" },
        ],
      },
    ],
  },
];

const dropdownTabs = [
  { link: "/events", label: "Events" },
  { link: "/profile", label: "View profile" },
  {
    link: "/login",
    label: "Logout",
  },
];
type HeaderType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderType) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-between bg-primary text-white h-[60px] align-middle pl-8 pr-4">
      <div className="min-[500px]:hidden flex">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <XMarkIcon width={25} height={25} />
          ) : (
            <Bars3Icon width={25} height={25} />
          )}
        </button>
      </div>

      <Link to="/" className="text-md my-auto">
        eduChat
      </Link>

      <Popover
        arrow={false}
        placement="bottomLeft"
        content={
          <div className="flex flex-col px-2 gap-2">
            {dropdownTabs.map((tab, i) => (
              <Link key={i} to={tab.link} className="w-full text-left">
                {tab.label}
              </Link>
            ))}
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <UserCircleIcon className="w-[25px] h-[25px] cursor-pointer my-auto" />
      </Popover>
    </div>
  );
};

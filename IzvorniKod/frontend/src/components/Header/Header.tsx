import { Menu, Popover } from "antd";
import { useState } from "react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn.util";

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

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-between bg-primary text-white h-[60px] align-middle pl-8 pr-4 sticky ">
      <div className="min-[500px]:hidden flex">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <XMarkIcon width={25} height={25} />
          ) : (
            <Bars3Icon width={25} height={25} />
          )}
        </button>
        <div
          className={cn(
            "absolute left-0 top-[60px] w-full h-screen bg-white",
            isSidebarOpen ? "" : "hidden"
          )}
        >
          <Menu
            mode="inline"
            items={sidebarDataMock}
            onSelect={() => setIsSidebarOpen(false)} // dodati funkcionalnost za odabir godine pojedinog faksa
          />
        </div>
      </div>

      <Link to="/" className="text-md my-auto">
        eduChat
      </Link>

      <Popover
        arrow={false}
        placement="bottomLeft"
        content={
          <div className="flex flex-col px-2 gap-2">
            <Link to="/profile" className="w-full text-left">
              View Profile
            </Link>
            <Link to="/login" className="w-full text-left">
              Logout
            </Link>
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <button>
          <UserCircleIcon className="w-[25px] h-[25px]" />
        </button>
      </Popover>
    </div>
  );
};

import { Button, Popover } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "@tanstack/react-router";

type HeaderType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderType) => {
  const navigate = useNavigate();

  const dropdownTabs = [
    { onClick: () => navigate({ to: "/events" }), label: "Events" },
    { onClick: () => navigate({ to: "/profile" }), label: "Profile" },
    { onClick: () => navigate({ to: "/users" }), label: "Users" },
    {
      onClick: () => {
        localStorage.removeItem("token");
        document.cookie =
          "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure";
        navigate({ to: "/login" });
      },
      label: "Logout",
    },
  ];
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="sticky top-0 z-10 flex justify-between bg-primary text-white h-[60px] align-middle pl-8 pr-4">
      <div className="min-[501px]:hidden flex">
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
              <Button
                key={i}
                onClick={tab.onClick}
                className="w-full text-left border-none shadow-none"
              >
                {tab.label}
              </Button>
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

import { Button, Popover } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "@tanstack/react-router";

type HeaderType = {
  withSidebar?: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  withSidebar,
}: HeaderType) => {
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
    <div className="z-10 flex justify-between bg-primary text-white h-[60px]  items-center pl-8 pr-4 ">
      {withSidebar && (
        <div className="min-[601px]:hidden flex z-10">
          <button>
            {isSidebarOpen ? (
              <XMarkIcon
                width={25}
                height={25}
                onClick={() => setIsSidebarOpen(false)}
              />
            ) : (
              <Bars3Icon
                width={25}
                height={25}
                onClick={() => setIsSidebarOpen(true)}
              />
            )}
          </button>
        </div>
      )}

      <Link to="/" className="text-md my-auto z-10">
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
        <UserCircleIcon className="w-[25px] h-[25px] cursor-pointer my-auto z-10" />
      </Popover>
    </div>
  );
};

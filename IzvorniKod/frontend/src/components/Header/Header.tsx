import { Popover } from "antd";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-between bg-primary text-white h-[60px] align-middle pl-8 pr-4">
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

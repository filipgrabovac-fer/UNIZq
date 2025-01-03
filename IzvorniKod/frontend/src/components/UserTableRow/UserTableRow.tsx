import { cn } from "../../utils/cn.util";

type UserTableRowType = {
  facultyUserId: number;
  username: string;
  email: string;
  postsReported: number;
  isKicked: boolean;
  onKick: () => void;
};

export const UserTableRow = ({
  facultyUserId,
  username,
  email,
  postsReported,
  isKicked,
  onKick,
}: UserTableRowType) => {
  return (
    <div className="bg-white flex items-center px-4 py-1 scroll-py-14 border-t-gray_border border-t-[1px]">
      <div className="w-[20%]">{facultyUserId}</div>
      <div className="w-[20%] truncate">{username}</div>
      <div className="w-[20%] text-center truncate">{email}</div>
      <div className="w-[20%] text-center">{postsReported}</div>
      <div className="w-[20%] flex justify-end">
        <div
          onClick={onKick}
          className={cn(
            isKicked
              ? "text-red text-right pointer-events-none"
              : "text-white bg-red rounded-[15px] w-[60px] h-[24px] p-1 flex items-center justify-center cursor-pointer"
          )}
        >
          {isKicked ? "Kicked" : "Kick"}
        </div>
      </div>
    </div>
  );
};

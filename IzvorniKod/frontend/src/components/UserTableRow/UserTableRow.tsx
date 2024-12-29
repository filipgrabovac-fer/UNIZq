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
    <div className="bg-white flex justify-between items-center px-4 py-1 scroll-py-14 border-t-gray_border border-t-[1px]">
      <div>{facultyUserId}</div>
      <div className="w-[20%] truncate">{username}</div>
      <div className="w-[20%] truncate">{email}</div>
      <div>{postsReported}</div>
      <div
        onClick={onKick}
        className={cn(
          isKicked
            ? "text-red pointer-events-none"
            : "text-white bg-red rounded-[15px] w-[60px] h-[24px] p-1 flex items-center justify-center cursor-pointer"
        )}
      >
        {isKicked ? "Kicked" : "Kick"}
      </div>
    </div>
  );
};

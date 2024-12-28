import { cn } from "../../utils/cn.util";

type UserTableRowType = {
  userID: number;
  username: string;
  email: string;
  postsReported: number;
  isKicked: boolean;
  onClick: () => void;
};

export const UserTableRow = ({
  userID,
  username,
  email,
  postsReported,
  isKicked,
  onClick,
}: UserTableRowType) => {
  return (
    <div className="bg-white flex justify-between items-center px-4 py-1 scroll-py-14 border-y-gray_border border-y-[1px]">
      <div>{userID}</div>
      <div className="w-[20%] truncate">{username}</div>
      <div className="w-[20%] truncate">{email}</div>
      <div>{postsReported}</div>
      <div
        onClick={onClick}
        className={cn(
          isKicked
            ? "text-red"
            : "text-white bg-red rounded-[15px] w-[60px] p-1 text-center"
        )}
      >
        {isKicked ? "Kicked" : "Kick"}
      </div>
    </div>
  );
};

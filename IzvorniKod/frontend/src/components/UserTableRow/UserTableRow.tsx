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
    <div className="w-full flex justify-between items-center border-[1px] border-gray-100">
      <div>{userID}</div>
      <div>{username}</div>
      <div>{email}</div>
      <div>{postsReported}</div>
      <div
        className={`${
          isKicked
            ? "text-red"
            : "text-white bg-red rounded-[15px] w-[7%] p-1 text-center"
        }`}
      >
        {isKicked ? "Kicked" : "Kick"}
      </div>
    </div>
  );
};

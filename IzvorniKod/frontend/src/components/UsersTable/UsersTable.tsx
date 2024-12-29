import { UserTableRow } from "../UserTableRow/UserTableRow";
import { useEffect, useState } from "react";

type User = {
  facultyUserId: number;
  username: string;
  email: string;
  postsReported: number;
  isKicked: boolean;
  onKick: () => void;
};

type UsersTableType = {
  users: User[];
};

export const UsersTable = ({ users: initialUsers }: UsersTableType) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  //ensures that users arent duplicated
  useEffect(() => {
    // Ensure unique users by facultyUserId and filter out undefined
    const uniqueUsers = Array.from(
      new Set(initialUsers.map((user) => user.facultyUserId))
    )
      .map((id) => initialUsers.find((user) => user.facultyUserId === id))
      .filter((user): user is User => user !== undefined);

    setUsers(uniqueUsers);
  }, [initialUsers]);

  return (
    <div className="border-gray_border border-[1px] rounded-[10px]">
      <div className="flex items-center p-2">
        <div className="w-[20%]">userId</div>
        <div className="w-[20%] truncate">username</div>
        <div className="w-[20%] text-center truncate">email</div>
        <div className="w-[20%] text-center truncate">posts reported</div>
        <p className="w-[20%] text-end">kick</p>
      </div>
      {users.map((user) => (
        <UserTableRow
          key={user.facultyUserId}
          facultyUserId={user.facultyUserId}
          username={user.username}
          email={user.email}
          postsReported={user.postsReported}
          isKicked={user.isKicked}
          onKick={user.onKick}
        />
      ))}
    </div>
  );
};

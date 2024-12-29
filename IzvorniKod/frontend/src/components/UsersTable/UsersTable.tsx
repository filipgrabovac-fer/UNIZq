import { UserTableRow } from "../UserTableRow/UserTableRow";

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

export const UsersTable = ({ users }: UsersTableType) => {
  return (
    <div className="ml-10 w-[70%]">
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

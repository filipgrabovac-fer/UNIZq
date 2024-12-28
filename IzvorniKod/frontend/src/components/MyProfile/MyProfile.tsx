import { Card, Statistic } from "antd";
import {
  UserIcon,
  HandThumbUpIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/solid";
import { valueType } from "antd/es/statistic/utils";

const { Meta } = Card;

type MyProfileType = {
  likes: valueType;
  posts: valueType;
  username: string;
  email: string;
};

export const MyProfile = ({ likes, posts, username, email }: MyProfileType) => {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div>
        <p className="text-lg text-center">My profile</p>
        <br />
        <Card hoverable cover={<UserIcon />}>
          <div className="flex justify-evenly">
            <Statistic
              title="Likes"
              value={likes}
              prefix={<HandThumbUpIcon className="w-5" />}
            />
            <Statistic
              title="Posts"
              value={posts}
              prefix={<ArrowUpOnSquareStackIcon className="w-5" />}
            />
          </div>
          <br />
          <Meta
            title="Profile information"
            description={
              <div>
                <div className="flex justify-between">
                  <p>Username:</p>
                  <p>{username}</p>
                </div>
                <div className="flex justify-between">
                  <p>Email:</p>
                  <p>{email}</p>
                </div>
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
};

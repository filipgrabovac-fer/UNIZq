import { Card, Form, Input, Statistic } from "antd";
import {
  UserIcon,
  InboxIcon,
  PencilSquareIcon,
  HandThumbUpIcon,
  ArrowUpOnSquareStackIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

type SettingsType = {};

export const Settings = ({}: SettingsType) => {
  return (
    <div>
      <Form>
        <Form.Item name="username">
          <p>Username</p>
          <div className="flex">
            <Input
              className="h-10"
              prefix={<UserIcon className="w-5" />}
              placeholder="Username"
            />
            <div className="bg-primary ml-2 p-2 w-fit rounded-[10px]">
              <PencilSquareIcon className="w-5 fill-white" />
            </div>
          </div>
        </Form.Item>
        <Form.Item name="email">
          <p>Email</p>
          <div className="flex">
            <Input
              className="h-10"
              prefix={<InboxIcon className="w-5" />}
              type="email"
              placeholder="Email"
            />
            <div className="bg-primary ml-2 p-2 w-fit rounded-[10px]">
              <PencilSquareIcon className="w-5 fill-white" />
            </div>
          </div>
        </Form.Item>
      </Form>
      <div>
        <Card
          bordered={false}
          className="w-fit m-1 transition-transform duration-300 hover:shadow-md"
        >
          <Statistic
            title="Posts"
            value={1128}
            prefix={<ArrowUpOnSquareStackIcon className="w-5" />}
          />
        </Card>
        <Card
          bordered={false}
          className="w-fit m-1 transition-transform duration-300 hover:shadow-md"
        >
          <Statistic
            title="Likes"
            value={112}
            prefix={<HandThumbUpIcon className="w-5" />}
          />
        </Card>
        <Card
          bordered={false}
          className="w-fit m-1 transition-transform duration-300 hover:shadow-md"
        >
          <Statistic
            title="Faculties"
            value={30}
            prefix={<BuildingLibraryIcon className="w-5" />}
          />
        </Card>
      </div>
    </div>
  );
};

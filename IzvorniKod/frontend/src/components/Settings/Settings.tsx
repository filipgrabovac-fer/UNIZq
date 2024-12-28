import { Card, Form, Input } from "antd";
import {
  UserIcon,
  InboxIcon,
  PencilSquareIcon,
  HandThumbUpIcon,
  ArrowUpOnSquareStackIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

import { StatisticsComponent } from "../StatisticsComponent/StatisticsComponent";

type SettingsType = {};

export const Settings = ({}: SettingsType) => {
  return (
    <div>
      <Card
        className="w-[60%] transition-transform duration-300 hover:shadow-md"
        title="Edit your account"
        bordered={false}
      >
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
      </Card>
      <br />
      <Card
        className="transition-transform duration-300 hover:shadow-md"
        title="Statistics"
        bordered={false}
      >
        <Card.Grid style={{ width: "33.33%" }}>
          <StatisticsComponent
            icon={ArrowUpOnSquareStackIcon}
            title={"Posts"}
            value={"1234"}
          />
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <StatisticsComponent
            icon={HandThumbUpIcon}
            title={"Likes"}
            value={"120"}
          />
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <StatisticsComponent
            icon={BuildingLibraryIcon}
            title={"Faculties"}
            value={"50"}
          />
        </Card.Grid>
      </Card>
    </div>
  );
};

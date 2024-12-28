import { Card, Form, Input, Statistic, Popover } from "antd";
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
      <Card
        className="w-[50%] transition-transform duration-300 hover:shadow-md"
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
          <Popover
            content={
              <div>
                <p>You have posted a total of {100} posts on your profile.</p>
              </div>
            }
          >
            <Statistic
              title="Posts"
              value={1128}
              prefix={<ArrowUpOnSquareStackIcon className="w-5" />}
            />
          </Popover>
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <Popover
            content={
              <div>
                <p>Your profile posts have received a total of 100 likes.</p>
              </div>
            }
          >
            <Statistic
              title="Likes"
              value={112}
              prefix={<HandThumbUpIcon className="w-5" />}
            />
          </Popover>
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <Popover
            content={
              <div>
                <p>You have added 100 faculties to your profile.</p>
              </div>
            }
          >
            <Statistic
              title="Faculties"
              value={30}
              prefix={<BuildingLibraryIcon className="w-5" />}
            />
          </Popover>
        </Card.Grid>
      </Card>
    </div>
  );
};

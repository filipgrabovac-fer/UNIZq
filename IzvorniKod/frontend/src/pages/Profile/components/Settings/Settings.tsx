import { Card, Form, Input } from "antd";
import {
  UserIcon,
  InboxIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

import { valueType } from "antd/es/statistic/utils";

const { Meta } = Card;

type SettingsType = {
  username: string;
  email: string;
  postsValue: valueType;
  likesValue: valueType;
  facultiesValue: valueType;
};

export const Settings = ({ username, email }: SettingsType) => {
  return (
    <Card className="w-fit" title="Edit your account" bordered={false}>
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <Card
          className="shadow-lg"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          cover={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UserIcon className="w-[70%]" />
            </div>
          }
        >
          <Meta
            description={
              <div>
                <div className="flex justify-center">
                  <p className="truncate">{username}</p>
                </div>
                <div className="flex justify-center">
                  <p className="truncate">{email}</p>
                </div>
              </div>
            }
          />
        </Card>

        <Form className="max-md:ml-0 ml-20 max-md:mt-5">
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
      </div>
    </Card>
  );
};

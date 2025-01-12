import { Card, Form, Input } from "antd";
import {
  UserIcon,
  InboxIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const { Meta } = Card;

type SettingsType = {
  username: string;
  email: string;
  imageUrl?: string;
};

export const Settings = ({ username, email, imageUrl }: SettingsType) => {
  const [usernameDetails, setUsernameDetails] = useState(username);
  const [emailDetails, setEmailDetails] = useState(email);

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
              {imageUrl ? (
                <img src={imageUrl} className="w-[70%]" />
              ) : (
                <UserIcon className="w-[70%]" />
              )}
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
                value={usernameDetails}
                onChange={(e) => setUsernameDetails(e.target.value)}
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
                value={emailDetails}
                onChange={(e) => setEmailDetails(e.target.value)}
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

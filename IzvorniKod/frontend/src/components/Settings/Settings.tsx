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
import { valueType } from "antd/es/statistic/utils";

const { Meta } = Card;

type SettingsType = {
  username: string;
  email: string;
  postsValue: valueType;
  likesValue: valueType;
  facultiesValue: valueType;
};

export const Settings = ({
  username,
  email,
  postsValue,
  likesValue,
  facultiesValue,
}: SettingsType) => {
  return (
    <div>
      <Card
        className="w-fit transition-transform duration-300 hover:shadow-md"
        title="Edit your account"
        bordered={false}
      >
        <div className="flex justify-center items-center min-h-full">
          <Card
            className="shadow-md"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
            hoverable
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <UserIcon
                  style={{
                    width: "70%",
                  }}
                />
              </div>
            }
          >
            <Meta
              style={{
                width: "150%",
              }}
              description={
                <div>
                  <div className="flex">
                    <p>{username}</p>
                  </div>
                  <div className="flex">
                    <p>{email}</p>
                  </div>
                </div>
              }
            />
          </Card>

          <Form className="ml-20">
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
            value={postsValue}
          />
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <StatisticsComponent
            icon={HandThumbUpIcon}
            title={"Likes"}
            value={likesValue}
          />
        </Card.Grid>
        <Card.Grid style={{ width: "33.33%" }}>
          <StatisticsComponent
            icon={BuildingLibraryIcon}
            title={"Faculties"}
            value={facultiesValue}
          />
        </Card.Grid>
      </Card>
    </div>
  );
};

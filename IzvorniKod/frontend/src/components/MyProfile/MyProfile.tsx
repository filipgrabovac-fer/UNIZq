import { Card } from "antd";
import {
  UserIcon,
  HandThumbUpIcon,
  ArrowUpOnSquareStackIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { valueType } from "antd/es/statistic/utils";
import { StatisticsComponent } from "../StatisticsComponent/StatisticsComponent";

const { Meta } = Card;

type MyProfileType = {
  username: string;
  email: string;
  postsValue: valueType;
  likesValue: valueType;
  facultiesValue: valueType;
};

export const MyProfile = ({
  likesValue,
  postsValue,
  username,
  email,
  facultiesValue,
}: MyProfileType) => {
  return (
    <div className="grid items-center min-h-screen grid-cols-2 max-xl:grid-cols-1">
      <div className="shadow-2xl w-full max-w-lg mx-auto">
        <p className="text-lg text-center">My profile</p>
        <br />
        <Card
          style={{
            border: "none",
          }}
          cover={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <UserIcon style={{ width: "300px", height: "300px" }} />
            </div>
          }
        >
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
      <div className="shadow-2xl">
        <Card title="Statistics" bordered={false}>
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
    </div>
  );
};

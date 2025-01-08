import { Statistic, Popover } from "antd";
import { valueType } from "antd/es/statistic/utils";

type StatisticsComponentType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // icon
  title: string;
  value: valueType;
};

export const StatisticsComponent = ({
  icon: Icon,
  title,
  value,
}: StatisticsComponentType) => {
  const getContent = () => {
    switch (title) {
      case "Posts":
        return <p>You have posted a total of {value} posts on your profile.</p>;
      case "Likes":
        return <p>Your posts have received a total of {value} likes.</p>;
      case "Faculties":
        return <p>You have added {value} faculties to your profile.</p>;
      default:
        return <p>Statistics: {value}</p>;
    }
  };

  return (
    <div>
      <Popover content={<div>{getContent()}</div>}>
        <Statistic
          title={title}
          value={value}
          prefix={<Icon className="w-5" />}
        />
      </Popover>
    </div>
  );
};

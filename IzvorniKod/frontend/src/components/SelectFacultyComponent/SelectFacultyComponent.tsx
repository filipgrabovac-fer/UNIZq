import type { MenuProps } from "antd";
import { Dropdown, message, Space } from "antd";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type SelectFacultyComponentType = {
  faculties: string[];
};

export const SelectFacultyComponent = ({
  faculties,
}: SelectFacultyComponentType) => {
  const generateItems = (): MenuProps["items"] => {
    return faculties.map((faculty, index) => ({
      label: `${faculty}`,
      key: `${index + 1}`,
    }));
  };
  const items = generateItems(); // Ensure items is generated with faculties
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const selectedItem = generateItems()?.find((item) => item?.key === key);
    if (selectedItem && "label" in selectedItem) {
      message.info(`Switched to ${selectedItem.label}`);
    } else {
      message.error("Unknown selection");
    }
  };
  return (
    <Dropdown
      menu={{
        items: items || [], // Ensure items is always defined
        onClick,
        style: {
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
          width: "55%",
        },
      }}
    >
      <a onClick={(e) => e.preventDefault()} style={{ borderRadius: "20px" }}>
        <Space
          className="p-2 hover:cursor-pointer"
          style={{ borderRadius: "20px" }}
        >
          Select a faculty
          <ChevronDownIcon className="w-5" />
        </Space>
      </a>
    </Dropdown>
  );
};

import { CustomButton } from "../../components/CustomButton/CustomButton";
import { Select, ConfigProvider } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type SearchType = {
  withAddPost: boolean;
  onClick: () => void;
};

export const Search = ({ withAddPost, onClick }: SearchType) => {
  const [searchContent, setsearchContent] = useState("");

  return (
    <div onClick={onClick} className="h-[45px] flex justify-center gap-[3%]">
      <div className="p-[5px] w-[50%] rounded-[20px] bg-white flex  items-center gap-2">
        <MagnifyingGlassIcon className="h-6 text-black" />
        <div className="h-[80%] border-l-[1px] border-black"></div>
        <input
          type="text"
          value={searchContent}
          onChange={(event) => setsearchContent(event.target.value)}
          placeholder="Search..."
          className="h-full focus:outline-none w-full rounded-[20px]"
        />
      </div>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 20,
            colorBorder: "#fffff",
            fontSize: 18,
          },
        }}
      >
        <Select
          showSearch
          style={{
            width: 120,
            height: "100%",
          }}
          allowClear
          options={[
            { value: "Name", label: "Name" },
            { value: "Date", label: "Date" },
            { value: "Content", label: "Content" },
          ]}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          placeholder="Filter by"
        />
      </ConfigProvider>

      {withAddPost && (
        <div className="flex">
          <CustomButton variant="primary" title="Add post" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

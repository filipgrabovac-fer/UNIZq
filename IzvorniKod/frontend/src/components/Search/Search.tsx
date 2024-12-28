import { CustomButton } from "../../components/CustomButton/CustomButton";
import { Select, ConfigProvider, Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type SearchType = {
  withAddPost: boolean;
  onClick: () => void;
};

export const Search = ({ withAddPost, onClick }: SearchType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={onClick} className="h-[40px] flex justify-center gap-[3%]">
      <Input
        className="rounded-[20px]"
        size="large"
        placeholder="Search..."
        prefix={
          <div className="flex">
            <MagnifyingGlassIcon className="w-5 mr-2" />
            <div className="h-[21px] border-l-[1px] border-black"></div>
          </div>
        }
      />

      <ConfigProvider
        theme={{
          components: {
            Select: {
              borderRadius: 20,
              colorBorder: "#fffff",
              fontSize: 18,
              optionFontSize: 14,
            },
          },
        }}
      >
        <Select
          showSearch
          style={{
            width: 120,
            height: "100%",
            cursor: "default",
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
          open={isOpen}
          onMouseEnter={() => setIsOpen(true)} // Otvori dropdown kad hovera
          onMouseLeave={() => setIsOpen(false)} // zatvori dropdown kad ne hovera
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

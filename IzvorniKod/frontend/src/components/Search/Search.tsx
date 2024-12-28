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
    <div
      onClick={onClick}
      className="min-[501px]:h-[40px] min-[501px]:flex justify-center min-[501px]:gap-[3%] max-[500px]:gap-y-2 max-[500px]:grid grid-cols-3 grid-rows-[40px_40px]"
    >
      <ConfigProvider
        theme={{
          components: {
            Select: {
              borderRadius: 20,
              colorBorder: "#fffff",
              fontSize: 16,
              optionFontSize: 14,
            },
            Input: {
              activeBorderColor: "white",
              hoverBorderColor: "white",
            },
          },
        }}
      >
        <Input
          className=" rounded-[20px] w-[50%] max-[500px]:w-full col-start-1 col-end-4"
          size="large"
          placeholder="Search..."
          prefix={
            <div className="flex">
              <MagnifyingGlassIcon className="w-5 mr-2" />
              <div className="h-[21px] border-l-[1px] border-black"></div>
            </div>
          }
        />
        <Select
          className="row-start-2 col-start-1 col-end-2"
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
          onMouseEnter={() => setIsOpen(true)}
          dropdownRender={(menu) => (
            <div
              onMouseLeave={() => setIsOpen(false)}
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              {menu}
            </div>
          )}
        />
      </ConfigProvider>

      {withAddPost && (
        <div className="flex max-[500px]:w-20">
          <CustomButton variant="primary" title="Add post" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

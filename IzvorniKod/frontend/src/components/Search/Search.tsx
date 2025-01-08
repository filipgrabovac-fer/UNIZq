import { CustomButton } from "../../components/CustomButton/CustomButton";
import { Select, ConfigProvider, Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SearchType = {
  withAddPost?: boolean;
  setFilterState: Dispatch<SetStateAction<string | undefined>>;
  onAddPostClick?: () => void;
};

export const Search = ({
  withAddPost,
  onAddPostClick,
  setFilterState,
}: SearchType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-[501px]:h-[40px] min-[501px]:flex min-[501px]:gap-[3%] max-[500px]:gap-y-2  flex w-full ">
      <ConfigProvider
        theme={{
          components: {
            Select: {
              borderRadius: 20,
              colorBorder: "#fffff",
              fontSize: 16,
              optionFontSize: isMobile ? 13 : 14,
            },
            Input: {
              activeBorderColor: "white",
              hoverBorderColor: "white",
            },
          },
        }}
      >
        <Input
          className="rounded-[20px] w-full"
          size="middle"
          placeholder="Search..."
          onChange={(e) => setFilterState(e.target.value.trim())}
          prefix={
            <div className="flex">
              <MagnifyingGlassIcon className="w-5 mr-2" />
              <div className="h-[21px] border-l-[1px] border-black"></div>
            </div>
          }
        />

        <Select
          allowClear
          options={[
            { value: "Name", label: "Name" },
            { value: "Date", label: "Date" },
            { value: "Content", label: "Content" },
          ]}
          optionFilterProp="button"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          placeholder="Filter by"
          open={isOpen}
          onClick={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          dropdownRender={(menu) => (
            <div className="overflow-hidden">{menu}</div>
          )}
        />
      </ConfigProvider>

      {withAddPost && onAddPostClick && (
        <div className="flex max-[500px]:w-20">
          <CustomButton
            variant="primary"
            title="Add post"
            onClick={onAddPostClick}
            fontSize="sm"
          />
        </div>
      )}
    </div>
  );
};

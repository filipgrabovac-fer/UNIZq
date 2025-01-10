/** @type {import('tailwindcss').Config} */
import { Spin } from "antd";
import { cn } from "../../utils/cn.util";

type CustomButtonType = {
  variant: string;
  title: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  fontSize?: "sm";
  loading?: boolean;
};

export const CustomButton = ({
  variant,
  title,
  onClick,
  type,
  fontSize,
  loading,
}: CustomButtonType) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className={cn(
        "w-full px-2 max-[704px]:leading-none max-[704px]:p-0 text-[16px] rounded-[20px] border-solid border-2 hover:opacity-75",
        variant === "primary"
          ? "bg-primary  text-white  border-primary"
          : "border-black bg-white",
        fontSize == "sm" && "text-[0.875rem]",
        loading && "pointer-events-none opacity-60"
      )}
    >
      {loading ? <Spin size="small" className="text-white" /> : title}
    </button>
  );
};

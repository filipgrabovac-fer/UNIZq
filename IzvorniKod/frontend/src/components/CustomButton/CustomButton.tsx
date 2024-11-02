import { cn } from "../../utils/cn.util";
type CustomButtonType = {
  variant?: string;
  title?: string;
  onClick?: () => void;
};
export const CustomButton = ({ variant, title, onClick }: CustomButtonType) => {
  return (
    <button
      className={cn(
        "w-full h-[38] rounded  border-solid border-2  hover:opacity-0.75",
        variant === "primary"
          ? "border-gray_border bg-primary  text-white"
          : "border-black bg-withe"
      )}
    >
      {title}
    </button>
  );
};

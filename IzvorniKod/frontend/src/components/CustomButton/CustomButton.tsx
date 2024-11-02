/** @type {import('tailwindcss').Config} */
import { cn } from "../../utils/cn.util";

type CustomButtonType = {
  variant: string;
  title: string;
  onClick: () => void;
};

export const CustomButton = ({ variant, title, onClick }: CustomButtonType) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-[38px] rounded-[20px]  border-solid border-2  hover:opacity-75",
        variant === "primary"
          ? "bg-primary  text-white"
          : "border-black bg-white"
      )}
    >
      {title}
    </button>
  );
};

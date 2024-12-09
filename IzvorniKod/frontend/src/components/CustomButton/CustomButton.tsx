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
        "w-full min-[501px]:p-[0px] h-full text-[18px] p-1 rounded-[20px] border-solid border-2  hover:opacity-75",
        variant === "primary"
          ? "bg-primary  text-white  border-primary"
          : "border-black bg-white"
      )}
    >
      {title}
    </button>
  );
};

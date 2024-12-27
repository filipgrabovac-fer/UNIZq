/** @type {import('tailwindcss').Config} */
import { cn } from "../../utils/cn.util";

type CustomButtonType = {
  variant: string;
  title: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
};

export const CustomButton = ({
  variant,
  title,
  onClick,
  type,
}: CustomButtonType) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
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

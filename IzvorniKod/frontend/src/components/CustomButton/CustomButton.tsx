type CustomButtonType = {
  variant_?: string;
  title?: string;
  onClick?: () => void;
};
export const CustomButton = ({
  variant_,
  title,
  onClick,
}: CustomButtonType) => {
  const variant = variant_?.toLocaleLowerCase();
  if (variant === "secondary") {
    return (
      <button className="w-full h-[38] rounded bg-withe border-solid border-2 border-black hover:opacity-0.75">
        {title}
      </button>
    );
  } else if (variant === "primary") {
    return (
      <button className="w-full h-[38] rounded bg-primary border-solid border-2 border-black bg-primary text-white border-gray_border  hover:opacity-75 ">
        {title}
      </button>
    );
  }
};

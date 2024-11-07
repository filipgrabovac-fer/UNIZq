import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
type CustomLoginRegisterButtonType = {
  title: string;
  onClick: () => void;
};

export const CustomLoginRegisterButton = ({
  title,
  onClick,
}: CustomLoginRegisterButtonType) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[50px] bg-primary text-white flex justify-between rounded-[40px] px-2 hover:opacity-95"
    >
      <ArrowRightCircleIcon width={35} height={35} className="my-auto" />
      <p className="my-auto">{title}</p>
      <div></div>
    </div>
  );
};
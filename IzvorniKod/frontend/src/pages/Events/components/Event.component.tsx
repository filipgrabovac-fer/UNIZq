import { scrollTo } from "../../../utils/scrollTo";

type EventProps = {
  title: string;
  description: string;
  onClick: () => void;
};
export const Event = ({ title, description, onClick }: EventProps) => {
  return (
    <div
      className="w-full flex flex-col cursor-pointer"
      onClick={() => {
        onClick();
        scrollTo({ id: "google-maps" });
      }}
    >
      <p className="text-[20px] p-4 font-medium">{title}</p>
      <hr className="border-gray_border" />
      <p className="text-[14px] p-2">{description}</p>
    </div>
  );
};

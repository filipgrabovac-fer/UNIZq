type EventProps = {
  title: string;
  description: string;
};
export const Event = ({ title, description }: EventProps) => {
  return (
    <div className="w-full flex flex-col">
      <p className="text-[20px]">{title}</p>
      <hr />
      <p className="text-[14px]">{description}</p>
    </div>
  );
};

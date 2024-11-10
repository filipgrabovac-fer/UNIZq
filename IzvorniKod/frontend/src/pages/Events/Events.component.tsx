import { Event } from "./components/Event.component";

const eventsMockData = [
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
  {
    title: "title 1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, deleniti?",
  },
];

export const Events = () => {
  return (
    <div className="flex max-[500px]:flex-wrap mt-7 w-full justify-center">
      <div className="flex flex-col">
        <p className="text-[40px]">What events are currenlty active?</p>
        <div className="border-[1px] border-gray_border">
          {eventsMockData.map((event) => (
            <Event title={event.title} description={event.description} />
          ))}
        </div>
        <img src="" alt="placeholder image" className="w-full h-52" />
      </div>

      <div className="flex flex-col">
        <img src="" alt="placeholder image" className="w-full h-52" />
        <p className="text-[40px]">Where can I find those events?</p>
        <div>this is where google maps goes</div>
      </div>
    </div>
  );
};

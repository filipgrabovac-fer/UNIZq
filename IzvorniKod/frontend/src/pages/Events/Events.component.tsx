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
    <div className="flex max-[500px]:flex-wrap mt-7 w-full justify-center gap-x-10">
      <div className="flex flex-col">
        <p className="text-[40px] font-medium">
          What events are currenlty active?
        </p>
        <div className="border-[1px] border-gray_border mt-7 flex flex-col gap-2 max-h-[600px] overflow-y-scroll">
          {eventsMockData.map((event) => (
            <Event title={event.title} description={event.description} />
          ))}
        </div>
        <img
          src="/images/events-crowd.jpg"
          alt="placeholder image"
          className="w-full h-[300px] max-[300px]:hidden mt-7"
        />
      </div>

      <div className="flex flex-col min-[500px]:mt-[60px]" id="google-maps">
        <img
          src="/images/events-crowd.jpg"
          alt="placeholder image"
          className="w-full h-[300px] max-[300px]:hidden mt-7 "
        />
        <p className="text-[40px] font-medium mt-7">
          Where can I find those events?
        </p>
        <div>this is where google maps goes</div>
      </div>
    </div>
  );
};

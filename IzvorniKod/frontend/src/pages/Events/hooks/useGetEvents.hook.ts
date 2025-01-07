import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

export type EventDataType = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type EventsDataType = EventDataType[];

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const data: EventsDataType = await customFetch({
        endpointUrl: "events/all",
        method: "GET",
      });
      return data;
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

type UsePostEventProps = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

type UsePostEventOnSuccessType = {
  onSuccess: () => void;
};

export const usePostEvent = ({ onSuccess }: UsePostEventOnSuccessType) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({
      title,
      description,
      latitude,
      longitude,
    }: UsePostEventProps) => {
      const response = await customFetch({
        endpointUrl: "events/create",
        method: "POST",
        body: {
          title,
          description,
          latitude,
          longitude,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      return;
    },
  });
};

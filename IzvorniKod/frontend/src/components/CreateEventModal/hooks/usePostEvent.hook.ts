import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

type UsePostEventProps = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  faculty_id: number;
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
      faculty_id,
    }: UsePostEventProps) => {
      await customFetch({
        endpointUrl: "events/create",
        method: "POST",
        body: {
          title,
          description,
          latitude,
          longitude,
          faculty_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return;
    },
  });
};

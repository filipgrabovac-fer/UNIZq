import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../../utils/customFetch";

export type PostGenerateAnswerWithAIType = {
  question: string;
};

export type PostGenerateAnswerWithAIProps = {
  onSuccess:
    | ((
        data: any,
        variables: PostGenerateAnswerWithAIType,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};

export type PostGenerateAnswerWithAIResponseType = {
  answer: string;
};
export const usePostGenerateAnswerWithAI = ({
  onSuccess,
}: PostGenerateAnswerWithAIProps) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ question }: PostGenerateAnswerWithAIType) => {
      try {
        const response: PostGenerateAnswerWithAIResponseType =
          await customFetch({
            body: JSON.stringify({ question: question }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            endpointUrl: "ai/generate-answer",
          });
        return response.answer;
      } catch (e) {
        return "Failed to generate answer";
      }
    },
  });
};

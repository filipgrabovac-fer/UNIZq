import { UserIcon } from "@heroicons/react/24/solid";

type AnswerComponentType = {
  answerAuthor: string;
  answerText: string;
  onClick: () => void;
};

export const AnswerComponent = ({
  answerAuthor,
  answerText,
  onClick,
}: AnswerComponentType) => {
  return (
    <div className="bg-white">
      <div className="flex">
        <UserIcon className="w-5 mr-[1%]" />
        <p>{answerAuthor}</p>
      </div>
      <p>{answerText}</p>
    </div>
  );
};

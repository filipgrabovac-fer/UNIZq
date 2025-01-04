import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Popover } from "antd";
import { useState } from "react";

type AnswerComponentType = {
  answerAuthor: string;
  answerText: string;
  onClick: () => void;
};

type GetIconStyleType = {
  isClicked: boolean;
  color: string;
};

const getIconStyle = ({ color, isClicked }: GetIconStyleType) => {
  return {
    stroke: isClicked ? "none" : "black",
    strokeWidth: isClicked ? "0" : "1px",
    fill: isClicked ? color : "white",
  };
};

export const AnswerComponent = ({
  answerAuthor,
  answerText,
  onClick,
}: AnswerComponentType) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);

  const content = (
    <div className="flex flex-col gap-3 p-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cursor-pointer"
      >
        Report
      </button>

      {/* napraviti validaciju može li korisnik obrisati ovaj post i ako ne može, onda ne prikazivati Delete gumb */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="cursor-pointer text-red"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="flex justify-between">
        <div className="flex w-[50%]">
          <UserIcon className="w-5 mr-[10px]" />
          <p className="w-[50%] truncate">{answerAuthor}</p>
        </div>
        <div className="flex gap-1.5">
          <HeartIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsHeartClicked(!isHeartClicked);
            }}
            className="w-[20px] cursor-pointer"
            style={getIconStyle({ color: "red", isClicked: isHeartClicked })}
          />
          <HandThumbUpIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsThumbUpClicked(!isThumbUpClicked);
            }}
            className="w-[20px] cursor-pointer"
            style={getIconStyle({
              color: "#111D4A",
              isClicked: isThumbUpClicked,
            })}
          />
          <HandThumbDownIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsThumbDownClicked(!isThumbDownClicked);
            }}
            className="w-[20px] cursor-pointer"
            style={getIconStyle({
              color: "#111D4A",
              isClicked: isThumbDownClicked,
            })}
          />
          <Popover
            arrow={false}
            content={content}
            trigger="click"
            className="w-[25px]"
          >
            <EllipsisVerticalIcon className="cursor-pointer" />
          </Popover>
        </div>
      </div>
      <p>{answerText}</p>
    </div>
  );
};

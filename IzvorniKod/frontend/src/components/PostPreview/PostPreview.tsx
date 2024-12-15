import { useState } from "react";
import { Popover } from "antd";
import {
  HeartIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

type PostPreviewProps = {
  postTitle: string;
  postID: number;
  canDelete: boolean;
  canModify: boolean;
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

export const PostPreview = ({ postTitle, onClick }: PostPreviewProps) => {
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
    <div
      onClick={onClick}
      className="h-[50px] rounded-[20px] bg-white flex items-center justify-between p-[10px]"
    >
      <p className="cursor-default truncate text-[18px] w-[75%]">{postTitle}</p>
      <div className="flex gap-1.5">
        <HeartIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsHeartClicked(!isHeartClicked);
          }}
          className="w-[25px] cursor-pointer"
          style={getIconStyle({ color: "red", isClicked: isHeartClicked })}
        />
        <HandThumbUpIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsThumbUpClicked(!isThumbUpClicked);
          }}
          className="w-[25px] cursor-pointer"
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
          className="w-[25px] cursor-pointer"
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
  );
};
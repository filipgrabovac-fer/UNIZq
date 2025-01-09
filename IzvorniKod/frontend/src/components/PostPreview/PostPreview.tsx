import { useState } from "react";
import { Popover } from "antd";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

type PostPreviewProps = {
  postTitle: string;
  postId: number;
  editable: boolean;
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

export const PostPreview = ({
  postTitle,
  onClick,
  editable,
}: PostPreviewProps) => {
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

      {editable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="cursor-pointer text-red"
        >
          Delete
        </button>
      )}
    </div>
  );

  return (
    <div
      onClick={onClick}
      className="h-[50px] rounded-[20px] flex items-center justify-between p-[10px] cursor-pointer hover:bg-gray-100"
    >
      <p className="cursor-default truncate w-[75%]">{postTitle}</p>
      <div className="flex gap-1.5">
        <HandThumbUpIcon
          onClick={() => {
            setIsThumbUpClicked(!isThumbUpClicked);
          }}
          className="w-[20px] cursor-pointer"
          style={getIconStyle({
            color: "#111D4A",
            isClicked: isThumbUpClicked,
          })}
        />
        <HandThumbDownIcon
          onClick={() => {
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
          <EllipsisVerticalIcon
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </Popover>
      </div>
    </div>
  );
};

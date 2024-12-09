import { useState } from "react";
import { Popover } from "antd";
import {
  HeartIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  MegaphoneIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

type PostPreviewProps = {
  postTitle: string;
  postID: number;
  onClick: () => void;
};

export const PostPreview = ({ postTitle, onClick }: PostPreviewProps) => {
  type GetIconStyleType = {
    isClicked: boolean;
    color: string;
  };

  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isTrashClicked, setIsTrashClicked] = useState(false);

  const getIconStyle = ({ color, isClicked }: GetIconStyleType) => {
    return {
      stroke: isClicked ? "none" : "black",
      strokeWidth: isClicked ? "0" : "1px",
      fill: isClicked ? color : "white",
    };
  };

  const content = (
    <div className="flex">
      <MegaphoneIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsReportClicked(!isReportClicked);
        }}
        className="w-[25px] cursor-pointer mx-0.5"
        style={getIconStyle({ color: "black", isClicked: isReportClicked })}
      />
      <TrashIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsTrashClicked(!isTrashClicked);
        }}
        className="w-[25px] cursor-pointer mx-0.5"
        style={getIconStyle({ color: "black", isClicked: isTrashClicked })}
      />
    </div>
  );

  return (
    <div
      onClick={onClick}
      className="h-[50px] rounded-[20px] bg-white flex items-center justify-between p-[20px]"
    >
      <p className="truncate text-[18px]">{postTitle}</p>
      <div className="flex">
        <HeartIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsHeartClicked(!isHeartClicked);
          }}
          className="w-[25px] cursor-pointer mx-0.5"
          style={getIconStyle({ color: "red", isClicked: isHeartClicked })}
        />
        <HandThumbUpIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsThumbUpClicked(!isThumbUpClicked);
          }}
          className="w-[25px] cursor-pointer mx-0.5"
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
          className="w-[25px] cursor-pointer mx-0.5"
          style={getIconStyle({
            color: "#111D4A",
            isClicked: isThumbDownClicked,
          })}
        />
        <Popover content={content}>
          <EllipsisVerticalIcon className="h-7" />
        </Popover>
      </div>
    </div>
  );
};

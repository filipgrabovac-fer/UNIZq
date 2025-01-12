import { useState } from "react";
import { Popover } from "antd";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import {
  PostInteractionEnum,
  usePostPostInteraction,
} from "./hooks/usePostPostInteraction.hook";

type PostPreviewProps = {
  postTitle: string;
  postId: number;
  editable: boolean;
  onClick: () => void;
  isDownvoted: boolean;
  isUpvoted: boolean;
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
  postId,
  isDownvoted,
  isUpvoted,
}: PostPreviewProps) => {
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(isUpvoted);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(isDownvoted);

  const { mutate: postInteraction } = usePostPostInteraction();

  const content = (
    <div className="flex flex-col gap-3 p-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          postInteraction({
            postId,
            action: PostInteractionEnum.REPORT,
          });
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
      className="h-[50px] rounded-[20px] flex items-center justify-between p-[10px] cursor-pointer hover:bg-gray_hover"
    >
      <p className="truncate w-[75%] cursor-pointer">{postTitle}</p>
      <div className="flex gap-1.5">
        <HandThumbUpIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsThumbUpClicked(!isThumbUpClicked);
            postInteraction({ postId, action: PostInteractionEnum.UPVOTE });
            if (isThumbDownClicked) {
              postInteraction({
                postId,
                action: PostInteractionEnum.DOWNVOTE,
              });
              setIsThumbDownClicked(false);
            }
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
            postInteraction({
              postId,
              action: PostInteractionEnum.DOWNVOTE,
            });
            if (isThumbUpClicked) {
              postInteraction({
                postId,
                action: PostInteractionEnum.UPVOTE,
              });

              setIsThumbUpClicked(false);
            }
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

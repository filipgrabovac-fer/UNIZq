import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Popover, Modal, Carousel } from "antd";
import { useRef, useState, useEffect } from "react";
import { CarouselRef } from "antd/es/carousel";
import { usePutAnswerInteraction } from "./hooks/usePutAnswerInteraction.hook";
import { PostInteractionEnum } from "../PostPreview/hooks/usePostPostInteraction.hook";
import { useDeletePostAnswer } from "./hooks/useDeletePostAnswer.hook";
import { useQueryClient } from "@tanstack/react-query";

type AnswerComponentType = {
  answerAuthor: string;
  answerText: string;
  pictures: string[];
  upvoted: boolean;
  downvoted: boolean;
  answerId: string;
  editable: boolean;
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
  pictures,
  answerId,
  editable,
  upvoted,
  downvoted,
}: AnswerComponentType) => {
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(upvoted);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(downvoted);
  const [isCarouselModalVisible, setIsCarouselModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<CarouselRef>(null);

  const queryClient = useQueryClient();

  const { mutate: putAnswerInteraction } = usePutAnswerInteraction();
  const { mutate: deletePostAnswer } = useDeletePostAnswer({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["post-details"] }),
  });
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * 2; // Two lines
      if (textRef.current.scrollHeight > maxHeight) {
        setIsClamped(true);
      } else {
        setIsClamped(false);
      }
    }
  }, [answerText]);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const content = (
    <div className="flex flex-col gap-3 p-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          putAnswerInteraction({
            answerId,
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
            deletePostAnswer({ answerId });
          }}
          className="cursor-pointer text-red"
        >
          Delete
        </button>
      )}
    </div>
  );

  const handleCloseCarouselModal = () => {
    setIsCarouselModalVisible(false);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsCarouselModalVisible(true);
    carouselRef.current?.goTo(index);
  };

  return (
    <div className="bg-white border-gray_border border-b-[1px] text-[14px] px-4 pt-3">
      <div className="flex justify-between">
        <div className="flex w-[50%]">
          <UserIcon className="w-5 mr-[10px]" />
          <p className="w-[50%] truncate">{answerAuthor}</p>
        </div>
        <div className="flex gap-1.5">
          <HandThumbUpIcon
            onClick={() => {
              // e.stopPropagation();
              setIsThumbUpClicked(!isThumbUpClicked);
              putAnswerInteraction({
                answerId,
                action: PostInteractionEnum.UPVOTE,
              });
              if (isThumbDownClicked) {
                putAnswerInteraction({
                  answerId,
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
            onClick={() => {
              // e.stopPropagation();
              setIsThumbDownClicked(!isThumbDownClicked);
              putAnswerInteraction({
                answerId,
                action: PostInteractionEnum.DOWNVOTE,
              });
              if (isThumbUpClicked) {
                putAnswerInteraction({
                  answerId,
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
            <EllipsisVerticalIcon className="cursor-pointer" />
          </Popover>
        </div>
      </div>
      <p
        ref={textRef}
        className={isExpanded || !isClamped ? "" : "line-clamp-2"}
      >
        {answerText}
      </p>
      {isClamped && (
        <p
          onClick={handleToggleText}
          className="cursor-pointer underline text-[#111D4A] w-fit text-[14px] ml-auto mr-7"
        >
          {isExpanded ? "Show less" : "View more"}
        </p>
      )}
      {pictures.length > 0 && (
        <div className="flex flex-row space-x-2 m-3">
          {pictures.slice(0, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-12 w-12 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      )}

      <Modal
        open={isCarouselModalVisible}
        onCancel={handleCloseCarouselModal}
        footer={null}
        width="60%"
        centered
        title={
          <div className="flex items-center">
            <UserIcon className="w-5 mr-[10px]" />
            <p>{answerAuthor}</p>
          </div>
        }
      >
        <Carousel
          className="mb-[12px]"
          ref={carouselRef}
          initialSlide={currentImageIndex}
          adaptiveHeight
          arrows
        >
          {pictures.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

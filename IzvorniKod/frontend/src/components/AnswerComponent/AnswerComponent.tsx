import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Popover, Modal, Carousel } from "antd";
import { useRef, useState, useEffect } from "react";
import { CarouselRef } from "antd/es/carousel";

type AnswerComponentType = {
  answerAuthor: string;
  answerText: string;
  pictures: string[];
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
}: AnswerComponentType) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
  const [isCarouselModalVisible, setIsCarouselModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<CarouselRef>(null);

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
        }}
        className="cursor-pointer"
      >
        Report
      </button>
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

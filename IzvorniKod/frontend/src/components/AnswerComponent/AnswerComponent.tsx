import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Popover, Modal, Carousel } from "antd";
import { useState } from "react";

type AnswerComponentType = {
  answerAuthor: string;
  answerText: string;
  pictures: string[];
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
  pictures,
  onClick,
}: AnswerComponentType) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
      <p className="line-clamp-2">{answerText}</p>
      {pictures.length > 0 && (
        <div className="flex flex-row space-x-2 m-3">
          {pictures.slice(0, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-12 w-12 object-cover rounded-lg cursor-pointer"
            />
          ))}
        </div>
      )}
      <p
        onClick={handleOpenModal}
        className="cursor-pointer underline text-[#111D4A]"
      >
        View the whole answer
      </p>
      <Modal
        title={
          <div className="flex items-center">
            <UserIcon className="w-5 mr-[10px]" />
            <p>{answerAuthor}</p>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <p className="mb-4">{answerText}</p>

        {pictures.length > 0 && (
          <Carousel arrows adaptiveHeight>
            {pictures.map((image, index) => (
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-[200px] h-auto"
              />
            ))}
          </Carousel>
        )}
      </Modal>
    </div>
  );
};

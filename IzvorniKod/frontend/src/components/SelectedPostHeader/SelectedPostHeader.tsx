import React, { useState, useRef, useEffect } from "react";
import { UserIcon, ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Carousel, Modal } from "antd";
import { CarouselRef } from "antd/es/carousel";

interface PostProps {
  postName: string;
  postData: string;
  postAuthor: string;
  images: string[]; // Array of image URLs
}

const SelectedPostHeader: React.FC<PostProps> = ({
  postName,
  postData,
  postAuthor,
  images,
}) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setIsModalVisible(true);
    carouselRef.current?.goTo(index);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 w-full bg-white ml-auto mx-0">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <button className="text-gray-600 hover:text-black font-bold">
          <ArrowLongLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">{postName}</h1>
      </div>
      {/* Post Data */}
      <p className="text-gray-700 mt-2">{postData}</p>
      {/* Images and author */}
      <div className="flex justify-between flex-row space-x-2 mt-4">
        <div className="flex flex-row space-x-2">
          {images.slice(0, 5).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-16 w-16 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        <div className="flex ml-auto space-x-1 items-center mt-4">
          <UserIcon className="h-6 w-6 text-gray-500" />
          <span className="text-sm text-gray-500">{postAuthor}</span>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        footer={null}
        width="60%"
        height="60%"
        centered
        onCancel={handleCancel}
      >
        <Carousel arrows adaptiveHeight ref={carouselRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className="flex justify-center bg-primary items-center w-full h-full"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="object-contain "
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default SelectedPostHeader;

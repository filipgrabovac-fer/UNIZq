import React, { useState } from "react";
import { Input, Spin } from "antd";
import {
  PaperClipIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { cn } from "../../utils/cn.util";
import { usePostGenerateAnswerWithAI } from "./hooks/usePostGenerateAnswerWithAI.hook";

interface SearchComponentProps {
  postContent: string;
}

export const AddAnswerComponent = ({ postContent }: SearchComponentProps) => {
  const [answerContent, setAnswerContent] = useState("");
  const [imageList, setImageList] = useState<FileList | null>(null);
  const [isGenerateAnswerLoading, setIsGenerateAnswerLoading] = useState(false);

  const handleIconClick = () => {
    // Handle the logic for adding images here
    console.log("Icon clicked to add images");
  };

  const handlePaperClipClick = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    fileInput && fileInput.click();
  };

  const { mutate: postGenerateAnswerWithAI } = usePostGenerateAnswerWithAI({
    onSuccess: (data) => {
      setIsGenerateAnswerLoading(false);
      setAnswerContent(data);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > 5) {
        alert("You can only select up to 5 images.");
        return;
      }

      const validImageTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];
      for (let i = 0; i < files.length; i++) {
        if (!validImageTypes.includes(files[i].type)) {
          alert("Only image files are allowed.");
          return;
        }
      }
      setImageList(files);
    }
  };

  const handleCpuChipClick = () => {
    setIsGenerateAnswerLoading(true);
    postGenerateAnswerWithAI({ question: postContent });
  };

  return (
    <div className="w-[90%] bg-white p-1">
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
      <Input
        placeholder="Add your answer"
        value={answerContent}
        disabled={isGenerateAnswerLoading}
        onChange={(e) => {
          setAnswerContent(e.target.value);
        }}
        prefix={
          <div onClick={handlePaperClipClick}>
            <PaperClipIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        }
        suffix={
          <div className="flex flex-row items-center space-x-2">
            <div
              className={cn(
                "p-1 rounded cursor-pointer hover:scale-110 transition-transform hover:text-yellow-900"
              )}
            >
              {isGenerateAnswerLoading ? (
                <Spin className="pointer-events-none cursor-default" />
              ) : (
                <CpuChipIcon
                  className={cn("h-5 w-5 text-yellow-900")}
                  onClick={handleCpuChipClick}
                />
              )}
            </div>
            <div
              className={cn(
                "bg-purple-500 p-1 rounded hover:scale-110 transition-transform cursor-pointer",
                !answerContent &&
                  "opacity-50 cursor-not-allowed pointer-events-none"
              )}
              onClick={handleIconClick}
            >
              <PaperAirplaneIcon className="h-5 w-5 text-purple-900" />
            </div>
          </div>
        }
      />
    </div>
  );
};

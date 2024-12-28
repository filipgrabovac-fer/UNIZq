import React, { useState } from "react";
import { Input } from "antd";
import {
  PaperClipIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { cn } from "../../utils/cn.util";

const SearchComponent: React.FC = () => {
  const [answerContent, setAnswerContent] = useState("");
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const handleIconClick = () => {
    // Handle the logic for adding images here
    console.log("Icon clicked to add images");
  };

  const handlePaperClipClick = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

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

      console.log("Selected files:", files);
      // Handle the selected files here
    }
  };

  const handleCpuChipClick = () => {
    setIsAIEnabled(!isAIEnabled);
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
      <Input
        placeholder="Add your answer"
        value={answerContent}
        onChange={(e) => {
          setAnswerContent(e.target.value);
          console.log(e.target.value);
        }}
        prefix={
          <div
            onClick={handlePaperClipClick}
            className="hover:scale-110 hover:duration-75 cursor-pointer"
          >
            <PaperClipIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        }
        suffix={
          <div className="flex flex-row items-center space-x-2">
            <div
              className={cn(
                "p-1 rounded cursor-pointer hover:scale-110 hover:duration-75 ",
                isAIEnabled && "bg-yellow-400"
              )}
              onClick={handleCpuChipClick}
            >
              <CpuChipIcon
                className={cn(
                  "h-5 w-5",
                  isAIEnabled ? "text-yellow" : "text-gray-400"
                )}
              />
            </div>
            <div
              className="bg-purple-500 p-1 rounded hover:scale-110 hover:duration-75 cursor-pointer"
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

export default SearchComponent;

import { useState } from "react";
import { Input, message, Spin, Upload, UploadFile } from "antd";
import {
  PaperClipIcon,
  PaperAirplaneIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { cn } from "../../utils/cn.util";
import { usePostGenerateAnswerWithAI } from "./hooks/usePostGenerateAnswerWithAI.hook";
import { usePostCreateAnswer } from "./hooks/usePostCreateAnswer.hook";
import { useQueryClient } from "@tanstack/react-query";
import { postRoute } from "../../routes/faculty-subjects.routes";

interface SearchComponentProps {
  postContent: string;
}

export const AddAnswerComponent = ({ postContent }: SearchComponentProps) => {
  const [answerContent, setAnswerContent] = useState("asd");
  const [imageList, setImageList] = useState<UploadFile[]>();
  const [isGenerateAnswerLoading, setIsGenerateAnswerLoading] = useState(false);

  const queryClient = useQueryClient();
  const { postId } = postRoute.useParams();

  const { mutate: postAnswer } = usePostCreateAnswer({
    onSuccess: () => {
      setImageList([]);
      setAnswerContent("");
      queryClient.invalidateQueries({ queryKey: ["post-details"] });
    },
  });

  const handleSubmit = () => {
    // Handle the logic for adding images here
    const formData = new FormData();

    formData.append("description", answerContent);

    imageList?.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    postAnswer({ formData: formData, postId });
  };

  const { mutate: postGenerateAnswerWithAI } = usePostGenerateAnswerWithAI({
    onSuccess: (data) => {
      setIsGenerateAnswerLoading(false);
      setAnswerContent(data);
    },
  });

  const handleUploadChange = ({ fileList }: any) => {
    const isImage = fileList?.every((file: any) =>
      file.type.startsWith("image/")
    );
    if (!isImage) {
      message.error("Please upload only images");
      return;
    }
    setImageList(fileList);
  };

  const handleCpuChipClick = () => {
    setIsGenerateAnswerLoading(true);
    postGenerateAnswerWithAI({ question: postContent });
  };

  return (
    <div className="w-[90%] bg-white p-1 m-auto">
      <div className="absolute"></div>
      <Input
        placeholder="Add your answer"
        value={answerContent}
        disabled={isGenerateAnswerLoading}
        onChange={(e) => {
          setAnswerContent(e.target.value);
        }}
        prefix={
          <div className="h-5 w-5">
            <Upload
              accept="image/*"
              fileList={imageList}
              onChange={handleUploadChange}
              multiple
              showUploadList={false}
            >
              <PaperClipIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:scale-110 transition-transform" />
            </Upload>
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
              onClick={handleSubmit}
            >
              <PaperAirplaneIcon className="h-5 w-5 text-purple-900" />
            </div>
          </div>
        }
      />
    </div>
  );
};

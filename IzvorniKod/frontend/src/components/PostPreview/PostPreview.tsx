import { useState, useEffect, useRef } from 'react';
import { HeartIcon, HandThumbUpIcon, HandThumbDownIcon, MegaphoneIcon, TrashIcon } from "@heroicons/react/24/solid";

 type PostPreviewProps = {
    postTitle: string;
    onClick: () => void;
  };
  
  export const PostPreview = ({
    postTitle,
    onClick,
  }: PostPreviewProps) => {
    
    type GetIconStyleType = {
      isClicked: boolean;
     color: string;
    }

    const postPreviewDiv = useRef<HTMLDivElement>(null);
    const [postPreviewWidth, setPostPreviewWidth] = useState(0);

    useEffect(() => {
        if (postPreviewDiv.current) {
          const resizeObserver = new ResizeObserver(() => {
            if (postPreviewDiv.current) {
              const { width } = postPreviewDiv.current.getBoundingClientRect();
              setPostPreviewWidth(width);
            }
          });
    
          resizeObserver.observe(postPreviewDiv.current); 
          return () => resizeObserver.disconnect();
        }
      }, []);

    const getFormattedTitle = () => {
        const charWidth = 18; 
        const maxChars = Math.floor(postPreviewWidth / charWidth); 
        return postTitle.length > maxChars ? `${postTitle.slice(0, maxChars)}...` : postTitle;
      };

    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
    const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
    const [isReportClicked, setIsReportClicked] = useState(false);
    const [isTrashClicked, setIsTrashClicked] = useState(false);

    const getIconStyle = ({color, isClicked}: GetIconStyleType) => {
        return {
        stroke: isClicked ? 'none' : 'black',
        strokeWidth: isClicked ? '0' : '1px',
        fill: isClicked ? color : 'white', 
        };
    };

    return (
      <div ref={postPreviewDiv} onClick={onClick} className="h-[50px] rounded-[20px] bg-white flex items-center justify-between p-[20px]">
       <p className="text-[18px]">{getFormattedTitle()}</p>
       <div className="flex">
       <HeartIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsHeartClicked(!isHeartClicked);
          }}
          className="w-[25px] cursor-pointer mx-0.5"
          style={getIconStyle({ color: "red", isClicked: isHeartClicked})}/>
       <HandThumbUpIcon onClick={(e) => {
            e.stopPropagation();
            setIsThumbUpClicked(!isThumbUpClicked);
          }} className="w-[25px] cursor-pointer mx-0.5" style={getIconStyle({ color: "#111D4A", isClicked: isThumbUpClicked })}/>
       <HandThumbDownIcon onClick={(e) => {
            e.stopPropagation();
            setIsThumbDownClicked(!isThumbDownClicked);
          }} className="w-[25px] cursor-pointer mx-0.5" style={getIconStyle({ color: "#111D4A", isClicked: isThumbDownClicked})}/>
       <MegaphoneIcon onClick={(e) => {
            e.stopPropagation();
            setIsReportClicked(!isReportClicked);
          }} className="w-[25px] cursor-pointer mx-0.5" style={getIconStyle({ color: "black", isClicked: isReportClicked})}/>
       <TrashIcon onClick={(e) => {
            e.stopPropagation();
            setIsTrashClicked(!isTrashClicked);
          }} className="w-[25px] cursor-pointer mx-0.5" style={getIconStyle({ color: "black", isClicked: isTrashClicked})}/>
       </div>
      </div>
    );
  };
  
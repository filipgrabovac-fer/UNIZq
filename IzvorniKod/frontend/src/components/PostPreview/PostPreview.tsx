import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon, HandThumbUpIcon, HandThumbDownIcon, MegaphoneIcon, TrashIcon } from "@heroicons/react/24/solid";

 type PostPreviewProps = {
    postTitle: string;
    onClick: () => void;
  };
  
  export const PostPreview = ({
    postTitle,
    onClick,
  }: PostPreviewProps) => {
    
    const postPreviewDiv = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (postPreviewDiv.current) {
          const resizeObserver = new ResizeObserver(() => {
            if (postPreviewDiv.current) {
              const { width } = postPreviewDiv.current.getBoundingClientRect();
              setSize({ width, height: 0 });
            }
          });
    
          resizeObserver.observe(postPreviewDiv.current); 
          return () => resizeObserver.disconnect();
        }
      }, []);

    const getFormattedTitle = () => {
        const charWidth = 18; 
        const maxChars = Math.floor(size.width / charWidth); 
        return postTitle.length > maxChars ? `${postTitle.slice(0, maxChars)}...` : postTitle;
      };

    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
    const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
    const [isReportClicked, setIsReportClicked] = useState(false);
    const [isTrashClicked, setIsTrashClicked] = useState(false);

    const getHearthStyle = (isClicked: boolean) => {
        return {
        stroke: isClicked ? 'none' : 'black',
        strokeWidth: isClicked ? '0' : '1px',
        fill: isClicked ? 'red' : 'white', 
        };
    };
    const getThumbsStyle = (isClicked: boolean) => {
        return {
        stroke: isClicked ? 'none' : 'black',
        strokeWidth: isClicked ? '0' : '1px',
        fill: isClicked ? 'blue' : 'white', 
        };
    };
    const getBlackStyle = (isClicked: boolean) => {
        return {
        stroke: isClicked ? 'none' : 'black',
        strokeWidth: isClicked ? '0' : '1px',
        fill: isClicked ? 'black' : 'white', 
        };
    };

    return (
      <div ref={postPreviewDiv} onClick={onClick} className="w-[90%] h-[60px] rounded-[20px] bg-white flex items-center justify-between p-[15px]">
       <p className="text-[18px]">{getFormattedTitle()}</p>
       <div className="flex">
        
       <HeartIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsHeartClicked(!isHeartClicked);
          }}
          className="w-[25px] cursor-pointer"
          style={getHearthStyle(isHeartClicked)}/>
       <HandThumbUpIcon onClick={(e) => {
            e.stopPropagation();
            setIsThumbUpClicked(!isThumbUpClicked);
          }} className="w-[25px] cursor-pointer" style={getThumbsStyle(isThumbUpClicked)}/>
       <HandThumbDownIcon onClick={(e) => {
            e.stopPropagation();
            setIsThumbDownClicked(!isThumbDownClicked);
          }} className="w-[25px] cursor-pointer" style={getThumbsStyle(isThumbDownClicked)}/>
       <MegaphoneIcon onClick={(e) => {
            e.stopPropagation();
            setIsReportClicked(!isReportClicked);
          }} className="w-[25px] cursor-pointer" style={getBlackStyle(isReportClicked)}/>
       <TrashIcon onClick={(e) => {
            e.stopPropagation();
            setIsTrashClicked(!isTrashClicked);
          }} className="w-[25px] cursor-pointer"style={getBlackStyle(isTrashClicked)}/>
       </div>
      </div>
    );
  };
  
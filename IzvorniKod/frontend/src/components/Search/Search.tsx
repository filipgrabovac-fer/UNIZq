import { CustomButton } from "../../components/CustomButton/CustomButton";
import { Button, Popover } from 'antd';
import { ChevronDownIcon } from "@heroicons/react/24/solid"; 
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { useState } from "react";

type SearchType = {
    withAddPost: boolean;
    onClick: () => void;
  };
  
  export const Search = ({
    withAddPost,
    onClick,
  }: SearchType) => {
    const content = (
      <div className="text-[16px]">
        <p>Name</p>
        <p>Date</p>
        <p>Content</p>
      </div>
    );

    const [searchContent, setsearchContent] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setsearchContent(e.target.value);
    };

    return (
      <div
        onClick={onClick}
        className="h-[50px] flex  justify-evenly ">
            <div className="p-[5px] w-[50%] rounded-[20px] bg-white flex  items-center gap-3">
              <MagnifyingGlassIcon className="h-6 text-black" />
              <div className="h-[80%] border-l-[1px] border-black"></div>
                <input
                  type="text"
                  value={searchContent}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className= "h-full focus:outline-none"/>
            </div>

            <div className="rounded-[20px]">
                  <Popover content={content} trigger="hover">
                  <Button className="bg-white text-black rounded-[20px] h-full text-[18px] flex items-center gap-3">
                       <p>Filter by</p>
                       <ChevronDownIcon className="h-5 w-5 text-black" />
                    </Button>
                  </Popover>
            </div>

            {withAddPost && (
                <div className="h-full flex">
                    <CustomButton variant="primary" title="Add post" onClick={() => {}} />
                </div>
            )}

      </div>
    );
  };
  
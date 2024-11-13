type SearchType = {
    withAddPost: boolean;
    onClick: () => void;
  };
  
  export const Search = ({
    withAddPost,
    onClick,
  }: SearchType) => {
    return (
      <div
        onClick={onClick}
        className="h-[50px] rounded-[20px] bg-black flex">
            <div className="w-[50%] rounded-[20px] bg-white">

            </div>
            <div className="w-[20%] rounded-[20px] bg-white">

            </div>
            <div className="w-[50%] rounded-[20px] bg-white">

            </div>
      </div>
    );
  };
  
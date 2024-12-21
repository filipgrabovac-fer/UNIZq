import { Search } from "../../components/Search/Search";

export const Home = () => {
  return (
    <div className="w-full bg-secondary">
      Home page
      <Search withAddPost={true} onClick={() => {}} />
    </div>
  );
};

import { Header } from "../../components/Header/Header";

type NoSidebarLayoutType = {
  children: JSX.Element;
};

export const NoSidebarLayout = ({ children }: NoSidebarLayoutType) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
};

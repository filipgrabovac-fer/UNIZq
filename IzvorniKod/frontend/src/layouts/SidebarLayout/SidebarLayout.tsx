import { Outlet } from "@tanstack/react-router";
import { Header } from "../../components/Header/Header";

type SidebarLayoutType = {
  children: JSX.Element;
};
export const SidebarLayout = ({ children }: SidebarLayoutType) => {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <div className="w-[300px]">This is the sidebar</div>
        {children}
      </div>
      ;
    </div>
  );
};

import { Outlet } from "@tanstack/react-router";
import { Header } from "../../components/Header/Header";

export const SidebarLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />;
    </div>
  );
};

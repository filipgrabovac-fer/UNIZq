import { useState } from "react";
import { CreateEventModal } from "../../components/CreateEventModal/CreateEventModal.component";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
export const Home = () => {
  return (
    <div className=" bg-secondary overflow-hidden">
      <SearchComponent />
    </div>
  );
};

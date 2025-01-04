import { useState } from "react";
import { CreatePostModal } from "../../components/CreatePostModal/CreatePostModal";

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className=" bg-secondary overflow-hidden">
      Home page
      <button onClick={() => setIsModalVisible(true)}>Create post</button>
      <CreatePostModal
        onCreate={() => {
          setIsModalVisible(false);
        }}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

import { FacultySubject } from "../../components/FacultySubject/FacultySubject";
import { PostPreview } from "../../components/PostPreview/PostPreview";

export const Home = () => {
  return (
    <div className="w-full bg-secondary">
      Home page
      <FacultySubject
        subjectTitle="Operative Systems"
        subjectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."
      />
      <PostPreview
        postTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe fugit at
        ut itaque a, deleniti maiores assumenda veritatis exercitationem qui quo
        vel, quis nulla facere minus ea sapiente cupiditate earum!"
      />
    </div>
  );
};

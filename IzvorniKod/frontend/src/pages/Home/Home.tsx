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
      <PostPreview postTitle="efjenjkhwkbjckcbhkbjhbhnrjbvhrbvrkvkrekefjenjkhwkbjckcbhkbjhbhnrjbvhrbvrkvkrek" />
    </div>
  );
};

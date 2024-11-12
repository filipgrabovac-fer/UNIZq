import { FacultySubject } from "../../components/FacultySubject/FacultySubject";

export const Home = () => {
  return (
    <div className="w-full bg-secondary">
      Home page
      <FacultySubject
        subjectTitle="Operative Systems"
        subjectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."
        onClick={() => 0}
      />
    </div>
  );
};

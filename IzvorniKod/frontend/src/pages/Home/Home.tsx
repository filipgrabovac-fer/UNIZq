import { FacultySubject } from "../../components/FacultySubject/FacultySubject";
import { UserTableRow } from "../../components/UserTableRow/UserTableRow";

export const Home = () => {
  return (
    <div className=" bg-secondary overflow-hidden">
      Home page
      <FacultySubject
        subjectTitle="Operative Systems"
        subjectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."
        onClick={() => 0}
      />
      <div className="w-[70%]">
        <UserTableRow
          facultyUserId={0}
          username={"someRandomLongUsernameThatNeedsToBeTruncated"}
          email={"someEmailthatalsoneedtstobetruncated@gmail.com"}
          postsReported={1}
          isKicked={false}
          onKick={() => console.log("Kick this player")}
        />
      </div>
    </div>
  );
};

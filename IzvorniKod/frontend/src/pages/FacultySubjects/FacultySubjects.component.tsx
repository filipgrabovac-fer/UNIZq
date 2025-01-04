import { facultySubjectsRoute } from "../../routes/faculty-subjects.routes";

export const FacultySubjects = () => {
  const { facultyId } = facultySubjectsRoute.useParams();

  return (
    <div>
      <h1>Faculty Subjects</h1>
    </div>
  );
};

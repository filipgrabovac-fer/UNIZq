import { FacultySubject } from "../../components/FacultySubject/FacultySubject";
import { facultySubjectsRoute } from "../../routes/faculty-subjects.routes";
import { useGetFacultySubjects } from "./hooks/useGetFacultySubjects.hook";

export const FacultySubjects = () => {
  const { yearId } = facultySubjectsRoute.useParams();

  const { data } = useGetFacultySubjects({ facultyYearId: yearId });

  return (
    <div>
      <h1 className="px-4 text-[1.5rem] font-medium ml-4 mt-5">
        Faculty Subjects
      </h1>
      <div className="flex flex-wrap gap-4 mt-4 p-2">
        {data?.map((facultySubject, i) => (
          <FacultySubject
            key={i}
            onClick={() => console.log(facultySubject)}
            subjectDescription={facultySubject.description}
            subjectTitle={facultySubject.title}
          />
        ))}
      </div>
    </div>
  );
};

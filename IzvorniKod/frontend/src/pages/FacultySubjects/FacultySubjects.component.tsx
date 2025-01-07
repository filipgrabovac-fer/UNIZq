import { useNavigate } from "@tanstack/react-router";
import { FacultySubject } from "../../components/FacultySubject/FacultySubject";
import {
  facultySubjectsRoute,
  subjectPostsRoute,
} from "../../routes/faculty-subjects.routes";
import { useGetFacultySubjects } from "./hooks/useGetFacultySubjects.hook";
import { PlusIcon } from "@heroicons/react/24/solid";

export const FacultySubjects = () => {
  const { yearId } = facultySubjectsRoute.useParams();

  const { data } = useGetFacultySubjects({ facultyYearId: yearId });
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex align-middle mt-5">
        <h1 className="px-4 text-[1.5rem] font-medium ml-4  my-auto ">
          Faculty Subjects
        </h1>
        <button
          className="bg-primary w-8 h-8 rounded-sm justify-center flex my-auto"
          onClick={() => {}}
        >
          <PlusIcon className="w-5 h-5 m-auto" color="white" />
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 p-2">
        {data?.map((facultySubject, i) => (
          <FacultySubject
            key={i}
            onClick={() => {
              navigate({
                to: subjectPostsRoute.to,
                params: {
                  subjectId: facultySubject.id,
                },
              });
            }}
            subjectDescription={facultySubject.description}
            subjectTitle={facultySubject.title}
          />
        ))}
      </div>
    </div>
  );
};

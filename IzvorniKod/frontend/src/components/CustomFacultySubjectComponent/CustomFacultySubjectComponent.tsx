type CustomFacultySubjectComponent = {
  subjectTitle: string;
  subjectDescription: string;
  onClick: () => void;
};

export const CustomFacultySubjectComponent = ({
  subjectTitle,
  subjectDescription,
  onClick,
}: CustomFacultySubjectComponent) => {
  return (
    <div className="w-[250px] h-[250px] bg-primary rounded-[20px] p-[15px]">
      <p className="font-bold text-[26px] mb-[10px]">{subjectTitle}</p>
      <hr />
      <p className="mt-[10px] text-[14px]">{subjectDescription}</p>
    </div>
  );
};

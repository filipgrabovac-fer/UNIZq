type FacultySubjectType = {
  subjectTitle: string;
  subjectDescription: string;
  onClick: () => void;
};

export const FacultySubject = ({
  subjectTitle,
  subjectDescription,
  onClick,
}: FacultySubjectType) => {
  const formattedSubjectDescriptionDesktop =
    subjectDescription.length > 80
      ? `${subjectDescription.slice(0, 80)}...`
      : subjectDescription;

  const formattedSubjectDescriptionMobile =
    subjectDescription.length > 50
      ? `${subjectDescription.slice(0, 50)}...`
      : subjectDescription;

  return (
    <div
      onClick={onClick}
      className="w-[150px] h-[150px] bg-white rounded-[20px] p-[10px] min-[501px]:w-[250px] min-[501px]:h-[250px] min-[501px]:p-[15px]"
    >
      <p className="font-bold text-[18px] mb-[5px] min-[501px]:text-[26px] min-[501px]:mb-[10px]">
        {subjectTitle}
      </p>
      <hr />
      <p className="mt-[5px] text-[10px] min-[501px]:text-[14px] min-[501px]:mt-[10px]">
        <p className="max-[500px]:hidden">
          {formattedSubjectDescriptionDesktop}
        </p>
        <p className="min-[500px]:hidden">
          {formattedSubjectDescriptionMobile}
        </p>
      </p>
    </div>
  );
};

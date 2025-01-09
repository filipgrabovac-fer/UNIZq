type AdminApplicationTableRowType = {
  userId: number;
  facultyId: number;
  facultyName: string;
  userEmail: string;
  isApproved: boolean;
  onApprove: (userId: number) => void;
  userRole: string;
};

export const AdminApplicationTableRow = ({
  userId,
  facultyId,
  facultyName,
  userEmail,
  isApproved,
  onApprove,
  userRole,
}: AdminApplicationTableRowType) => {
  return (
    <div className="bg-white flex items-center px-4 py-1 scroll-py-14 border-t-gray_border border-t-[1px]">
      <div className="w-[20%]">{userId}</div>
      <div className="w-[20%] truncate">{facultyId}</div>
      <div className="w-[20%] truncate">{facultyName}</div>
      <div className="w-[20%] text-center truncate">{userEmail}</div>
      <div className="w-[10%] flex justify-end">
        {isApproved || userRole == "ADMIN" ? (
          <span className="rounded-full  text-green-500  p-1">Approved</span>
        ) : (
          <button
            onClick={() => onApprove(userId)}
            className="rounded-full text-white bg-green-500 p-1"
          >
            Approve
          </button>
        )}
      </div>
      <div className="w-[10%] flex justify-end">{userRole}</div>
    </div>
  );
};

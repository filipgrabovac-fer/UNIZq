import { AdminApplicationTableRow } from "./AdminApplicationTableRow/AdminApplicationTableRow";
import { useEffect, useState } from "react";

type AdminApplication = {
  userId: number;
  facultyId: number;
  facultyName: string;
  userEmail: string;
  isApproved: boolean;
  onApprove: (userId: number) => void;
  userRole: string;
};

type AdminApplicationTableType = {
  applications: AdminApplication[];
};

export const AdminApplicationTable = ({
  applications: initialApplications,
}: AdminApplicationTableType) => {
  const [applications, setApplications] =
    useState<AdminApplication[]>(initialApplications);
  // Ensure unique applications by userId and filter out undefined
  useEffect(() => {
    const uniqueApplications = Array.from(
      new Set(initialApplications.map((application) => application.userId))
    )
      .map((id) =>
        initialApplications.find((application) => application.userId === id)
      )
      .filter(
        (application): application is AdminApplication =>
          application !== undefined
      );

    setApplications(uniqueApplications);
  }, [initialApplications]);

  // const handleApprove = (userId: number) => {
  //   setApplications((prevApplications) =>
  //     prevApplications.map((application) =>
  //       application.userId === userId
  //         ? { ...application, isApproved: true, userRole: "ADMIN" }
  //         : application
  //     )
  //   );
  //   // Here you can add the logic to update the user's role in the backend
  //   console.log(`User ${userId} approved as ADMIN`);
  // };

  return (
    <div className="p-4">
      <div className="border-gray_border border-[1px] rounded-[10px] ">
        {/* Header Row */}
        <div className="flex items-center p-2">
          <div className="w-[20%]">userId</div>
          <div className="w-[20%] truncate">facultyId</div>
          <div className="w-[20%] truncate">facultyName</div>
          <div className="w-[20%] text-center truncate">userEmail</div>
          <p className="w-[10%] text-end">Status</p>
          <p className="w-[10%] text-end">Role</p>
        </div>

        {/* Scrollable Rows */}
        <div className="max-h-[75vh] overflow-y-auto max-md:max-h-[70vh]">
          {applications.map((application) => (
            <AdminApplicationTableRow
              key={application.userId}
              userId={application.userId}
              facultyId={application.facultyId}
              facultyName={application.facultyName}
              userEmail={application.userEmail}
              isApproved={application.isApproved}
              userRole={application.userRole}
              onApprove={() => application.onApprove(application.userId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

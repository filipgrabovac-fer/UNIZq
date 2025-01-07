import { useState } from "react";
import { AdminApplicationTable } from "../../components/AdminApplication/AdminApplicationTable";
import { Header } from "../../components/Header/Header";

type AdminApplication = {
  userId: number;
  facultyId: number;
  facultyName: string;
  userEmail: string;
  isApproved: boolean;
  userRole: string;
  onApprove: (userId: number) => void;
};

const initialApplications: AdminApplication[] = [
  {
    userId: 1,
    facultyId: 101,
    facultyName: "Faculty of Engineering",
    userEmail: "user1@example.com",
    isApproved: false,
    onApprove: () => console.log("Approved user 1"),
    userRole: "USER",
  },
  {
    userId: 2,
    facultyId: 102,
    facultyName: "Faculty of Science",
    userEmail: "user2@example.com",
    isApproved: false,
    onApprove: () => console.log("Approved user 2"),
    userRole: "ADMIN",
  },
];

const AdminApplicationPage = () => {
  const [applications, setApplications] =
    useState<AdminApplication[]>(initialApplications);

  const handleApprove = (userId: number) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.userId === userId
          ? { ...application, isApproved: true, userRole: "ADMIN" }
          : application
      )
    );
  };

  return (
    <div>
      <Header isSidebarOpen={false} setIsSidebarOpen={() => null} />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Admin Applications
      </h1>
      <AdminApplicationTable
        applications={applications.map((application) => ({
          ...application,
          onApprove: () => handleApprove(application.userId),
        }))}
      />
    </div>
  );
};

export default AdminApplicationPage;

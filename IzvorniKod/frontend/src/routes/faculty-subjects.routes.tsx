import { createRoute } from "@tanstack/react-router";
import { sidebarLayoutRoute } from "./layout.routes";
import { FacultySubjects } from "../pages/FacultySubjects/FacultySubjects.component";

export const facultySubjectsRoute = createRoute({
  getParentRoute: () => sidebarLayoutRoute,
  path: "/faculty/$facultyId",
  component: FacultySubjects,
});

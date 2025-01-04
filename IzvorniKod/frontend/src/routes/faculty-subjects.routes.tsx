import { createRoute } from "@tanstack/react-router";
import { sidebarLayoutRoute } from "./layout.routes";
import { FacultySubjects } from "../pages/FacultySubjects/FacultySubjects.component";
import { Post } from "../pages/Post/Post.component";
import { SubjectPosts } from "../pages/SubjectPosts/SubjectPosts.component";

export const _facultySubjectsRoute = createRoute({
  getParentRoute: () => sidebarLayoutRoute,
  path: "/faculty/$facultyId/year/$yearId",
});

export const facultySubjectsRoute = createRoute({
  getParentRoute: () => _facultySubjectsRoute,
  path: "/",
  component: FacultySubjects,
});

export const _subjectPostsRoute = createRoute({
  getParentRoute: () => _facultySubjectsRoute,
  path: "/subject/$subjectId",
});

export const subjectPostsRoute = createRoute({
  getParentRoute: () => _subjectPostsRoute,
  component: SubjectPosts,
  path: "/",
});

export const postRoute = createRoute({
  getParentRoute: () => _subjectPostsRoute,
  path: "/post/$postId",
  component: Post,
});

import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root.routes";
import {
  sidebarLayoutRoute,
  noSidebarLayoutRoute,
} from "./routes/layout.routes";
import { homeRoute } from "./routes/home.routes";
import { loginRoute } from "./routes/login.routes";
import { registerRoute } from "./routes/register.routes";
import { eventsRoute } from "./routes/events.routes";
import { defaultRoute } from "./routes/default.routes";
import { usersRoute } from "./routes/users.routes";
import { profileRoute } from "./routes/profile.routes";
import {
  _facultySubjectsRoute,
  _subjectPostsRoute,
  facultySubjectsRoute,
  postRoute,
  subjectPostsRoute,
} from "./routes/faculty-subjects.routes";
import { adminRoute } from "./routes/addminApplication.routes";

const routeTree = rootRoute.addChildren([
  sidebarLayoutRoute.addChildren([
    homeRoute,
    _facultySubjectsRoute.addChildren([facultySubjectsRoute]),
    _subjectPostsRoute.addChildren([
      subjectPostsRoute.addChildren([postRoute]),
    ]),
  ]),
  noSidebarLayoutRoute.addChildren([eventsRoute]),
  loginRoute,
  registerRoute,
  defaultRoute,
  usersRoute,
  profileRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree });

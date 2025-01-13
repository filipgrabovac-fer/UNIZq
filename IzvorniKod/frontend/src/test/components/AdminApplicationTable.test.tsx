import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminApplicationTable } from "../../components/AdminApplication/AdminApplicationTable";
import "@testing-library/jest-dom"; // for the toBeVisible matcher

test("mount component", () => {
  const applications = [
    {
      userId: 1,
      facultyId: 101,
      facultyName: "Faculty of Engineering",
      userEmail: "user1@example.com",
      isApproved: false,
      onApprove: () => {},
      userRole: "USER",
    },
  ];

  render(<AdminApplicationTable applications={applications} />);

  // Check for table headers
  expect(screen.getByText("userId")).toBeVisible();
  expect(screen.getByText("facultyId")).toBeVisible();
  expect(screen.getByText("facultyName")).toBeVisible();
  expect(screen.getByText("userEmail")).toBeVisible();
  expect(screen.getByText("Status")).toBeVisible();
  expect(screen.getByText("Role")).toBeVisible();

  // Check for application data
  expect(screen.getByText("Faculty of Engineering")).toBeVisible();
  expect(screen.getByText("user1@example.com")).toBeVisible();
});

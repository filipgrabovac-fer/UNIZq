import { test, expect } from "vitest";
import { AdminApplicationTable } from "../../components/AdminApplication/AdminApplicationTable";
import { render, screen } from "@testing-library/react";

test("mount component", async () => {
  expect(AdminApplicationTable).toBeTruthy();

  render(<AdminApplicationTable applications={[]} />);
  const screenText = screen.getByText("Admin Applications");
  expect(screenText).toBeVisible();
});

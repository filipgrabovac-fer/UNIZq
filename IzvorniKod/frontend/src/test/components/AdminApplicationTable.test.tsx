import { test, expect } from "vitest";
import { AdminApplicationTable } from "../../components/AdminApplication/AdminApplicationTable";

test("mount component", async () => {
  expect(AdminApplicationTable).toBeTruthy();
});

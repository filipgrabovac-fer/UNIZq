import { test, expect } from "vitest";
import { Users } from "../../pages/Users/Users";

test("answer component", async () => {
  expect(Users).toBeTruthy();
});

import { test, expect } from "vitest";
import { Home } from "../../pages/Home/Home";

test("answer component", async () => {
  expect(Home).toBeTruthy();
});

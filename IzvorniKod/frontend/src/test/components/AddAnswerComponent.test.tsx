import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { AddAnswerComponent } from "../../components/SearchComponent/AddAnswerComponent";

test("mount component", async () => {
  expect(AddAnswerComponent).toBeTruthy();

  render(<AddAnswerComponent postContent="" />);
});

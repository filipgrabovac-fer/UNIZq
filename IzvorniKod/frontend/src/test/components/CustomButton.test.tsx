import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import "@testing-library/jest-dom"; // for the toBeInTheDocument matcher

test("CustomButton component", async () => {
  expect(CustomButton).toBeTruthy();
});

test("renders CustomButton with required props", () => {
  render(
    <CustomButton variant="primary" title="Click Me" onClick={() => {}} />
  );
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = vi.fn();
  render(
    <CustomButton variant="primary" title="Click Me" onClick={handleClick} />
  );
  fireEvent.click(screen.getByText("Click Me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders loading spinner when loading is true", () => {
  render(
    <CustomButton
      variant="primary"
      title="Click Me"
      onClick={() => {}}
      loading={true}
    />
  );
  expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button").querySelector(".ant-spin")
  ).toBeInTheDocument();
});

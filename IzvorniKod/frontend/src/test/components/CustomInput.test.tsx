import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import "@testing-library/jest-dom"; // for the toBeInTheDocument matcher

test("renders CustomInput with title", () => {
  render(
    <CustomInput
      title="Test Title"
      placeholder="Test Placeholder"
      onChange={() => {}}
    />
  );
  expect(screen.getByText("Test Title")).toBeInTheDocument();
});

test("renders CustomInput with placeholder", () => {
  render(
    <CustomInput
      title="Test Title"
      placeholder="Test Placeholder"
      onChange={() => {}}
    />
  );
  expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
});

test("renders error message", () => {
  render(
    <CustomInput
      title="Test Title"
      placeholder="Test Placeholder"
      errorMessage="Error"
      onChange={() => {}}
    />
  );
  expect(screen.getByText("Error")).toBeInTheDocument();
});

test("toggles password visibility", () => {
  render(
    <CustomInput
      title="Test Title"
      placeholder="Test Placeholder"
      type="password"
      onChange={() => {}}
    />
  );
  const eyeIcon = screen.getByTitle("Show password");
  fireEvent.click(eyeIcon);
  expect(screen.getByPlaceholderText("Test Placeholder")).toHaveAttribute(
    "type",
    "text"
  );
  const eyeSlashIcon = screen.getByTitle("Hide password");
  fireEvent.click(eyeSlashIcon);
  expect(screen.getByPlaceholderText("Test Placeholder")).toHaveAttribute(
    "type",
    "password"
  );
});
test("accepts email input", () => {
  const handleChange = vi.fn();
  render(
    <CustomInput
      title="Email"
      placeholder="Enter your email"
      type="email"
      onChange={handleChange}
    />
  );
  const input = screen.getByPlaceholderText("Enter your email");
  fireEvent.change(input, { target: { value: "test@example.com" } });
  expect(input).toHaveValue("test@example.com");
  expect(handleChange).toHaveBeenCalled();
});
test("shows error for incorrect email input", () => {
  const handleChange = vi.fn();
  render(
    <CustomInput
      title="Email"
      placeholder="Enter your email"
      type="email"
      errorMessage="Invalid email address"
      onChange={handleChange}
    />
  );
  const input = screen.getByPlaceholderText("Enter your email");
  fireEvent.change(input, { target: { value: "invalid-email" } });
  expect(input).toHaveValue("invalid-email");
  expect(screen.getByText("Invalid email address")).toBeInTheDocument();
});

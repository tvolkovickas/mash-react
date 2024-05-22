import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("button displays title", () => {
  render(<Button title="Click me" />);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
});

test("button click fires event", async () => {
  let clicked = false;
  render(<Button title="Click me" onClick={() => (clicked = true)} />);
  await userEvent.click(screen.getByRole("button"));
  expect(clicked).toBe(true);
});

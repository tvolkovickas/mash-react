import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
  vi.useRealTimers();
});

test("it should display 4 categories", () => {
  render(<App />);
  expect(screen.getByText("Car")).toBeInTheDocument();
  expect(screen.getByText("Job")).toBeInTheDocument();
  expect(screen.getByText("Husband")).toBeInTheDocument();
  expect(screen.getByText("Kids")).toBeInTheDocument();
});

test("it increases timer on button click", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Start Timer"));
  vi.advanceTimersByTime(1000);
  await screen.findByText("Timer: 1");
  vi.advanceTimersByTime(1000);
  await screen.findByText("Timer: 2");
  expect(screen.getByTestId("timer").textContent).toEqual("Timer: 2");
});

test("it displays elimination button", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Start Timer"));
  vi.advanceTimersByTime(1000);
  await screen.findByText("Timer: 1");
  await userEvent.click(screen.getByText("Stop Timer"));
  expect(screen.getByText("Start Elimination")).toBeInTheDocument();
});

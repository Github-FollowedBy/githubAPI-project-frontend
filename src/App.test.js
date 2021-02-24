import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the application heading", () => {
  render(<App />);
  const linkElement = screen.getByText(/Git Hub API/i);
  expect(linkElement).toBeInTheDocument();
});
test("Test for getting results", async () => {
  render(<App />);
  const rightClick = { button: 2 };
  fireEvent.click(screen.getByText("Get Results"), rightClick);
});
test("Test for clear All button", async () => {
  render(<App />);
  const rightClick = { button: 2 };
  fireEvent.click(screen.getByText("Clear All"), rightClick);
});

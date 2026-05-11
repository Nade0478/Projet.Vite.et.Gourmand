import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders l'application Vite & Gourmand", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /Vite & Gourmand/i })
  ).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Author Quiz test", () => {
  render(<App />);
  const linkElement = screen.getByText(/Author Quiz/i);
  expect(linkElement).toBeInTheDocument();
});

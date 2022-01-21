import React from "react";
import { render, screen } from "@testing-library/react";
import Turn from "./Turn";

const currentAuthor = {
  books: [
    { title: "The Adventures of Huckleberry Finn" },
    { title: "The Shining" },
  ],
  author: {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  backgroundColor: "white",
};

test("renders Turn sucessfully", () => {
  const onAnswerCorrect = jest.fn();
  render(<Turn {...currentAuthor} onAnswer={onAnswerCorrect} />);
});

test("renders withbackgroundColore white", () => {
  const onAnswerCorrect = jest.fn();
  render(<Turn {...currentAuthor} onAnswer={onAnswerCorrect} />);
  const divElement = screen.getByTestId("data-testid");
  expect(divElement.style.backgroundColor).toBe("white");
});

test("renders with correct answer selected", () => {
  const onAnswerCorrect = jest.fn();
  render(<Turn {...currentAuthor} onAnswer={onAnswerCorrect} />);
  const linkElement = screen.getByText(
    "The Adventures of Huckleberry Finn"
  ).parentElement;

  linkElement?.click();

  expect(onAnswerCorrect).toHaveBeenLastCalledWith(true);
});

test("renders with incorrect answer selected", () => {
  const onAnswerCorrect = jest.fn();
  render(<Turn {...currentAuthor} onAnswer={onAnswerCorrect} />);
  const linkElement = screen.getByText("The Shining").parentElement;

  linkElement?.click();

  expect(onAnswerCorrect).toHaveBeenLastCalledWith(false);
});

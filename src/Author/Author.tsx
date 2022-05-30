import "../bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AuthorQuiz from "./AuthorQuiz";
import { AuthorModel } from "./Model/author.model";
import AddAuthor from "./AddAuthor";
import { shuffle, sample } from "underscore";
import { useState } from "react";

const authors: AuthorModel[] = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.png",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"],
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"],
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"],
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"],
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"],
  },
];

function getTurnData() {
  const allBooks = authors.reduce((p: string[], c: AuthorModel, i) => {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks.map((x: string) => ({ title: x })),
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

const Author = () => {
  const [turnData, setTurnData] = useState(getTurnData());
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [continueShow, setContinueShow] = useState<boolean>(false);

  const onAnswer = (correct: boolean) => {
    if (correct) {
      setBackgroundColor("green");
    } else {
      setBackgroundColor("red");
    }
    setContinueShow(correct);
  };

  let navigate = useNavigate();

  const authorAdded = (author: AuthorModel) => {
    authors.push(author);
    navigate("/author");
  };

  const onContinue = () => {
    setTurnData(getTurnData());
    setBackgroundColor("white");
    setContinueShow(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthorQuiz
            {...turnData}
            onAnswer={onAnswer}
            backgroundColor={backgroundColor}
            onContinue={onContinue}
            showContinueBtn={continueShow}
          />
        }
      />
      <Route path="add" element={<AddAuthor onAddAuthor={authorAdded} />} />
    </Routes>
  );
};

export default Author;

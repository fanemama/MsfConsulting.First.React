import "../bootstrap.min.css";
import Continue from "./Continue";
import Footer from "./Footer";
import Hero from "./Hero";
import { AuthorModel } from "./Model/author.model";
import Turn from "./Turn";
import { Link } from "react-router-dom";
import { useState } from "react";

interface AuthorQuizProps {
  books: { title: string }[];
  author: AuthorModel | undefined;
  showContinueBtn: boolean;
  backgroundColor: string;
  onContinue: { (): void };
  onAnswer: { (correct: boolean): void };
}

function AuthorQuiz(props: AuthorQuizProps) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...props} onAnswer={props.onAnswer} />
      <Continue show={props.showContinueBtn} onContinue={props.onContinue} />
      <p>
        <Link to="/add">Add author</Link>
      </p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;

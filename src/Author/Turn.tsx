import "./Turn.css";
import { AuthorModel } from "./Model/author.model";
import { BookModel } from "./Model/book.model";
import Book from "./Book";

interface ProPs {
  author: AuthorModel | undefined;
  books: BookModel[];
  onAnswer(correct: boolean): void;
  backgroundColor: string;
}

const Turn = (props: ProPs) => {
  const onAnswerSelected = (answer: string) => {
    const hasBeenWrittenByAuthor = props.author?.books.some(
      (x) => x === answer
    );
    props.onAnswer(Boolean(hasBeenWrittenByAuthor));
  };

  return (
    <div
      className="row turn"
      style={{ backgroundColor: props.backgroundColor }}
      data-testid="data-testid"
    >
      <div className="col-4 offste-1">
        <img
          src={props.author?.imageUrl}
          className="authorimage"
          alt="Author"
        />
      </div>
      <div className="col-6 ">
        {props.books.map((book) => (
          <Book book={book} key={book.title} onClick={onAnswerSelected}></Book>
        ))}
      </div>
    </div>
  );
};

export default Turn;

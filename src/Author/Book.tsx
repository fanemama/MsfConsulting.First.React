import { BookModel } from "./Model/book.model";
import "./Book.css";

interface Props {
  book: BookModel;
  onClick(title: string): void;
}
function Book(props: Props) {
  return (
    <div className="answer" onClick={() => props.onClick(props.book.title)}>
      <h4>{props.book.title}</h4>
    </div>
  );
}

export default Book;

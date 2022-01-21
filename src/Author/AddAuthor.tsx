import "./Book.css";
import "./AddAuthor.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { AuthorModel } from "./Model/author.model";

interface AddAuthorProps {
  onAddAuthor(author: AuthorModel): void;
}

const AddAuthor = (props: AddAuthorProps) => {
  const initialState = {
    name: "",
    imageUrl: "",
    books: [] as string[],
    bookTemp: "",
  };
  const [state, setstate] = useState(initialState);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onAddAuthor(state);
  };

  const handleAddBook = () => {
    setstate({
      ...state,
      books: state.books.concat([state.bookTemp]),
      bookTemp: "",
    });
  };

  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <form onSubmit={handleSubmit}>
        <div className="AddAuthorForm__input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={onFieldChange}
          />
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={state.imageUrl}
            onChange={onFieldChange}
          />
        </div>
        <div className="AddAuthorForm__input">
          <label htmlFor="bookTemp">Books</label>
          {state.books.map((book) => (
            <p key={book}>{book}</p>
          ))}
          <input
            type="text"
            name="bookTemp"
            value={state.bookTemp}
            onChange={onFieldChange}
          />
          <input type="button" value="+" onClick={handleAddBook} />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
export default AddAuthor;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Author from "./Author/Author";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="author" element={<Author />} />
          <Route path="*" element={<Author />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

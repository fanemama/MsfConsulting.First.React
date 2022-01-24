import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Author from "./Author/Author";
import ShoesStore from "./ShoesStore/ShoesStore";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="author" element={<Author />} />
          <Route path="shoes-store" element={<ShoesStore />} />
          <Route path="*" element={<ShoesStore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

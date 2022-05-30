import "./App.css";
import { Route, Routes } from "react-router-dom";
import Author from "./Author/Author";
import ShoesStore from "./ShoesStore/ShoesStore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="author/*" element={<Author />} />
        <Route path="shoes-store/*" element={<ShoesStore />} />
        <Route path="*" element={<ShoesStore />} />
      </Routes>
    </div>
  );
}

export default App;

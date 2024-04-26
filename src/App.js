import "./App.css";
import Home from "./screens/Home";
import Favourites from "./screens/Favourites";
import Search from "./screens/Search";
import Place from "./screens/Place";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/favourites" element={<Favourites />} />
          <Route
            path="place/:id"
            element={<Place />}
            loader={({ params }) => params.id}
            action={({ params }) => params.id}
          />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

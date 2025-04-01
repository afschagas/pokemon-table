import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import './App.css';
import Home from "./pages/Home";
import Details from "./pages/Details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhes" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;

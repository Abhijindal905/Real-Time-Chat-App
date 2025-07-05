import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./pages/Footer.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

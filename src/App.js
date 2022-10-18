import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Profil from "./components/profil";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profil" exact element={<Profil />} />
      </Routes>
    </div>
  );
}

export default App;

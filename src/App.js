import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useReducer } from "react";
import Login from "./components/login";
import Profil from "./components/profil";
import UserContext from "./context/contextUser";
import reducer from "./context/reducerUser";

function App() {
  const initalState = "";
  const [state, dispatch] = useReducer(reducer, initalState);

   

  return (
    <div>
      <UserContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />            
            <Route path="/profil" exact element={state.token? <Profil /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

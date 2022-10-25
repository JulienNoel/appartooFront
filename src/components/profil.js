import "../styles/profil.css";
import Button from "@mui/material/Button";
import { useContext } from "react";
import RoleColumn from "./roleColumn";
import AmisColumn from "./amisColumn";
import UserContext from "../context/contextUser";
import { useNavigate } from "react-router-dom";

function Profil() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();



  function deconnection() {
    dispatch({type: 'addUser', user: ''})
    navigate("/");
  }

  

  return (
    <div className="profil-container">
      <div className="deconnection-btn">
        <Button sx={{ width: 180 }} variant="contained" onClick={deconnection}>
          Deconnection
        </Button>
      </div>
      <div className="profil-card">
        <RoleColumn token={state.token} roleUser={state.role}/>
        <AmisColumn token={state.token} />
      </div>
    </div>
  );
}

export default Profil;

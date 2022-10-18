import "../styles/profil.css";
import Button from "@mui/material/Button";

import RoleColumn from "./roleColumn";
import AmisColumn from "./amisColumn";

function Profil() {
  return (
    <div className="profil-container">
      <div className="deconnection-btn">
        <Button sx={{ width: 180 }} variant="contained">
          Deconnection
        </Button>
      </div>
      <div className="profil-card">
        <RoleColumn />
        <AmisColumn />
      </div>
    </div>
  );
}

export default Profil;

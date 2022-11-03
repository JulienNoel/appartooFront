import Avatar from "@mui/material/Avatar";

function RoleCard({ img, role, noHover, selectionChange }) {
    
  
  
    return (
      <div className={noHover? 'role-container disable' : 'role-container'} >
      {img? <img className="role-card" src={img} alt={role} style={selectionChange?.role === role? {borderColor: 'green'}: {borderColor: 'black'}}/>: <Avatar alt={role} src={img} className="role-card" sx={{width: 150, height: 150}}/>}
        
        <h3>{role}</h3>
      </div>
    );
  }

  export default RoleCard
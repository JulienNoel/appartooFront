function RoleCard({ img, role, noHover, selectionChange }) {
    
  
  
    return (
      <div className={noHover? 'role-container disable' : 'role-container'} >
        <img className="role-card" src={img} alt={role} style={selectionChange?.role === role? {borderColor: 'green'}: {borderColor: 'black'}}/>
        <h3>{role}</h3>
      </div>
    );
  }

  export default RoleCard
const reducer = (state, action) => {
    switch (action.type) {
      case "addUser":
        const token = action.user.token 
        const role = action.user.role    
        
        return { token, role };
  
      default:
        return state;
    }
  };
  
  export default reducer;
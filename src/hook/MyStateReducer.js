const MyStateReducer = (currentState, action) => {
    switch (action.type) {
      case "playing":
        return action.payload;
      case "gameover":
        return null;
    }
    return currentState;
  };
  
  export default MyStateReducer;
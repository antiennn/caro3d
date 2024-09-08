const MyStateReducer = (currentState, action) => {
    switch (action.type) {
      case "playing":
        return action.payload;
      case "playonline":
        return action.payload;
      case "waiting":
        return action.payload
      case "start":
          return action.payload
      case "gameover":
        return null;
    }
    return currentState;
  };
  
  export default MyStateReducer;
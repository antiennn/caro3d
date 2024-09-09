const MyWaitingReducer = (currentState, action) => {
    switch (action.type) {
      case "waiting":
        return action.payload;
    }
    return currentState;
  };
  
  export default MyWaitingReducer;
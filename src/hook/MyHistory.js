const MyHistoryReducer = (currentState, action) => {
    switch (action.type) {
      case "add_infomation":
        return [...currentState, action.payload];
      default:
            return currentState;
    }
  };
  
  export default MyHistoryReducer;
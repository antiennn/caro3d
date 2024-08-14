import { useReducer } from "react";
import "./App.css";
import Background from "./components/Background";
import Information from "./components/Information";
import Starter from "./components/Starter";

import { MyHistoryContext, MyStateContext } from "./configs/MyContext";
import MyStateReducer from "./hook/MyStateReducer";
import MyHistoryReducer from "./hook/MyHistory";
function App() {
  const [state, dispatch] = useReducer(MyStateReducer, null);
  const [history, dispatchHistory] = useReducer(MyHistoryReducer, []);
  return (
    <MyStateContext.Provider value={[state, dispatch]}>
      <MyHistoryContext.Provider value={[history, dispatchHistory]}>
        <div className="App">
          <header className="App-header">
            <Starter />
            <Information />
            <Background />
          </header>
        </div>
      </MyHistoryContext.Provider>
    </MyStateContext.Provider>
  );
}

export default App;

import { useReducer } from "react";
import "./App.css";
import Background from "./components/Background";
import Information from "./components/Information";
import Starter from "./components/Starter";

import {
  MyHistoryContext,
  MyStateContext,
  MyUserContext,
} from "./configs/MyContext";
import MyStateReducer from "./hook/MyStateReducer";
import MyHistoryReducer from "./hook/MyHistory";
import MyUserReducer from "./hook/MyUserReducer";
import Loading from "./components/Loading";
function App() {
  const [state, dispatch] = useReducer(MyStateReducer, "start");
  const [history, dispatchHistory] = useReducer(MyHistoryReducer, []);
  const [user, dispatchuser] = useReducer(MyUserReducer, null);
  return (
    <MyStateContext.Provider value={[state, dispatch]}>
      <MyHistoryContext.Provider value={[history, dispatchHistory]}>
        <MyUserContext.Provider value={[user, dispatchuser]}>
          <div className="App">
            <header className="App-header">
              <Loading />
              <Starter />
              <Information />
              <Background />
            </header>
          </div>
        </MyUserContext.Provider>
      </MyHistoryContext.Provider>
    </MyStateContext.Provider>
  );
}

export default App;

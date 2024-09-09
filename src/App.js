import { useReducer } from "react";
import "./App.css";
import Background from "./components/Background";
import Information from "./components/Information";
import Starter from "./components/Starter";

import {
  MyHistoryContext,
  MyStateContext,
  MyUserContext,
  MyWaitingContext,
} from "./configs/MyContext";
import MyStateReducer from "./hook/MyStateReducer";
import MyHistoryReducer from "./hook/MyHistory";
import MyUserReducer from "./hook/MyUserReducer";
import Loading from "./components/Loading";
import Waiting from "./components/Waiting";
import MyWaitingReducer from "./hook/MyWaiting";
function App() {
  const [state, dispatch] = useReducer(MyStateReducer, "start");
  const [history, dispatchHistory] = useReducer(MyHistoryReducer, []);
  const [user, dispatchuser] = useReducer(MyUserReducer, null);
  const [waiting, dispatchWaiting] = useReducer(MyWaitingReducer, false);
  return (
    <MyStateContext.Provider value={[state, dispatch]}>
      <MyHistoryContext.Provider value={[history, dispatchHistory]}>
        <MyUserContext.Provider value={[user, dispatchuser]}>
          <MyWaitingContext.Provider value={[waiting, dispatchWaiting]}>
            <div className="App">
              <header className="App-header">
                <Loading />
                <Waiting />
                <Starter />
                <Information />
                <Background />
              </header>
            </div>
          </MyWaitingContext.Provider>
        </MyUserContext.Provider>
      </MyHistoryContext.Provider>
    </MyStateContext.Provider>
  );
}

export default App;

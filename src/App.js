import { useReducer } from 'react';
import './App.css';
import Background from './components/Background';
import Information from './components/Information';
import Starter from './components/Starter';

import MyContext from './configs/MyContext';
import MyStateReducer from './hook/MyStateReducer';
function App() {
  const [state, dispatch] = useReducer(MyStateReducer, null);
  return (
    <MyContext.Provider value={[state, dispatch]}>
    <div className="App">
      <header className="App-header">
        <Starter/>
        <Information/>
        <Background />
      </header>
    </div>
    </MyContext.Provider>
  );
}

export default App;

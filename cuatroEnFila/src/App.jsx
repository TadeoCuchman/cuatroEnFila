import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import GameContainer from "./Pages/GameContainer";
import Home from "./Components/Home";

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function App() {
  // const [mode, setMode] = useState("Multiplayer");
  const [mode, setMode] = useState("Invite a friend");
  const [players, setPlayers] = useState([
      {
        index: 0,
        name: "Player"
      },
      {
        index: 1,
        name: "Player2",
      },
  ]);
  const [context, setContext] = useState();

  useEffect(()=>{
    setContext(s4())
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home players={players} setPlayers={setPlayers} context={context} mode={mode} setMode={setMode}/>} />
            <Route path={`/Game`} element={<GameContainer players={players} setPlayers={setPlayers} mode={mode}/>} />
        </Routes>
      </BrowserRouter>

      {/* {game && <Game players={players} size={size} mode={mode} context={context} />} */}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Game from "./Components/Game";

function App() {
  const [players, setPlayers] = useState([
    {
      index: 1,
      name: "Player1",
    },
    {
      index: 2,
      name: "Player2",
    },
  ]);
  const [game, setGame] = useState(null);
  const [size, setSize] = useState(8);
  const [mode, setMode] = useState("Invite a friend");

  return (
    <div className="App">
      {game ? (
        ""
      ) : (
        <>
          <img
            src="/four.svg"
            alt="fourLogo"
            style={{ width: "50px", marginBottom: "50px" }}
          />
          <span style={{ marginBottom: "50px" }}>
            Rules: Put 4 coins on a row to win, but do not let the other player
            make it first!
          </span>
          <select onChange={(e) => setMode(e.target.value)}>
            <option>Invite a friend</option>
{/*             <option>Online</option> */}           
            <option>Multiplayer</option>
          </select>
          <span>Player1:</span>
          <input
            type="text"
            value={players[0].name}
            onClick={(e) => e.target.select()}
            onChange={(e) => {
              players[0].name = e.target.value;
              setPlayers([...players]);
            }}
          />
          {mode === "Multiplayer" ? (
            <>
              <span>Player2:</span>
              <input
                type="text"
                value={players[1].name}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  players[1].name = e.target.value;
                  setPlayers([...players]);
                }}
              />
            </>
          ) : (
            ""
          )}
{/*           <span>Choose the size of the game:</span>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          /> */}
          <button onClick={() => setGame(true)}>Start</button>
        </>
      )}

      {game && <Game players={players} size={size} />}
    </div>
  );
}

export default App;

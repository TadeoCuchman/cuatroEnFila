import { useState, useEffect } from 'react'
import './App.css'
import Game from './Components/Game'


function App() {
  const [players, setPlayers] = useState([
    {
      index: 1,
      name:'Player1'},
    {
      index:2,
      name:'Player2'
    }
  ])
  const [game, setGame] = useState(false)

  return (
    <div className="App">
      { game ? '' :
      <>
      <span>Rules: Put 4 coins on a row to win, but do not let the other player make it first!</span>
      <span>Player1:</span>
      <input type="text" value={players[0].name} onClick={(e) => e.target.select()} onChange={(e)=> {
        players[0].name = e.target.value
        setPlayers([...players])
      }}/>
      <span>Player2:</span>
      <input type="text" value={players[1].name} onClick={(e) => e.target.select()} onChange={(e)=> {
        players[1].name = e.target.value
        setPlayers([...players])
      }}/>
      <button onClick={()=>setGame(true)}>Start</button>
      </>}

      {game && <Game players={players} />}
    </div>
  )
}

export default App

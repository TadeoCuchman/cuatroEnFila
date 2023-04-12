import React from 'react';
import { useEffect, useState  } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../Components/Modal";
import Names from "../Components/Names";
import Game from "../Components/Game";
import ChooseNameModal from '../Components/ChooseNameModal';
import init from "../scripts/websocket.js"



function GameContainer({ mode, invited, players, setPlayers, rerender, setRerender}) {
  const location = useLocation();

  const [waiting, setWaiting] = useState(true);
  const [modal, setModal] = useState(false);
  const [size, setSize] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return (searchParams.get('size'))
  });
  const [error, setError] = useState("");
  const [winner, setWinner] = useState('');
  const [gamesCount, setGamesCount] = useState({player1: 0, player2:0});
  const [webWinner, setWebWinner] = useState({name: '', id: ''});
  const [isAllowed, setIsAllowed] = useState(false);
  const [lastWon, setLastWon] = useState(null);

  useEffect(() => {
    console.log(winner)
    if(winner == 'player1'){
      setWebWinner({name: players[0].name, id: players[0].id})
      setLastWon(0)
      
      
    }
    if(winner == 'player2'){
      setWebWinner({name: players[1].name, id: players[1].id})
      setLastWon(1)
    }
    console.log(webWinner)
  }, [winner])

  useEffect(() => {
    setTimeout(() => {
      console.log(players)
    },1000)
  }, [players])
  
  // const [players, setPlayers] = useState([
  //     {
  //       index: 0,
  //       name: "Player"
  //     },
  //     {
  //       index: 1,
  //       name: "Player2",
  //     },
  // ]);



  if(mode=='Invite a friend' && !rerender){
    init(setWaiting, setPlayers, players, invited, size, setIsAllowed, setGamesCount)
  }

  const isOpenModal = () => {
  
  }

  const onSubmitModal = (name) => {
  }
  
  return (
    <div className="gameContainer">
        {waiting && mode == 'Invite a friend'? <ChooseNameModal isOpen={isOpenModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={true}/> : ''}
        <Names players={players} gamesCount={gamesCount}/>
        <Game size={size} mode={mode} gamesCount={gamesCount} setModal={setModal} modal={modal} winner={winner} setWinner={setWinner} setError={setError} isAllowed={isAllowed} lastWon={lastWon}/>
        {modal ? (
            <Modal
            setError={setError}
            error={error}
            setModal={setModal}
            winner={winner}
            webWinner={webWinner}
            setWinner={setWinner}
            mode={mode}
            />
        ) : (
            ""
        )}
    </div>
  );
}

export default GameContainer;
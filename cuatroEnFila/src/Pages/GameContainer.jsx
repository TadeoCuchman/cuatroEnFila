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
  const [winner, setWinner] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);
  
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
    init(setWaiting, setPlayers, players, invited, size, setIsAllowed)
  }

  const isOpenModal = () => {
  
  }

  const onSubmitModal = (name) => {
  }
  
  return (
    <div className="gameContainer">
        {waiting && mode == 'Invite a friend'? <ChooseNameModal isOpen={isOpenModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={true}/> : ''}
        <Names players={players}/>
        <Game size={size} mode={mode} setModal={setModal} winner={winner} setWinner={setWinner} setError={setError} isAllowed={isAllowed}/>
        {modal ? (
            <Modal
            setError={setError}
            error={error}
            setModal={setModal}
            winner={winner}
            setWinner={setWinner}
            />
        ) : (
            ""
        )}
    </div>
  );
}

export default GameContainer;
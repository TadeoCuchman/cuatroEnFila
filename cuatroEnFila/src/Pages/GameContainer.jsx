import React from 'react';
import { useEffect, useState  } from "react";
import Modal from "../Components/Modal";
import Names from "../Components/Names";
import Game from "../Components/Game";
import ChooseNameModal from '../Components/ChooseNameModal';
import init from "../scripts/websocket.js"


function GameContainer({size, mode}) {
    const [waiting, setWaiting] = useState(true);
    const [modal, setModal] = useState(false);
    const [invited, setInvited] = useState(false);
    const [error, setError] = useState("");
    const [winner, setWinner] = useState("");
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




    if(mode=='Invite a friend'){
        console.log(players)
        init(players[0].name, setWaiting, setPlayers, players, setInvited, invited)
    }

    const isOpenModal = () => {
    
    }
    const onCloseModal = () => {
      setInvited(false)
  
    }
    const onSubmitModal = () => {
      setInvited(false)
    }
  
  return (
    <div className="gameContainer">
        {waiting && mode == 'Invite a friend'? <ChooseNameModal isOpen={isOpenModal} onClose={onCloseModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={true}/> : ''}
        {invited ? <ChooseNameModal isOpen={isOpenModal} onClose={onCloseModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={false} /> : ''}
        <Names players={players}/>
        <Game size={size} mode={mode} setModal={setModal} winner={winner} setWinner={setWinner} setError={setError}/>
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
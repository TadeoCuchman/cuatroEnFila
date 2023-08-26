import React from 'react';
import { useEffect, useState  } from "react";
import { useLocation, Link } from "react-router-dom";

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
  const [webWinner, setWebWinner] = useState({name: '', id: ''});
  const [isAllowed, setIsAllowed] = useState(false);
  const [lastWon, setLastWon] = useState(null);

  useEffect(() => {
    if(winner == 'player1'){
      setWebWinner({name: players[0].name, id: players[0].id})
      setLastWon(0)
      players[0].winCount += 1
      setPlayers([...players, ])
    }
    if(winner == 'player2'){
      setWebWinner({name: players[1].name, id: players[1].id})
      setLastWon(1)
      players[1].winCount += 1
      setPlayers([...players])
    }
    // console.log(webWinner)
  }, [winner])

  useEffect(() => {
    setTimeout(() => {
      setRerender
    }, 1000)
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
    console.log('entroaca');
    init(setWaiting, setPlayers, players, invited, size, setIsAllowed)
  }

  const isOpenModal = () => {
  
  }

  const onSubmitModal = (name) => {
  }
  
  return (
    <div className="gameContainer">
        {waiting && mode == 'Invite a friend'? <ChooseNameModal isOpen={isOpenModal} onSubmit={onSubmitModal} setPlayers={setPlayers} players={players} waiting={true}/> : ''}
        <Link to={'/'}><button>Leave Game</button></Link>
        <Names players={players}/>
        <Game size={size} mode={mode} setModal={setModal} modal={modal} winner={winner} setWinner={setWinner} setError={setError} isAllowed={isAllowed} lastWon={lastWon}/>
        {modal ? (
            <Modal
            setError={setError}
            error={error}
            setModal={setModal}
            winner={winner}
            webWinner={webWinner}
            setWinner={setWinner}
            mode={mode}
            setPlayers={setPlayers}
            />
        ) : (
            ""
        )}
    </div>
  );
}

export default GameContainer;
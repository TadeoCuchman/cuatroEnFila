import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const style = {

//   error: {
//     backgroundColor: 'rgba(133, 39, 39, 0.301)',
//     width: '300px',
//     height: '50px',
//     textAlign: 'center',
//     paddingTop: '10px',


//   },
//   success: {
//     backgroundColor: 'rgba(14, 192, 136, 0.791)',
//     width: '300px',
//     height: '200px'
//   }
}


const Home = ({players, setPlayers, context, mode, setMode}) => {
    const [game, setGame] = useState(null);
    const [size, setSize] = useState(8);
 
    
    useEffect(() => {
     
    }, [])

  

    return (
      <div className="Home" style={{width: '100%', height: '100vh'}}>
        {game ? ("") : (
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
            <span>Player:</span>
            <input
                type="text"
                value={players[0].name}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                players[0].name = e.target.value;
                setPlayers([...players]);
                }}
            />
            {mode === "Invite a friend" ? <span>Url: <Link to={{ pathname: '/preGame', search: `?context=${context}&invited=true` }} target="_blank">{window.location.origin}/preGame/{context}</Link></span> : ''}
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

          <button><Link to={{ pathname: '/Game', search: `?context=${context}`}}>Go to Game</Link></button>
        </>
      )}
      </div>
    )
}

export default Home
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
    const [linkUrl, setLinkUrl] = useState('');
    const [copied, setCopied] = useState(false);
 
    
    useEffect(() => {

        setLinkUrl(`${window.location.origin}/preGame/?context=${context}&invited=true&size=${size}`)
        sessionStorage.setItem("actualGameLink", `${window.location.origin}/preGame/?context=${context}&invited=true&size=${size}`)

    }, [context])

  

    return (
      <div className="Home" style={{width: '100%', height: '100vh'}}>
        {game ? ("") : (
            <>
            <img
                src="/four.svg"
                alt="fourLogo"
                style={{ width: "50px", marginBottom: "50px" }}
            />
            <h5 style={{ marginBottom: "50px" }}>
                Rules: Put 4 coins on a row to win, but do not let the other player
                make it first!
            </h5>
            {/* <span>Choose the size of the game:</span>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <br />
          <br /> */}
            <select onChange={(e) => setMode(e.target.value)}>
                <option>Multiplayer</option>
                <option>Invite a friend</option>
    {/*             <option>Online</option> */}           
            </select>
            <br />
            <span>Choose Your Name:</span>
            <input
                type="text"
                value={players[0].name}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                players[0].name = e.target.value;
                setPlayers([...players]);
                }}
            />
            {/* {mode === "Invite a friend" ? 
            <div style={{display:'flex', flexDirection:'column', alignItems: 'center', marginTop:'20px'}} >
              Url: {linkUrl}
                <button style={{ marginTop:'10px', height:'20px'}} onClick={(event) => {
                  event.preventDefault();
                  if (navigator.clipboard && !copied) {
                    navigator.clipboard.writeText(linkUrl);
                    event.target.style.backgroundColor = 'green';
                    // // console.log(event.target.style.backgroundColor) 
                    setCopied(true)
                    setTimeout(() => {
                      event.target.style.backgroundColor = '';
                      // // console.log(event.target.style.backgroundColor) 
                      setCopied(false)
                    }, 500)
                  }
            }}> Copy </button>
            </div> : ''} */}
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
            <br />
            <br />
         

            <Link style={{textDecoration:'none', color:'black'}} to={{ pathname: '/Game', search: mode == 'Multiplayer' ? '' : `?context=${context}&size=${size}` }}>
              <button style={{height:'50px', width:'100px', boxShadow:' 0 1px 2px rgba(0,0,0,.2)' ,border: 'none', backgroundColor:' rgba(130, 3, 130, 0.683)',cursor:'pointer'}} >
                Go to Game
              </button>
            </Link>   
         </>
      )}
      </div>
    )
}

export default Home
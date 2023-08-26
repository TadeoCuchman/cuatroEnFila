import React, { useEffect } from 'react';

function Names({players}) {
  useEffect(() => console.log(players), [players]);
  return (
    <div style={{ marginTop: '20px' }}>
      <span id="player1" style={{ backgroundColor: "red", padding: '10px'  }}>{players[0].name} {players[0].winCount}</span>
      <span>VS</span>
      <span id="player2" style={{ backgroundColor: "green", padding: '10px' }}>{players[1].name} {players[1].winCount}</span>
      <br />  
    </div>
  );
}

export default Names;
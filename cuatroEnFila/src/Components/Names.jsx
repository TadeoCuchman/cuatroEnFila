import React from 'react';

function Names({players}) {
  return (
    <div>
      <span id="player1" style={{ backgroundColor: "red" }}>{players[0].name}</span>
      <span>VS</span>
      <span id="player2" style={{ backgroundColor: "green" }}>{players[1].name}</span>
      <br />  
    </div>
  );
}

export default Names;
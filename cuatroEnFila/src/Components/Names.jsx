import React from 'react';

function Names({players, gamesCount}) {
  return (
    <div>
      <span id="player1" style={{ backgroundColor: "red" }}>{players[0].name}</span>
      {gamesCount.player1 != 0 || gamesCount.player2 != 0 ? 
      <span> {gamesCount.player1}</span> : ''}
      <span>VS</span>
      <span id="player2" style={{ backgroundColor: "green" }}>{players[1].name}</span>
      {gamesCount.player1 != 0 || gamesCount.player2 != 0 ? 
      <span> {gamesCount.player2}</span> : ''}
      <br />  
    </div>
  );
}

export default Names;
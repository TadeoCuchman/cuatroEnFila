import { useEffect, useState  } from "react";


const width = 8;

const notValidLeft = [];
for (let i = 0; i < width * width; i++) {
  if (width - 5 + width * Math.floor(i / width) > i) {
    notValidLeft.push(i);
  }
}

const notValidRigth = [];
for (let i = 1; i <= width * width; i++) {
  if (width - 4 + width * Math.floor(i / width) < i) {
    notValidRigth.push(i);
  }
}


const Game = ({size, mode, setModal, winner, setWinner, setError, isAllowed}) => {
  const [boxes, setBoxes] = useState([]);
  const [turn, setTurn] = useState(0);
  
  // const matrix = Array(8).fill().map(() => Array(8).fill(0));
  // const [gameState, setGameState] = useState(matrix);
  
  const players = [
    {
      index: 0,
      name: "Player"
    },
    {
      index: 1,
      name: "Player2",
    },
];

  
  
  const createBoard = () => {
    const boxes = [];
    for (let i = 0; i < width * width; i++) {
      const box = { to: "" };
      boxes.push(box);
    }
    setBoxes(boxes); 
  };
  
  
  useEffect(() => {
   
    createBoard();
   
  }, []);


  
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= (width - 1) * width - 1; i++) {
      if (boxes[i + width].to == "") {
        boxes[i + width].to = boxes[i].to;
        boxes[i + width].alt = boxes[i].alt;
        boxes[i].to = "";
        boxes[i].alt = "";
      }
    }
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i < (width - 3) * width; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];

      if (columnOfFour.every((box) => boxes[box].to == "player1")) {
        setWinner("player1");
        setModal(true);
      }

      if (columnOfFour.every((box) => boxes[box].to == "player2")) {
        setWinner("player2");
        setModal(true);
      }
    }
  };

  const checkRowOfFour = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];

      if (notValidRigth.includes(i)) continue;

      if (rowOfFour.every((box) => boxes[box].to == "player1")) {
        setWinner("player1");
        setModal(true);
      }

      if (rowOfFour.every((box) => boxes[box].to == "player2")) {
        setWinner("player2");
        setModal(true);
      }
    }
  };

  const checkDiagonalOfFourToLeft = () => {
    for (let i = 0; i < width * (width - 3); i++) {
      const diagonalOfFourLeft = [
        i,
        i + width - 1,
        i + width * 2 - 2,
        i + width * 3 - 3,
      ];

      if (notValidLeft.includes(i)) continue;

      if (diagonalOfFourLeft.every((box) => boxes[box].to == "player1")) {
        setWinner("player1");
        setModal(true);
      }

      if (diagonalOfFourLeft.every((box) => boxes[box].to == "player2")) {
        setWinner("player2");
        setModal(true);
      }
    }
  };

  const checkDiagonalOfFourToRigth = () => {
    for (let i = 0; i < width * (width - 3); i++) {
      const diagonalOfFourRigth = [
        i,
        i + width + 1,
        i + width * 2 + 2,
        i + width * 3 + 3,
      ];

      if (notValidRigth.includes(i)) continue;

      if (diagonalOfFourRigth.every((box) => boxes[box].to == "player1")) {
        setWinner("player1");
        setModal(true);
      }

      if (diagonalOfFourRigth.every((box) => boxes[box].to == "player2")) {
        setWinner("player2");
        setModal(true);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      moveIntoSquareBelow();
      checkColumnOfFour();
      checkRowOfFour();
      checkDiagonalOfFourToLeft();
      checkDiagonalOfFourToRigth();
      setBoxes([...boxes]);
    }, 200);
    return () => clearInterval(timer);
  }, [
    moveIntoSquareBelow,
    checkColumnOfFour,
    checkRowOfFour,
    checkDiagonalOfFourToLeft,
    checkDiagonalOfFourToRigth,
  ]);

  const markBoxes = (index) => {
    if (boxes[index].to == "" && winner == "") {
      if (turn == 0) {
        boxes[Math.round(index % width)].to = "player1";
        setTurn(1);
      } else {
        boxes[Math.round(index % width)].to = "player2";
        setTurn(0);
      }
      setBoxes([...boxes]);
    } else {
      setError("Box taken!");
      setModal(true);
    }
  };

  const markBoxesOnline = (index) => {
    console.log(isAllowed)
    if (isAllowed) {
      if (boxes[index].to == "" && winner == "" ) {
        if(players[0].index == turn){
          boxes[Math.round(index % width)].to = "player1";
        } else {
          boxes[Math.round(index % width)].to = "player2";
        }
      } else {
        setError("Box taken!");
        setModal(true);
      }
        turn == 0 ? setTurn(1) : setTurn(0)
        setBoxes([...boxes]);
    }
  }

  const colorOfBox = (player) => {
    if (player == "player1") {
      return "red";
    } else if (player == "player2") {
      return "green";
    }
    return "brown";
  };


  return (
      <div className="game">
        {boxes.map((box, index) => (
          <img
            key={index}
            id={index}
            className="box"
            style={{
              backgroundColor: colorOfBox(box.to),
              width: window.screen.width < 420 ? `${360 / width}px` : `${580 / width}px`,
            }}
            data-isallowed={isAllowed}
            alt={box.to}
            onClick={(e) => {
              e.preventDefault()
                mode == 'Multiplayer' ? markBoxes(index) : markBoxesOnline(index)
            }}
          ></img> 
        ))}
      </div>
  );
};

export default Game;

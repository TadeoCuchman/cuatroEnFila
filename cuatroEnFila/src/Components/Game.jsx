import { useEffect, useState } from "react";


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


const Game = ({ size, mode, setModal, winner, setWinner, setError, isAllowed, lastWon }) => {
  const [boxes, setBoxes] = useState([]);
  const [columns, setColumns] = useState([]);
  const [turn, setTurn] = useState(0);

  // const matrix = Array(8).fill().map(() => Array(8).fill(0));
  // const [gameState, setGameState] = useState(matrix);

  const players = [
    {
      index: 0,
    },
    {
      index: 1,
    },
  ];



  const createBoard = () => {
    const boxes = [];
    for (let i = 0; i < width * width; i++) {
      const box = { to: "" };
      boxes.push(box);
    }
    for (let i = 0; i < width; i++) {
      const column = { id: i + 'column', column: i };
      columns.push(column);
    }
    setColumns(columns);
    setBoxes(boxes);
  };


  useEffect(() => {
    if (lastWon != null) {
      setTurn(lastWon)
    }
    createBoard();

  }, [winner]);

  const onWinner = (player) => {
    setWinner(player);
    setModal(true);
  }



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
        onWinner("player1");
      }

      if (columnOfFour.every((box) => boxes[box].to == "player2")) {
        onWinner("player2");
      }
    }
  };

  const checkRowOfFour = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];

      if (notValidRigth.includes(i)) continue;

      if (rowOfFour.every((box) => boxes[box].to == "player1")) {
        onWinner("player1");
      }

      if (rowOfFour.every((box) => boxes[box].to == "player2")) {
        onWinner("player2");
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
        onWinner("player1");
      }

      if (diagonalOfFourLeft.every((box) => boxes[box].to == "player2")) {
        onWinner("player2");
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
        onWinner("player1");
      }

      if (diagonalOfFourRigth.every((box) => boxes[box].to == "player2")) {
        onWinner("player2");
      }
    }
  };

  useEffect(() => {
    if(!winner){
      
      const timer = setInterval(() => {
        moveIntoSquareBelow();
        checkColumnOfFour();
        checkRowOfFour();
        checkDiagonalOfFourToLeft();
        checkDiagonalOfFourToRigth();
        setBoxes([...boxes]);
      }, 200);
      return () => clearInterval(timer);
    }
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
    if (isAllowed) {
      if (boxes[index].to == "" && winner == "") {
        if (players[0].index == turn) {
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
    <>
      <div className="game gameColumn" style={{ position: "absolute" , zIndex: '1', backgroundColor: 'transparent'}}>
        {columns.map((column, index) => (
          <div
            key={index}
            id={index}
            data-isallowed={isAllowed}
            className="column"
            style={{
              height: '101%',
              width: window.screen.width < 420 ? `${360 / width}px` : `${580 / width}px`,
            }}
            onMouseOver = {(e) => {
              e.target.style.background = '#5000ff91'
              e.target.style.transform = 'translateY(3%)'
            }}
            onMouseLeave = {(e) => {
              e.target.style.background = 'transparent'
            }}
            onClick={(e) => {
              e.preventDefault();
              mode == 'Multiplayer' ? markBoxes(index) : markBoxesOnline(index)
            }}
          >
          </div>
        ))}
      </div>
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
            alt={box.to}
          ></img>
        ))}
      </div>
    </>
  );
};

export default Game;

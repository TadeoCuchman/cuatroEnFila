import { useEffect, useState } from "react";
import Modal from "./Modal";

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

const Game = ({ players }) => {
  const [boxes, setBoxes] = useState([]);
  const [turn, setTurn] = useState(0);
  const [error, setError] = useState("");
  const [winner, setWinner] = useState("");
  const [modal, setModal] = useState(false);

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
        boxes[i].to = "";
      }
    }
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i < (width - 3) * width; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];

      if (columnOfFour.every((box) => boxes[box].to == "player1")) {
        setWinner(players[0].name);
        setModal(true);
      }

      if (columnOfFour.every((box) => boxes[box].to == "player2")) {
        setWinner(players[1].name);
        setModal(true);
      }
    }
  };

  const checkRowOfFour = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];

      if (notValidRigth.includes(i)) continue;

      if (rowOfFour.every((box) => boxes[box].to == "player1")) {
        setWinner(players[0].name);
        setModal(true);
      }

      if (rowOfFour.every((box) => boxes[box].to == "player2")) {
        setWinner(players[1].name);
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
        setWinner(players[0].name);
        setModal(true);
      }

      if (diagonalOfFourLeft.every((box) => boxes[box].to == "player2")) {
        setWinner(players[1].name);
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
        setWinner(players[0].name);
        setModal(true);
      }

      if (diagonalOfFourRigth.every((box) => boxes[box].to == "player2")) {
        setWinner(players[1].name);
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

    if (boxes[index].to == "") {
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

  const colorOfBox = (player) => {
    if (player == "player1") {
      return "red";
    } else if (player == "player2") {
      return "green";
    }
    return "brown";
  };

  return (
    <div className="gameContainer">
      <span style={{ backgroundColor: "red" }}>{players[0].name}</span>
      <span>VS</span>
      <span style={{ backgroundColor: "green" }}>{players[1].name}</span>
      <br />

      <div className="game">
        {boxes.map((box, index) => (
          <img
            key={index}
            className="box"
            style={{
              backgroundColor: colorOfBox(box.to),
            width: window.screen.width < 420 ? `${360 / width}px` : `${580 / width}px`,
            }}
            alt={box.to}
            onClick={() => (winner == "" ? markBoxes(index) : "")}
          ></img>
        ))}
      </div>
      {modal ? (
        <Modal
          setError={setError}
          error={error}
          setModal={setModal}
          winner={winner}
          createBoard={createBoard}
          setTurn={setTurn}
          setWinner={setWinner}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Game;

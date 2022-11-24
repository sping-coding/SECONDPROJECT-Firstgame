import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Timer from "./Timer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StartButton from "./StartButton.png";

import "./OneToFifty.css";

let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function OneToFifty() {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);
  const [trys, setTrys] = useState(0);
  const [gameCount, setGameCount] = useState(1);

  const handleClick = (num) => {
    setTrys(trys + 1);
    if (num === current && gameFlag) {
      if (num === 25) {
        console.log("Success");
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 10 ? num + 16 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    }
  };

  const navigate = useNavigate();
  const startGame = () => {
    if (gameCount > 0) {
      setGameCount(gameCount - 1);
      setNumbers(shuffleArray(array));
      setCurrent(1);
      setGameFlag(true);
    } else {
      navigate("/test");
      sessionStorage.setItem("firstGametimeclick", trys);
    }
  };

  const endGame = () => {
    setGameFlag(false);
  };

  return (
    <div className="contain">
      <div className="ver"></div>
      <div className="hor"></div>
      <Container>
        <Board numbers={numbers} handleClick={handleClick}></Board>
        {gameFlag ? (
          <div>
            <Timer />
            <div className="gameCounts">
              <h2>시행횟수 : </h2>
              <h2>{trys}</h2>
            </div>
          </div>
        ) : (
          <div className="startButtonContainer">
            <img
              src={StartButton}
              onClick={startGame}
              className="StartButton"
            />
          </div>
        )}
      </Container>
    </div>
  );
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Container = styled.div`
  width: 600px;
  height: 800px;
  border: 3px solid lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #52d2c4;
  border-radius: 20px;
`;

export default OneToFifty;

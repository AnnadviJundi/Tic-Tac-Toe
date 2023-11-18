import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState(null);

  const calculateWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWinner(data[a]);
        setLock(true);
        return;
      }
    }

    // Check for a draw
    if (count === 9) {
      setWinner('Draw');
      setLock(true);
    }
  };

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[num] = 'x';
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[num] = 'o';
    }
    setCount((prevCount) => prevCount + 1);
    calculateWinner();
  };

  const resetGame = () => {
    // Reset the game state
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setLock(false);
    setWinner(null);

    // Reset the UI (clear the innerHTML of the boxes)
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach((box) => (box.innerHTML = ''));
  };

  return (
    <div className='container'>
      <h1 className='title'>
        Tic<span>Tac</span>Toe
      </h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' onClick={(e) => toggle(e, 0)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 1)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className='row2'>
          <div className='boxes' onClick={(e) => toggle(e, 3)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 4)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className='row3'>
          <div className='boxes' onClick={(e) => toggle(e, 6)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 7)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      {winner && (
        <div className='result'>
          {winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} wins!`}
        </div>
      )}
      <button className='reset' onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;

import './style/game-style.css'
import React, { useState, useEffect } from 'react';



function Game() {
  const [scores, setScores] = useState({
    isPlayerMove: true,
    aiScore: 0,
    playerScore: 0,
    matchesLeft: 25,
  });

  useEffect(() => {
    console.log(scores.matchesLeft);
    if (scores.matchesLeft > 0 && !scores.isPlayerMove) { 
      let max = (scores.matchesLeft > 3 ? 3 : scores.matchesLeft);
      console.log("max   " + max);
      let number = Math.floor(Math.random() * max) + 1;
      console.log("number  " + number);
      setScores((previous) => ({
        ...previous,
        isPlayerMove: true,
        aiScore: previous.aiScore + number,
        matchesLeft: previous.matchesLeft - number
      }));
    }
  }, [scores]);


  const playerMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setScores((previous) => ({
      ...previous,
      isPlayerMove: false,
      playerScore: previous.playerScore + Number(button.id),
      matchesLeft: previous.matchesLeft - Number(button.id)
    }))
  };

  return (
    <div className="game">
      <div className="ai-score">AI Score: <span>{ scores.aiScore }</span></div>
      <div className="matches-left">
        <div>Matches Left:</div>
        <div className="matches">{scores.matchesLeft}</div>
      </div>
      <div className="buttons">
        {Array.from({ length: 3 }, (_, index) => index + 1).map((value) => (
          <button disabled={scores.matchesLeft < value} className="choose" id={value.toString()} onClick={playerMove}>+ { value }</button>
        )) }
      </div>
      <div className="player-score">Player Score: <span>{ scores.playerScore }</span></div>
    </div>
  );
}

export default Game;
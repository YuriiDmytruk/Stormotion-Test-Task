import './style/game-style.css'
import React, { useState, useEffect, useRef } from 'react';



function Game() {
  const [scores, setScores] = useState({
    isPlayerMove: JSON.parse(sessionStorage.options).isEasy,
    aiScore: 0,
    playerScore: 0,
    matchesLeft: JSON.parse(sessionStorage.options).maxMatches,
  });

  const maxMatchesForMove = JSON.parse(sessionStorage.options).maxMatchesMove;

  const didMount = useRef(false);

  const aiMove = () => {
    if (!scores.isPlayerMove) {
      console.log("AiMove")

      let max = (scores.matchesLeft > 3 ? 3 : scores.matchesLeft);
      let number = Math.floor(Math.random() * max) + 1;

      setScores((previous) => ({
        ...previous,
        aiScore: previous.aiScore + number,
        matchesLeft: previous.matchesLeft - number,
        isPlayerMove: true
      }));
    }
  }
  
  const playerMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setScores((previous) => ({
      ...previous,
      playerScore: previous.playerScore + Number(button.id),
      matchesLeft: previous.matchesLeft - Number(button.id),
      isPlayerMove: false
    }))
  };

  useEffect(() => {
  if (!didMount.current) {
    didMount.current = true;
    return;
  }
    aiMove();
}, [scores]);

  return (
    <div className="game">
      <div className="ai-score">AI Score: <span>{ scores.aiScore }</span></div>
      <div className="matches-left">
        <div>Matches Left:</div>
        <div className="matches">{scores.matchesLeft}</div>
      </div>
      <div className="buttons">
        {Array.from({ length: maxMatchesForMove }, (_, index) => index + 1).map((value) => (
          <button disabled={scores.matchesLeft < value} className="choose" id={value.toString()} onClick={playerMove}>+ { value }</button>
        )) }
      </div>
      <div className="player-score">Player Score: <span>{ scores.playerScore }</span></div>
    </div>
  );
}

export default Game;
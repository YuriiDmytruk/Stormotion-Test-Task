import './style/game-style.css'
import './style/move-style.css'
import './style/win-loose-style.css'

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Game() {
  const [scores, setScores] = useState({
    isPlayerMove: JSON.parse(sessionStorage.options).isEasy,
    aiScore: 0,
    playerScore: 0,
    matchesLeft: JSON.parse(sessionStorage.options).maxMatches,
    aiMove: 0,
    playerMove: 0
  });

  const maxMatchesForMove : number = JSON.parse(sessionStorage.options).maxMatchesMove;

  const didMount : any = useRef(false);

  const aiMove = () => {
    if (!scores.isPlayerMove && scores.matchesLeft > 0) {

      let max : number = scores.matchesLeft > maxMatchesForMove ? maxMatchesForMove : scores.matchesLeft;
      let number : number =  0;
    
      if (scores.matchesLeft > maxMatchesForMove * 2) {
        number = Math.floor(Math.random() * max) + 1;
      }
      else {
        if (scores.aiScore % 2 === 0) {
          number = max % 2 === 0 ? max : max - 1;
        }
        else {
          number = max % 2 !== 0 ? max : max - 1;
        }
      }

      if (scores.matchesLeft === 1) {
        number = 1;
      }

      setScores((previous) => ({
        ...previous,
        aiScore: previous.aiScore + number,
        matchesLeft: previous.matchesLeft - number,
        aiMove: number,
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
      playerMove: Number(button.id),
      isPlayerMove: false
    }))

    
  };

  const restartGame = () => {
    setScores({
      isPlayerMove: JSON.parse(sessionStorage.options).isEasy,
      aiScore: 0,
      playerScore: 0,
      matchesLeft: JSON.parse(sessionStorage.options).maxMatches,
      aiMove: 0,
      playerMove: 0
    });
  }

  useEffect(() => {
    if (!didMount.current) {
      restartGame();
      didMount.current = true;
    return;
  }
    aiMove();
  }, [scores]);

  let navigate = useNavigate();

  return (
    <div className="game">
      <div className="ai-score">
        AI Score:
        <span>{scores.aiScore}</span>
        <div className="show-amount" key={scores.matchesLeft}>
          { scores.aiMove === 0 || scores.matchesLeft === 0 ? "" : "+" + scores.aiMove}
        </div>
      </div>
      <div className="matches-left">
        {scores.matchesLeft > 0 ?
          <>
            <div>Matches Left:</div>
            <div className="matches">{scores.matchesLeft}</div>
          </>
          :
          <>
            <div className={scores.playerScore % 2 === 0 ? "win" : "loose"}>
              {scores.playerScore % 2 === 0 ? "You win" : "You loose"}
            </div>
            <div className="buttons">
              <button onClick={restartGame}>Restart</button>
              <button onClick={() => { navigate("../create") }}>Options</button>
            </div>
          </>}
      </div>
      <div className="buttons">
        {Array.from({ length: maxMatchesForMove }, (_, index) => index + 1).map((value) => (
          <button disabled={scores.matchesLeft < value} key={value} className="choose" id={value.toString()} onClick={playerMove}>+ { value }</button>
        )) }
      </div>
      <div className="player-score">
        Player Score:
        <span>{scores.playerScore}</span>
        <div className="show-amount" key={scores.matchesLeft}>
          { scores.playerMove === 0 || scores.matchesLeft === 0 ? "" : "+" + scores.playerMove}
        </div>
      </div>
    </div>
  );
}

export default Game;
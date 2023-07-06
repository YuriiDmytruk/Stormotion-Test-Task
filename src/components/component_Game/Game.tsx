import './style/game-style.css'
import './style/move-style.css'
import './style/win-loose-style.css'

import AiScore from './components/AiScore'
import MatchesLeft from './components/MatchesLeft'
import Buttons from './components/Buttons'
import PlayerScore from './components/PlayerScore'

import React, { useState, useEffect, useRef } from 'react';


function Game() {
  const [scores, setScores] = useState({
      isPlayerMove: true,
      aiScore: 0,
      playerScore: 0,
      aiMove: 0,
      playerMove: 0
    }); 

  const maxMatchesForMove: number = JSON.parse(sessionStorage.options).maxMatchesMove;
  const maxMatches: number = JSON.parse(sessionStorage.options).maxMatches;

  const didMount : any = useRef(false);

  const aiMove = () => {
    if (!scores.isPlayerMove && matchesLeft() > 0) {

      let max : number = matchesLeft() > maxMatchesForMove ? maxMatchesForMove : matchesLeft();
      let number : number =  0;
    
      if (matchesLeft() > maxMatchesForMove * 2) {
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

      if (matchesLeft() === 1) {
        number = 1;
      }

      setScores((previous) => ({
        ...previous,
        aiScore: previous.aiScore + number,
        aiMove: number,
        playerMove: 0,
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
      playerMove: Number(button.id),
      isPlayerMove: false,
      aiMove: 0
    }))
  };

  const restartGame = () => {
    setScores({
      isPlayerMove: JSON.parse(sessionStorage.options).isEasy,
      aiScore: 0,
      playerScore: 0,
      aiMove: 0,
      playerMove: 0
    });
  }

  const matchesLeft = () : number => {
    return maxMatches - (scores.playerScore + scores.aiScore);
  }

  

  useEffect(() => {
    if (!didMount.current) {
      restartGame();
      didMount.current = true;
    return;
    }
    setTimeout(aiMove, 2000)
  }, [scores]);

  return (
    <div className="game">

      <AiScore
        aiScore={scores.aiScore}
        matchesLeft={matchesLeft()}
        aiMove={scores.aiMove} />
      
      <MatchesLeft
        matchesLeft={matchesLeft()}
        playerScore={scores.playerScore}
        restartGame={restartGame} />
      
      <Buttons
        matchesLeft={matchesLeft()}
        playerMove={playerMove}
        isPlayerMove={ scores.isPlayerMove }
        maxMatchesForMove={maxMatchesForMove} />
      
      <PlayerScore
        playerScore={scores.playerScore}
        matchesLeft={matchesLeft()}
        playerMove={scores.playerMove} />
      
    </div>
  );
}

export default Game;
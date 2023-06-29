import React from 'react';
import { useNavigate } from "react-router-dom";

import './style/home-style.css';



function Home() {
  let navigate = useNavigate(); 

  return (
    <div className="home">
      <button onClick={() => { sessionStorage.setItem('isEasy', 'True'); navigate('./game'); }} className="easy-game">Easy</button>
      <button onClick={() => { sessionStorage.setItem('isEasy', 'False'); navigate('./game'); }} className="hard-game">Hard</button>
      <button onClick={() => {navigate('./');}}className="options-game">My options</button>
    </div>
  );
}

export default Home;
import { useNavigate } from "react-router-dom";

import './style/home-style.css';



function Home() {
  let navigate : any = useNavigate(); 
  let options : any = {
    isEasy: true,
    maxMatches: 25,
    maxMatchesMove: 3,
  }

  return (
    <div className="home">
      <button onClick={() => { sessionStorage.setItem('options', JSON.stringify(options)); navigate('./game'); }} className="easy-game">Easy</button>
      <button onClick={() => { options.isEasy = false; sessionStorage.setItem('options', JSON.stringify(options)); navigate('./game'); }} className="hard-game">Hard</button>
      <button onClick={() => {navigate('./create');}}className="options-game">My options</button>
    </div>
  );
}

export default Home;
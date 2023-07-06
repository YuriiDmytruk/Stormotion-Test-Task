import { useNavigate } from "react-router-dom";

function MatchesLeft(props: any) {

  let navigate = useNavigate();
  return (
    <div className="matches-left">
        {props.matchesLeft > 0 ?
          <>
            <div>Matches Left:</div>
            <div className="matches">{props.matchesLeft}</div>
          </>
          :
          <>
            <div className={props.playerScore % 2 === 0 ? "win" : "loose"}>
              {props.playerScore % 2 === 0 ? "You win" : "You loose"}
            </div>
            <div className="buttons">
              <button onClick={props.restartGame}>Restart</button>
              <button onClick={() => { navigate("../create") }}>Options</button>
            </div>
          </>}
      </div>
  );
}

export default MatchesLeft;
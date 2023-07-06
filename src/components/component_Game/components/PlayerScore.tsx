function PlayerScore(props: any) {
  return (
    <div className="player-score">
        Player Score:
        <span>{props.playerScore}</span>
        <div className="show-amount" key={props.matchesLeft}>
          { props.playerMove === 0 || props.matchesLeft === 0 ? "" : "+" + props.playerMove}
        </div>
      </div>
  );
}

export default PlayerScore;
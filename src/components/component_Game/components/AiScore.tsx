function AiScore(props: any) {
  return (
    <div className="ai-score">
        AI Score:
        <span>{props.aiScore}</span>
        <div className="show-amount" key={props.matchesLeft}>
          { props.aiMove === 0 || props.matchesLeft === 0 ? "" : "+" + props.aiMove}
        </div>
      </div>
  );
}

export default AiScore;
function Buttons(props: any) {
  return (
    <div className="buttons">
        {Array.from({ length: props.maxMatchesForMove }, (_, index) => index + 1).map((value) => (
          <button
            disabled={props.matchesLeft < value || !props.isPlayerMove}
            key={value}
            className="choose"
            id={value.toString()}
            onClick={props.playerMove}>+ {value}</button>
        )) }
      </div>
  );
}

export default Buttons;
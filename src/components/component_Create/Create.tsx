import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import './style/create-style.css'

function Create() {
  const [state, setState] = useState({
    isEasy: true,
    maxMatches: 0,
    maxMatchesMove: 0,
  });
    
  const [errors, setErrors] = useState({
    maxMatches: '',
    maxMatchesMove: ''
    });

  const validate = (event: any, key: string) => {
    
    event.preventDefault();

    let number = Number(event.target.value);
    let error = '';
    console.log(number)
    if (isNaN(number)) {
      error = 'It must be a number';
    }

    if (!Number.isInteger(number)) {
      error = 'It must be an integer';
    }

    if (number <= 0) {
      error = 'Number must be greater than 0';
    }

    if (key === 'move' && number > 9) {
      error = '9 is max value';
    }

    if (key === 'max') {
      if (error === '') {
        setState((previous) => ({ ...previous, maxMatches: number * 2 + 1 }))
        setErrors((previous) => ({ ...previous, maxMatches: '' }))
        return;
      }
      setErrors((previous) => ({ ...previous, maxMatches: error }))
      setState((previous) => ({ ...previous, maxMatches: 0 }))
      return;
    }

    if (error === '') {
      setState((previous) => ({ ...previous, maxMatchesMove: number }))
      setErrors((previous) => ({ ...previous, maxMatchesMove: '' }))
        return;
      }
    setErrors((previous) => ({ ...previous, maxMatchesMove: error }))
    setState((previous) => ({ ...previous, maxMatchesMove: 0 }))
  }
  
  let navigate : any = useNavigate();
  
  return (
    <div className="create">

      <div className="switch">
        <button
          onClick={() => {setState((previous) => ({...previous, isEasy: !previous.isEasy}))}}
          className={state.isEasy ? "switch-easy" : "switch-hard"}>
          {state.isEasy ? "Easy Mode" : "Hard Mode"}
        </button>
      </div>

      <div className="max-matches">
        <input
          type="text"
          placeholder='Input n (2n + 1 = matches on the board)'
          onChange={e => validate(e, "max")} />
        <div>
          {errors.maxMatches === '' ? 'Number of matches on board = ' + state.maxMatches : errors.maxMatches}
        </div>
      </div>

      <div className="max-matches">
        <input
          type="text"
          placeholder='number of matches allowed to take on each turn'
          onChange={e => validate(e, "move")} />
        <div>
          {errors.maxMatchesMove === '' ? 'Max number of matches per move = ' + state.maxMatchesMove : errors.maxMatchesMove}
        </div>
      </div>

      <div className="switch">
        <button
          className='start'
          disabled={((state.maxMatches === 0) || (state.maxMatchesMove === 0))}
          onClick={() => { sessionStorage.setItem("options", JSON.stringify(state)); navigate('../game'); }}
        >Start</button>
      </div>

    </div>
  );
}

export default Create;
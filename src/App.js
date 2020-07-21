import React, { useState } from 'react';

import ChoiceButtons from "./components/ChoiceButtons";
import ChoiceCard from './components/ChoiceCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CHOICES, getRoundOutcome } from "./utils";
import './App.css';


function App() {
  
  const [prompt, setGamePrompt] = useState("1, 2, 3, SHOOT!");
  
  const[start,setStart]=useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  
  const onPlayerChoose = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
console.log("result ", result);
    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];

    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }
    gameHistory.push(result);
    setGameHistory(gameHistory);
    setGamePrompt(result);

  };

  if (!start) {
    return(<button
      className="btn btn-success btn-lg"
      onClick={() => {setStart(true)}}
    >
      Start
    </button>);
  }

 return (
    <div className="App">
      <div className="col-md-4 themed-grid-col">
        <h3>History</h3>
        <ul>
          {gameHistory.map(result => {
            return <li>{result}</li>;
          })}
        </ul>
      </div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 themed-grid-col">
            <ChoiceCard
              title="Computer"
              previousWinner={previousWinner}
              imgURL={computerChoice && computerChoice.url}
            />
            <h1>{prompt}</h1>
            <ChoiceButtons onPlayerChoose={onPlayerChoose} />
            <ChoiceCard
              title="You"
              previousWinner={previousWinner}
              imgURL={playerChoice && playerChoice.url}
            />
          </div>
        </div>
      </div>
    </div >

  );
}
export default App;

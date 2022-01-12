import logo from './logo.svg';
import './App.css';
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }   
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {         // Reduce the # here for testing purpose
        newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
    />
  ))

  function checkWinningState(dice){
    const num = dice[0].value
    for (let i = 0; i< dice.length; i++){
        if (dice[i].value === num && dice[i].isHeld){
            continue
        } else{
            return false
        }
    }
    return true
    }
    
  React.useEffect(() => {
    console.log("Dice state changed")
    setTenzies(checkWinningState(dice))
  }, [dice])



  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">{tenzies ? "You Win!" : "Tenzies"}</h1>
      <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container"> 
        {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      
    </main>
  );
}

export default App;

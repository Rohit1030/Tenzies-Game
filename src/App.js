import React from "react";
import './App.css';
import Die from "../src/Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';

function App() {
  const [myDice, setMyDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const dieElements = myDice.map(item => <Die 
    value={item.value} 
    key={item.id} 
    held={item.isHeld}
    holdDice={holdDice}
    id={item.id} 
  />)

  function allNewDice(){
    let array = [];
    for(let i=0; i<10; i++){
      const dieObj = {
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      }
      array.push(dieObj);
    }
    return array;
  }

  function handleClick(){
    if(tenzies===true) {
      setMyDice(allNewDice());
      setTenzies(false);
    }
    else {
      setMyDice(prevMyDice => prevMyDice.map(die => {
        return die.isHeld ? {...die} : {value: Math.ceil(Math.random()*6),
          isHeld: false,
          id: nanoid()}
      }));
    }
  }

  function holdDice(id){
    setMyDice(prevMyDice => prevMyDice.map(die => {
      return id===die.id ? {...die, isHeld: !die.isHeld} : {...die}
    }))
  }

  React.useEffect(()=>{
    let bool = true;
    for(let i=0; i<myDice.length-1; i++){
      if(myDice[i].isHeld===false){
        bool = false;
        break;
      }
      else {
        if(myDice[i+1].isHeld===true){
          if(myDice[i].value!==myDice[i+1].value){
            bool = false;
            break;
          }
          else {
            bool = true;
          }
        }
        else {
          bool = false;
          break;
        }
      }
    }
    if(bool){
      setTenzies(bool);
    }
  }, [myDice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <div className="die-section">
          {dieElements}
        </div>
        <button id="roll" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  );
}

export default App;
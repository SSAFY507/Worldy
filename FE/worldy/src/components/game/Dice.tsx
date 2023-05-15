import React from 'react'


export default function Dice() {
  return (

    <main className="container w-[300px] h-[220px] ml-[40px]">
      <div className="dice-container">
        <div className="dice dice-one active" id="dice-1">
          <span className="dot"></span>
        </div>
        <div className="dice dice-two" id="dice-2">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice dice-three" id="dice-3">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice dice-four" id="dice-4">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice dice-five" id="dice-5">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice dice-six" id="dice-6">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="dice-container">
        <div className="dice2 dice-one active" id="dice-1">
          <span className="dot"></span>
        </div>
        <div className="dice2 dice-two" id="dice-2">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice2 dice-three" id="dice-3">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="dice2 dice-four" id="dice-4">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice2 dice-five" id="dice-5">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="dice2 dice-six" id="dice-6">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </main>
  )
}

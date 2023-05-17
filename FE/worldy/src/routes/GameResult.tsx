import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";

export default function GameResult() {
  const location = useLocation();
  const gameResult = location.state;
  console.log(location);
  console.log(location.state);
  return (
    <>
      <div className='w-full h-full bg-[#FFFDF4] flex flex-col justify-center items-center'>
        <div id='shbutton' className='w-[500px] h-[50px] text-[24px] flex justify-center items-center'
        >게임 종료</div>
        <div>gameResult</div>
      </div>
    </>
  );
}

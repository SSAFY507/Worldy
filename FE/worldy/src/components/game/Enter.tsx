import * as React from 'react';
import { useState, useEffect } from 'react';

export default function Enter() {

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover bg">     
        <div className='text-[40px] text-white font-PtdSemiBOld flex flex-col justify-center items-center'>
          <div>플레이어가 입장 중 입니다.</div>
          <div className='mt-[15px]'>잠시만 기다려주세요.</div>
          <img
              className='mt-[30px] w-[100px] object-cover'
              src={'/game/loading.gif'}
              alt='WORLDY GAME'
          />
        </div>
      </div>
    </>
  );
}

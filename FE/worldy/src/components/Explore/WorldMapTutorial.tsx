import * as React from 'react';
import { useState, useEffect } from 'react';

export default function WorldMapTutorial() {
  return (
    <div className='w-full h-full grid place-content-center bg-[rgba(100,100,100,0.3)]'>
      <div className='w-[800px] h-[500px] flex flex-col justify-between items-center outline outline-[8px] outline-[rgba(255,255,255,0.3)] rounded-2xl bg-[rgba(100,100,100,0.3)] py-[10px] px-[20px]'>
        <div className='w-full h-[50px] flex flex-row justify-center items-center'>
          <span className='font-PtdBold text-[40px] text-white'>튜토리얼</span>
        </div>
      </div>
    </div>
  );
}

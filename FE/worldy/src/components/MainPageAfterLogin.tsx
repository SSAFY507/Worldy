import * as React from 'react';
import { useState, useEffect } from 'react';

export default function MainPageAfterLogin() {
  return (
    <div className='h-full '>
      <div className='h-3/4 outline outline-black flex flex-row items-center justify-center py-5'>
        <div className='outline outline-red-400 w-full h-full'></div>
      </div>
      <div className='h-1/4 outline outline-black'></div>
    </div>
  );
}

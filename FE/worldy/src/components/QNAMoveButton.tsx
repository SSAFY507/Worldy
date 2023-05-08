import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/QNAMoveButtonStyles.css';

export default function QNAMoveButton() {
  return (
    <div className='main relative  outline-yellow-300'>
      <div className='QNAbuttoncard'></div>
      <div className='QNAbuttoncard'></div>
      <div className='QNAbuttoncard'></div>
      <p className='absolute top-0 left-0 w-full h-full QNAbuttontext  bg-[rgba(245,245,245,0.3)] rounded-md grid place-content-center'>
        <span className='text-[30px] font-PtdBold text-gray-300'>
          궁금한 게 있으신가요?
        </span>
      </p>
    </div>
  );
}

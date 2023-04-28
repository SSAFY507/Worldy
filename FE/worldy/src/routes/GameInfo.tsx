import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import '../styles/GameInfoStyle.css';

export default function GameInfo() {
  const [leftW, setLeftW] = useState<string>('90%');
  const [rightW, setRightW] = useState<string>('10%');

  const [leftBigger, setLeftBigger] = useState<boolean>(true);

  const reverseSize = () => {
    if (leftBigger) {
      setLeftW('10%');
      setRightW('90%');
    } else {
      setRightW('10%');
      setLeftW('90%');
    }
    setLeftBigger((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(leftBigger);
  }, []);

  const [hoverButton, setHoverButton] = useState<boolean>(false);

  return (
    <div className='h-full w-full bg-white flex justify-center items-center '>
      <div className='w-[90%] h-[90%] outline outline-gray-300 flex overflow-hidden rounded-tl-[30px] rounded-br-[30px] max-h-[800px]'>
        <div
          className={`flex h-[100%] w-[100%] LRPage ${
            !leftBigger ? 'bg-gray-500' : 'bg-gray-200'
          } flex flex-row justify-start p-[30px] overflow-hidden`}
          style={{
            width: leftW,
            overflowY: leftBigger ? 'scroll' : 'hidden',
            transition: 'width 1.5s ease-in-out, background 1.5s ease-out',
          }}
        >
          <div className='outline outline-red-400 min-w-[1400px] max-w-[1400px] min-h-full h-fit mb-[50px]'>
            <div className='outline outline-black h-[500px] w-[300px]'>
              gdgdgd
            </div>
            <div className='outline outline-black h-[500px] w-[30px]'>
              gdgdgd
            </div>
            <div className='outline outline-black h-[500px] w-[30px]'>
              gdgdgd
            </div>
          </div>
        </div>
        <div className='w-[0px] h-[100%] overflow-visible z-[1] flex jusy-center items-center bg-opacity-20 relative outline outline-white'>
          <button
            className='bg-white w-[50px] h-[50px] rounded-[30px] grid justify-center items-center z-[3] absolute'
            onClick={reverseSize}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            style={{
              transform: leftBigger ? '' : 'rotate(180deg)',
              opacity: hoverButton ? 1 : 0.5,
              transition:
                'transform 1.5s ease-in-out, opacity 0.5s ease, right 1.5s ease',
              right: leftBigger ? '-60px' : '10px',
            }}
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='3em'
              width='3em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M4 6H6V18H4zM14.293 5.293L7.586 12 14.293 18.707 15.707 17.293 11.414 13 20 13 20 11 11.414 11 15.707 6.707z'></path>
            </svg>
          </button>
        </div>
        <div
          className={`h-[100%] LRPage ${
            leftBigger ? 'bg-gray-500' : 'bg-gray-200'
          } flex flex-row justify-end p-[30px]`}
          style={{
            width: rightW,
            overflowY: !leftBigger ? 'scroll' : 'hidden',
            transition: 'width 1.5s ease-in-out , background 1.5s ease-out',
          }}
        >
          오른쪽 페이지
        </div>
      </div>
    </div>
  );
}

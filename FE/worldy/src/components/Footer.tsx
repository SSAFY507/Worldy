import * as React from 'react';
import { useState, useEffect } from 'react';
import PersonalAccept from './PersonalAccept';

export default function Footer() {
  const [showPersonalAccept, setShowPersonalAccept] = useState<boolean>(false);
  const handleShowPersonalAccept = () => {
    setShowPersonalAccept(!showPersonalAccept);
  };

  return (
    <>
      {showPersonalAccept && (
        <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10'>
          <div className='absolute -top-10 left-1/2'>
            <PersonalAccept closePA={() => setShowPersonalAccept(false)} />
          </div>
        </div>
      )}
      <div className='absolute bottom-0 left-0 w-full h-[100px] bg-[rgba(255,255,255,0)]'>
        <button
          onClick={handleShowPersonalAccept}
          className='underline underline-offset-2 decoration-2 text-[20px] mt-[2px] text-gray-400'
        >
          개인 정보 처리방침
        </button>
      </div>
    </>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import LoaderPyramid from '../components/LoaderPyramid';
import SocketTest from '../components/game/SocketTest';

export default function Socket() {
  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <SocketTest />
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderPyramid text='3D 급하게 조립 중...' />
        </div>
      )}
    </div>
  );
}

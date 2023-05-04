import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3D from '../components/TestFor3D';
import TestFor3DEdit from '../components/TestFor3DEdit';
import TestSunghoon from '../components/TestSunghoon';
import WordyGame from '../components/worldygame/WordyGame';
import LoaderPyramid from '../components/LoaderPyramid';
import SocketTest from '../components/worldygame/SocketTest';

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
        <LoaderPyramid text='3D 급하게 조립 중...' />
      )}
    </div>
  );
}
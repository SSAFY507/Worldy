import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3D from '../components/TestFor3D';
import TestFor3DEdit from '../components/TestFor3DEdit';
import TestSunghoon from '../components/TestSunghoon';
import WorldyGame from '../components/worldygame/WorldyGame';
import LoaderPyramid from '../components/LoaderPyramid';

export default function Game() {
  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <WorldyGame />
      ) : (
        <LoaderPyramid text='3D 급하게 조립 중...' />
      )}
    </div>
  );
}

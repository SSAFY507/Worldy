import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3D from '../components/TestFor3D';
import TestFor3DEdit from '../components/TestFor3DEdit';
import LoaderPyramid from '../components/LoaderPyramid';

export default function Monopoly() {
  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <TestFor3DEdit />
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderPyramid text='3D 급하게 조립 중...' />
        </div>
      )}
    </div>
  );
}
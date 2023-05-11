import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3DEdit from '../components/TestFor3DEdit';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import Test from '../components/game/Test';
import { useParams } from 'react-router';

export default function Game() {
  const params = useParams();
  const gameId = params.id;

  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <Test />
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderPyramid text='3D 급하게 조립 중...' />
        </div>
      )}
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3D from '../components/TestFor3D';
import TestFor3DEdit from '../components/TestFor3DEdit';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import WorldyGame from '../components/game/WorldyGame';
import LoaderLinear from '../components/Loaders/LoaderLinear';

export default function Monopoly() {
  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <WorldyGame />
      ) : (
        <div className='w-full h-full bg-white pt-20'>
          <LoaderLinear />
        </div>
      )}
    </div>
  );
}

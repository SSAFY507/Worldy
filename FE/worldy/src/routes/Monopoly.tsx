import * as React from 'react';

import { useEffect, useState } from 'react';

import LoaderLinear from '../components/Loaders/LoaderLinear';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import WorldyGame from '../components/game/WorldyGame';

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

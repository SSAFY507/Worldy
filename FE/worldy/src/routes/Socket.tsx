import * as React from 'react';
import { useState, useEffect } from 'react';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import SocketTest from '../components/game/SocketTest';
import LoaderLinear from '../components/Loaders/LoaderLinear';

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
        <div className='w-full h-full bg-white pt-20'>
          <LoaderLinear />
        </div>
      )}
    </div>
  );
}

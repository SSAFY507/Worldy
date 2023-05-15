import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3DEdit from '../components/TestFor3DEdit';
import Main from '../components/game/Main';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import { useParams } from 'react-router';
import LoaderLinear from '../components/Loaders/LoaderLinear';

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
        <Main />
      ) : (
        <div className='w-full h-full bg-white pt-20'>
          <LoaderLinear />
        </div>
      )}
    </div>
  );
}

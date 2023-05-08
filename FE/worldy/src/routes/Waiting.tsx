import { useState, useEffect } from 'react';
import LoaderPyramid from '../components/LoaderPyramid';

import { useParams } from 'react-router';

import WaitingRoom from '../components/game/WaitingRoom';

export default function Waiting() {
  const params = useParams();
  const gameId = params.id;

  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? (
        <WaitingRoom />
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderPyramid text='대기방으로 이동중...' />
        </div>
      )}
    </div>
  );
}

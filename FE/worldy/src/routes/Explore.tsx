import * as THREE from 'three';
import * as React from 'react';
import { useState, useEffect } from 'react';

import WorldMap from '../components/Explore/WorldMap';
import SHLoader from '../components/Loaders/SHLoader';
import LoaderCompass from '../components/Loaders/LoaderCompass';

const Explore = () => {
  const [doneLoader, setDoneLoader] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setDoneLoader(true);
    }, 4000);
  }, []);

  return (
    <div className='relative'>
      {doneLoader && (
        <div className='w-screen h-screen bg-gray-800 grid place-content-center pb-[80px]'>
          <LoaderCompass />
        </div>
      )}
      <WorldMap />
    </div>
  );
};

export default Explore;

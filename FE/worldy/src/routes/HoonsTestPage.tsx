import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3D from '../components/TestFor3D';
import TestFor3DEdit from '../components/TestFor3DEdit';
import LoaderPyramid from '../components/LoaderPyramid';

function HoonsTestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen'>
      {loaded ? <TestFor3DEdit /> : <LoaderPyramid />}
    </div>
  );
}

export default HoonsTestPage;

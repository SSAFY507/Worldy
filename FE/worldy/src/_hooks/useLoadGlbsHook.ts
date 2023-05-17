import * as React from 'react';
import * as THREE from "three";

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useLayoutEffect, useState } from 'react';

type GlbListType = {
  [key: string]: string;
};

type GlbListType2 = {
  [key: string]: THREE.Object3D;
};

const useLoadGlbsHook = (inputGlbList: GlbListType) => {
  const [loadedGlbs, setLoadedGlbs] = useState<GlbListType2>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    const loadAllGlbs = async () => {

      const promises = Object.entries(inputGlbList).map(
        async ([key, path]) => {
          //console.log(key, path)
          const loader = new GLTFLoader();
          const glb: GLTF = await new Promise((resolve, reject) => {
            loader.load(path, resolve, undefined, reject);
          });
          return [key, glb.scene] as [string, THREE.Object3D];
        }
      );
      const loadedGlbs = await Promise.all(promises);
      const glbObject = Object.fromEntries(loadedGlbs);
      
      //console.log(glbObject)
      setLoadedGlbs(glbObject);
      setIsLoaded(true);
    };
    loadAllGlbs();
  }, [inputGlbList]);

  return { loadedGlbs, isLoaded };
}

export default useLoadGlbsHook;
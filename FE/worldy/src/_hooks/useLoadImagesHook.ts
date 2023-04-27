import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';

type ImageListType = {
  [key: string]: string;
};

export default function useLoadImagesHook(inputImageList: ImageListType) {
  const [loadedImages, setLoadedImages] = useState<ImageListType>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    const loadAllImages = async () => {
      const promises = Object.entries(inputImageList).map(
        async ([key, path]) => {
          const image = new Image();
          image.src = path;
          await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
          });

          return [key, image.src] as [string, string];
        }
      );
      const loadedImages = await Promise.all(promises);
      const imageObject = Object.fromEntries(loadedImages);

      setLoadedImages(imageObject);
      setIsLoaded(true);
    };
    loadAllImages();
  }, [inputImageList]);

  return { loadedImages, isLoaded };
}

import * as React from 'react';
import { useState, useEffect } from 'react';

export default function ImageLoaderPromise(
  imageSrcList: string[]
): Promise<HTMLImageElement>[] {
  return imageSrcList.map((imageSrc) => {
    return new Promise((resolve, reject) => {
      const tempImage = new Image();
      tempImage.src = `../assets/images/${imageSrc}`;
      tempImage.onload = () => resolve(tempImage);
      tempImage.onerror = (error) => reject(error);
      console.log('ILP 함수 return 성공?', tempImage);
    });
  });
}

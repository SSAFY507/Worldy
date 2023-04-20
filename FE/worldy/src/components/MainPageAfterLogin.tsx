import * as React from 'react';
import { useState, useEffect } from 'react';
import Logowhite from '../assets/images/Logo-white.png';

import CarouselComponent from './CarouselComponent';
import ControllerBlack from '../assets/images/controllerBlack.png';
import Carousel1 from '../assets/images/Carousel1.png';

type ImageListType = {
  headerImage: string;
  headerText: string;
  TitleText: string;
  contentText: string;
  buttonText: string;
  image: string;
};

export default function MainPageAfterLogin() {
  const [imageList, setImageList] = useState<ImageListType[]>([]);

  const addImages = (input: ImageListType) => {
    setImageList((prevImageList) => [...prevImageList, input]);
  };
  useEffect(() => {
    if (imageList.length < 5)
      addImages({
        headerImage: ControllerBlack,
        headerText: '월디폴리',
        TitleText: '게임으로 경험하는 새로운 세계',
        contentText:
          '세상은 넓고 알아야 할 것들은 많습니다. 친구들과 함께 세계를 모험 하면서 당신만의 도시를 건설해보세요. 모노폴리 형식으로 진행되는 게임은 4명의 친구들과 함께 플레이 할 수 있습니다.',
        buttonText: '게임 시작',
        image: Carousel1,
      });
  }, []);

  return (
    <div className='h-full '>
      <div className='h-fit outline outline-black flex flex-row items-center justify-center'>
        <CarouselComponent images={imageList} />
      </div>
      <div className='h-1/4 outline outline-black'></div>
    </div>
  );
}

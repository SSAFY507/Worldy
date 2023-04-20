import * as React from 'react';
import { useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BUTTON_RED from './Button_Red';

type ImageListType = {
  headerImage: string;
  headerText: string;
  TitleText: string;
  contentText: string;
  buttonText: string;
  image: string;
};

export default function CarouselComponent({
  images,
}: {
  images: ImageListType[];
}) {
  const [carouselHeight, setCarouselHeight] = useState<number>(0);
  useEffect(() => {
    setCarouselHeight(680);
  }, []);

  return (
    <div className='w-full bg-red-300' style={{ height: carouselHeight }}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        interval={3000}
        autoPlay={false}
        swipeable={true}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={` outline-blue-500 flex flex-row justify-start items-center pl-20`}
            style={{
              height: carouselHeight,
              backgroundImage: `url(${item.image})`,
              backgroundSize: '100%',
            }}
          >
            <div className=' outline-black w-1/2 h-fit flex flex-col justify-stretch items-center'>
              <div className='mb-4  outline-red-400 w-full h-1/6 flex flex-row justify-start items-center'>
                <div className='w-14 h-14 mr-4'>
                  <img src={item.headerImage} alt='headerImage' />
                </div>
                <div className='h-full flex flex-1 items-center justify-start'>
                  <span className='font-PtdSemiBOld text-4xl'>
                    {item.headerText}
                  </span>
                </div>
              </div>
              <div className='mb-6  outline-red-400 w-full h-1/6 flex flex-row justify-start items-center'>
                <h1 className='text-6xl font-PtdExtraBold'>{item.TitleText}</h1>
              </div>
              <div className='mb-6  outline-red-400 w-full h-fit flex flex-row justify-start items-center'>
                <div className=' outline-blue-400 w-4/6 text-start font-PtdLight text-xl'>
                  {item.contentText}
                </div>
              </div>
              <div className='mb-4  outline-red-800 w-full h-fit flex flex-row justify-start items-center'>
                <BUTTON_RED
                  text={item.buttonText}
                  fontSize={20}
                  onClick={null}
                  width={200}
                  height={50}
                  rounded={false}
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

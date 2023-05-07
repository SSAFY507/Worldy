import * as React from 'react';
import { useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './react-responsive-carousel-customstyle.css';
import BUTTON_RED from './Button_Red';
import LoaderLinear from './LoaderLinear';

type ImageListType = {
  headerImage: string;
  headerText: string;
  TitleText: string;
  contentText: string;
  buttonText: string;
  image: string;
  textBlack: boolean;
  thumb: string;
  buttonClick?: () => void;
  // loaded: boolean;
};

export default function CarouselComponent({
  images,
  loaded,
}: {
  images: ImageListType[];
  loaded: boolean;
}) {
  const [carouselHeight, setCarouselHeight] = useState<number>(680);
  // useEffect(() => {
  //   setCarouselHeight(680);
  // }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  // const [loadedAll, setLoadedAll] = useState<boolean>(false);
  // useEffect((()=>{
  //   if(loaded)
  // }))

  const [currentSlideIndex, setCurrentSlideindex] = useState<number>(0);
  const handleThumbnailClick = (index: number) => {
    setCurrentSlideindex(index);
  };

  const nextArrowClick = () => {
    setCurrentSlideindex(currentSlideIndex === 4 ? 0 : currentSlideIndex + 1);
  };
  const prevArrowClick = () => {
    setCurrentSlideindex(currentSlideIndex === 0 ? 4 : currentSlideIndex - 1);
  };

  return (
    <div className={`w-screen outline h-full ${loaded ? '' : 'hide-things'}`}>
      <div className='absolute  top-20 left-0 w-screen h-[680px] justify-center flex items-center'>
        <div className=' h-10 w-full z-10 flex flex-row justify-between items-center'>
          <button
            className='h-10 w-[90px] pl-[10px] flex flex-row justify-start items-center'
            onClick={prevArrowClick}
          >
            <svg
              stroke='currentColor'
              fill='white'
              stroke-width='0'
              viewBox='0 0 1024 1024'
              height='3em'
              width='3em'
              xmlns='http://www.w3.org/2000/svg'
              opacity={0.5}
            >
              <path d='M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z'></path>
            </svg>
          </button>
          <button
            className=' h-10 w-[90px] pr-[10px] flex flex-row justify-end items-center'
            onClick={nextArrowClick}
          >
            <svg
              stroke='currentColor'
              fill='white'
              stroke-width='0'
              viewBox='0 0 1024 1024'
              height='3em'
              width='3em'
              xmlns='http://www.w3.org/2000/svg'
              opacity={0.5}
            >
              <path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z'></path>
            </svg>
          </button>
        </div>
      </div>
      <Carousel
        selectedItem={currentSlideIndex}
        showArrows={true}
        infiniteLoop={true}
        interval={5000}
        autoPlay={true}
        swipeable={true}
        transitionTime={1500}
        stopOnHover={true}
        showThumbs={false}
        // showIndicators={true}
        showStatus={false}
        onChange={(index) => setCurrentSlideindex(index)}
      >
        {images.map((item, index) =>
          loaded ? (
            <div
              key={index}
              className={` outline-blue-500 flex flex-row justify-start items-center pl-20`}
              style={{
                height: carouselHeight,
                backgroundImage: `url(${item.image})`,
                backgroundSize: '100%',
              }}
            >
              <div className='ml-[15px] outline-black w-1/2 h-fit flex flex-col justify-stretch items-center'>
                <div className='mb-4  outline-red-400 w-full h-1/6 flex flex-row justify-start items-center'>
                  <div className='w-14 h-14 mr-4'>
                    <img src={item.headerImage} alt='headerImage' />
                  </div>
                  <div className='h-full flex flex-1 items-center justify-start'>
                    <span
                      className='font-PtdSemiBOld text-4xl'
                      style={
                        item.textBlack ? { color: 'black' } : { color: 'white' }
                      }
                    >
                      {item.headerText}
                    </span>
                  </div>
                </div>
                <div className='mb-6  outline-red-400 w-full h-1/6 flex flex-row justify-start items-center'>
                  <h1
                    className='text-6xl font-PtdExtraBold'
                    style={
                      item.textBlack ? { color: 'black' } : { color: 'white' }
                    }
                  >
                    {item.TitleText}
                  </h1>
                </div>
                <div className='mb-6  outline-red-400 w-full h-fit flex flex-row justify-start items-center'>
                  <div
                    className=' outline-blue-400 w-4/6 text-start font-PtdLight text-xl'
                    style={
                      item.textBlack ? { color: 'black' } : { color: 'white' }
                    }
                  >
                    {item.contentText}
                  </div>
                </div>
                <div className='mb-4 outline-red-800 w-full h-fit flex flex-row justify-start items-center'>
                  {item.buttonText !== '' && (
                    <BUTTON_RED
                      text={item.buttonText}
                      fontSize={20}
                      onClick={item.buttonClick}
                      width={200}
                      height={50}
                      rounded={false}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='h-[680px] flex flex-row justify-center items-center'>
              <LoaderLinear text='loading...' />
            </div>
          )
        )}
      </Carousel>
      {loaded ? (
        <div className='mt-2 px-[300px] w-fuil h-[150px] flex justify-between items-start pt-2'>
          {images.map((item, index) => (
            <div
              className={`flex flex-row justify-center items-start p-[5px] h-[137px]
            ${currentSlideIndex === index ? ' bg-red-300 rounded-[14px]' : ''}
            `}
            >
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className='w-[210px] h-[120px] '
              >
                <img src={item.thumb} alt='Thumbnail' sizes='100%' />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './react-responsive-carousel-customstyle.css';
import BUTTON_RED from './Button_Red';
import LoaderLinear from './Loaders/LoaderLinear';
import DoateModal from './DonateModal';
import LoaderPyramid from './Loaders/LoaderPyramid';
import LoaderBlueCircle from './Loaders/LoaderBlueCircle';

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
  const [carouselHeight, setCarouselHeight] = useState<number>(700);
  // useEffect(() => {
  //   setCarouselHeight(680);
  // }, []);

  useEffect(() => {
    // console.log(images);
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

  const [donateState, setDonateState] = useState<boolean>(false);

  const handleDonateState = () => {
    setDonateState(!donateState);
    // console.log('donateState', donateState);
  };

  const handleDonateStateRemain = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={` relative w-screen h-full ${loaded ? '' : 'hide-things'}`}>
      {loaded ? (
        <>
          {donateState && (
            <div
              className='absolute w-screen h-full bg-[rgba(0,0,0,0.5)] grid place-content-center top-0 left-0 z-10'
              onClick={handleDonateState}
            >
              <div className='z-20' onClick={handleDonateStateRemain}>
                <DoateModal />
              </div>
            </div>
          )}
          <div className={`${donateState ? 'blur-[6px]' : ''}`}>
            <Carousel
              selectedItem={currentSlideIndex}
              showArrows={true}
              infiniteLoop={true}
              interval={5000}
              autoPlay={!donateState}
              swipeable={true}
              transitionTime={1500}
              stopOnHover={true}
              showThumbs={false}
              // showIndicators={true}
              showStatus={false}
              onChange={(index) => setCurrentSlideindex(index)}
            >
              {images.map((item, index) => (
                <div
                  key={index}
                  className={`w-full outline-blue-500 flex flex-row justify-start items-center pl-20`}
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
                            item.textBlack
                              ? { color: 'black' }
                              : { color: 'white' }
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
                          item.textBlack
                            ? { color: 'black' }
                            : { color: 'white' }
                        }
                      >
                        {item.TitleText}
                      </h1>
                    </div>
                    <div className='mb-6  outline-red-400 w-full h-fit flex flex-row justify-start items-center'>
                      <div
                        className=' outline-blue-400 w-4/6 text-start font-PtdLight text-xl'
                        style={
                          item.textBlack
                            ? { color: 'black' }
                            : { color: 'white' }
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
                          onClick={
                            item.buttonText === '기부하기'
                              ? handleDonateState
                              : item.buttonClick
                          }
                          width={200}
                          height={50}
                          rounded={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            <div className='mt-2 px-[300px] w-fuil h-[150px] flex justify-between items-start pt-2'>
              {images.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-row justify-center items-start p-[5px] h-[137px]
            ${currentSlideIndex === index ? ' bg-red-300 rounded-[14px]' : ''}
            `}
                >
                  <button
                    onClick={() => handleThumbnailClick(index)}
                    className='w-[210px] h-[120px] '
                  >
                    <img src={item.thumb} alt='Thumbnail' sizes='100%' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-full bg-white pt-20'>
          <LoaderLinear />
        </div>
      )}
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import BUTTON_RED from '../components/Button_Red';
import BackgroundImage from '../assets/images/MainPageBackground.png';
import LogoColored from '../assets/images/LogoColored.png';

function IntroPage({ onLoginClick }: { onLoginClick: () => void }) {
  const tempClick = () => {
    onLoginClick();
  };

  const [moreInfo, setMoreInfo] = useState<boolean>(true);
  const closeMoreInfo = () => {
    setMoreInfo(false);
  };

  const KakaoAppKey = '19dbd953fa840cb821c17969d419e263';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        //eslint-disable-next-line
        (window as any).Kakao.init(KakaoAppKey);
      };
    }
  }, []);

  return (
    <div
      // style={{ backgroundColor: 'rgba(27, 27, 27, 0.5)' }}
      className='h-full flex flex-col justify-center items-center'
    >
      {moreInfo && (
        <div
          className='z-0 absolute top-20 left-0 h-14 w-screen flex flex-row justify-between items-center text-base'
          style={{ backgroundColor: '#333336' }}
        >
          <div className='w-1/4'></div>
          <div>
            <span className='text-white font-PtdLight'>
              Worldy Games 에 오신 것을 환영합니다. 지금 당장 모험을 떠나보세요.
            </span>
            <a
              href='/'
              className='text-blue-500 mx-4 underline underline-offset-4'
            >
              * 더 알아보기
            </a>
          </div>
          <div className='flex flex-row justify-end items-center w-1/4 px-10'>
            <button onClick={closeMoreInfo}>
              <svg
                stroke='currentColor'
                fill='rgba(148, 148, 152, 1)'
                strokeWidth='0'
                viewBox='0 0 1024 1024'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className='h-2/5 w-1/2 flex flex-col justify-center items-center mb-28'>
        <div className='w-full h-1/3 flex flex-row justify-center items-center'>
          <img className='h-full w-fit' src={LogoColored} alt='WORLDY GAME' />
        </div>
        <div className='w-full h-fit py-5 flex flex-row justify-center items-center text-7xl'>
          <span className='font-PtdBold text-white'>
            모여라, 세계를 탐험하라!
          </span>
        </div>
        <div className='w-full flex-1 flex flex-row justify-center items-start pt-7'>
          <BUTTON_RED
            text='무료 플레이하기'
            rounded={true}
            fontSize={20}
            width={200}
            height={50}
            onClick={tempClick}
          />
        </div>
      </div>
    </div>
  );
}

export default IntroPage;

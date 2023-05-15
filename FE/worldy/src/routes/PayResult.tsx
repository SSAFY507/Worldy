import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBg from '../assets/images/PaymentResultBackground.png';
import logoWhite from '../assets/images/DonateResultLogo.png';
import donateicon from '../assets/images/Carousel5Icon.png';

import PayResultClass from '../components/PayResultClass';
import BUTTON_RED from '../components/Button_Red';
import { useNavigate } from 'react-router';

export default function PayResult() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/');
  };

  const [popupNav, setPopupNav] = useState<number>(0);
  const [t, setT] = useState<boolean>(false);

  // const timing = () => {
  //   setT(!t);
  // };
  // useEffect(() => {
  //   if (!t) setPopupNav(0);
  //   else
  //     setTimeout(() => {
  //       setPopupNav(1);
  //       setTimeout(() => {
  //         setPopupNav(2);
  //         setTimeout(() => {
  //           setPopupNav(3);
  //         }, 1000);
  //       }, 500);
  //     }, 300);
  // }, [t]);
  useEffect(() => {
    setTimeout(() => {
      setPopupNav(1);
      setTimeout(() => {
        setPopupNav(2);
      }, 800);
    }, 500);
  }, []);

  return (
    <div className='relative w-full h-full grid place-content-center z-0 bg-[#ffffff]'>
      {/* <button
        className='absolute z-[5] top-0 left-0 w-[100px] h-[20px] bg-white'
        onClick={timing}
      >
        Button
      </button> */}
      {/* <img
        src={pathBg}
        alt={'배경화면'}
        className='h-full absolute top-0 left-0 z-[1]'
      /> */}
      {/* <img
        src={donateicon}
        alt={'donateIcon'}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 opacity-30'
      /> */}
      <div className='z-[2] outline-white flex flex-col justify-center items-center rounded-xl p-[20px] '>
        <img
          src={logoWhite}
          alt={'하얀 로고'}
          className={`w-[100px] transition-all duration-[800ms] ease-out mb-[40px]  ${
            popupNav >= 1
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[100px] opacity-0'
          }`}
        />
        <PayResultClass location={window.location} />
        <span
          className={`text-[50px] font-PtdExtraBold rounded-full text-black  px-[20px] mb-[70px] transition-all duration-[800ms] ease-out ${
            popupNav >= 1
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[100px] opacity-0'
          }`}
        >
          기부가 완료되었습니다.
        </span>
        <div
          className={`flex flex-col justify-between items-center transition-all duration-[800ms] ease-out ${
            popupNav >= 2
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[100px] opacity-0'
          }`}
        >
          <span className='text-[18px] text-[#565656] font-PtdLight mb-[10px]'>
            결제 금액 2,200won
          </span>
          <span className='text-[20px] text-black font-PtdRegular text-center mb-[50px] leading-[27px]'>
            결제가 성공적으로 처리되었습니다.
            <br />더 나은 세상을 위한 한 걸음에 함께해주셔서 감사합니다.
          </span>
        </div>
        <div
          className={`transition-all duration-[800ms] ease-out ${
            popupNav >= 2
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[100px] opacity-0'
          }`}
        >
          <BUTTON_RED
            text='홈으로 가기'
            rounded={true}
            fontSize={20}
            onClick={toHome}
            width={200}
            height={60}
          />
        </div>
      </div>
    </div>
  );
}

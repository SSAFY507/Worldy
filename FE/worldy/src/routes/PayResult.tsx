import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBg from '../assets/images/PaymentResultBackground.png';
import logoWhite from '../assets/images/Logo-white.png';

import PayResultClass from '../components/PayResultClass';
import BUTTON_RED from '../components/Button_Red';
import { useNavigate } from 'react-router';

export default function PayResult() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/');
  };

  return (
    <div className='relative w-full h-full grid place-content-center z-0'>
      <img
        src={pathBg}
        alt={'배경화면'}
        className='h-full absolute top-0 left-0 z-[1]'
      />
      <div className='z-[2] outline-white flex flex-col justify-center items-center rounded-xl p-[20px]'>
        <img src={logoWhite} alt={'하얀 로고'} className='w-[200px]' />
        <PayResultClass location={window.location} />
        <span
          className={`text-[50px] font-PtdBold rounded-full text-white  px-[20px] mb-[60px]`}
        >
          기부가 완료되었습니다.
        </span>

        <span className='text-[24px] text-[#C6C6C6] font-PtdLight mb-[10px]'>
          결제 금액 2,200won
        </span>
        <span className='text-[30px] text-white font-PtdExtraLight text-center mb-[50px] leading-[35px]'>
          결제가 성공적으로 처리되었습니다.
          <br />더 나은 세상을 위한 한 걸음에 함께해주셔서 감사합니다.
        </span>
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
  );
}

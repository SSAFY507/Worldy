import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBg from '../assets/images/PaymentResultBackground.png';
import PayResultClass from '../components/PayResultClass';

type PayResultStringType = {
  result: string;
  content: JSX.Element;
  buttontext: string;
};

export default function PayResult({ input }: { input: PayResultStringType }) {
  return (
    <div
      className='w-full h-full grid place-content-center bg-gray-200'
      style={{ backgroundImage: `url(${pathBg})`, backgroundSize: '100%' }}
    >
      <div className='outline outline-white flex flex-col justify-center items-center bg-[rgba(255,255,255,0.5)] rounded-xl p-[20px]'>
        <PayResultClass location={window.location} />
        <span
          className={`text-[50px] font-PtdExtraBold rounded-full text-white ${
            input.result === '결제 성공'
              ? 'bg-[rgba(100,100,100,0.5)]'
              : 'bg-[rgba(202,48,28,0.8)]'
          } py-[10px] px-[20px] my-[20px]`}
        >
          {input.result}
        </span>
        <span className='w-fit h-fit flex-wrap text-[30px] font-PtdRegular leading-[38px] my-[20px] p-[20px] bg-[rgba(255,255,255,0.4)] rounded-md'>
          {input.content}
        </span>
        <a
          href='/'
          className='w-[200px] h-fit p-[15px] bg-gray-800 mt-[20px] mb-[10px] text-center py-[15px] text-white rounded-md font-PtdLight text-[25px]'
        >
          {input.buttontext}
        </a>
      </div>
    </div>
  );
}

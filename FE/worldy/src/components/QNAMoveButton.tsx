import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/QNAMoveButtonStyles.css';
import { useNavigate } from 'react-router';
import { FiArrowUpRight } from 'react-icons/fi';

export default function QNAMoveButton({
  handleQnaModal,
}: {
  handleQnaModal: (input: number) => void;
}) {
  const navigate = useNavigate();

  const moveToSupport = (input: number) => {
    handleQnaModal(input);
    navigate('/support');
  };
  return (
    <div className='main relative  outline-yellow-300 hover:text-white font-medium text-[18px] mt-[10px]'>
      <button className={`QNAbuttoncard`} onClick={() => moveToSupport(1)}>
        <span className=''>문의하기</span>
      </button>
      <div className='w-[1px] h-1/2 bg-[rgba(220,220,220,0.5)] qnatempborder' />
      <button
        className='QNAbuttoncard grid place-content-center '
        onClick={() => moveToSupport(0)}
      >
        <span className='flex flex-row justify-center items-center'>
          고객 지원
        </span>
      </button>
      <div className='w-[1px] h-1/2 bg-[rgba(220,220,220,0.5)] qnatempborder' />
      <button className='QNAbuttoncard' onClick={() => moveToSupport(2)}>
        <span>신고하기</span>
      </button>
      <p className='absolute top-0 left-0  w-full h-full QNAbuttontext  bg-none rounded-md flex flex-row justify-between items-start'>
        <div className='flex flex-col justify-center items-start'>
          <span className='text-[25px] font-PtdSemiBOld text-white'>
            궁금한 점이 있으신가요?
          </span>
          <span className='text-[15px] font-PtdExtraLight text-gray-400 mt-[5px]'>
            여기를 클릭해주세요.
          </span>
        </div>
        <div className='flex flex-row justify-end items-center'>
          <FiArrowUpRight size={25} color={'white'} />
        </div>
      </p>
    </div>
  );
}

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
    <div className='main relative  outline-yellow-300 hover:text-white font-medium text-[18px]'>
      <button className='QNAbuttoncard' onClick={() => moveToSupport(1)}>
        <span className=''>문의하기</span>
      </button>
      <button
        className='QNAbuttoncard grid place-content-center'
        onClick={() => moveToSupport(0)}
      >
        <span className='flex flex-row justify-center items-center'>
          고객 지원
          <FiArrowUpRight className='' />
        </span>
      </button>
      <button className='QNAbuttoncard' onClick={() => moveToSupport(2)}>
        <span>신고하기</span>
      </button>
      <p className='absolute top-0 left-0  w-full h-full QNAbuttontext  bg-[rgba(245,245,245,0.3)] rounded-md grid place-content-center'>
        <span className='text-[30px] font-PtdBold text-gray-300'>
          궁금한 게 있으신가요?
        </span>
      </p>
    </div>
  );
}

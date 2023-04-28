import * as React from 'react';
import { useState, useEffect } from 'react';

type PaginationInputType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination(input: PaginationInputType) {
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const buttonGroupSize: number = 10;

  const handlePreviousGroup = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
      input.onPageChange((currentGroup - 2) * buttonGroupSize + 1);
    }
  };

  const handleNextGroup = () => {
    if (currentGroup < Math.ceil(input.totalPages / buttonGroupSize)) {
      setCurrentGroup(currentGroup + 1);
      input.onPageChange(currentGroup * buttonGroupSize + 1);
    }
  };

  const pages = Array.from(
    {
      length: Math.min(
        buttonGroupSize,
        input.totalPages - (currentGroup - 1) * buttonGroupSize
      ),
    },
    (_, index) => (currentGroup - 1) * buttonGroupSize + index + 1
  );

  return (
    <div className='flex flex-row w-fit h-full outline-black items-center justify-stretch'>
      <button
        onClick={handlePreviousGroup}
        disabled={currentGroup === 1}
        className=' outline-blue-500 mr-[10px] w-[30px] h-[30px] flex justify-center items-center'
      >
        <svg
          stroke='currentColor'
          fill='none'
          strokeWidth='2'
          viewBox='0 0 24 24'
          strokeLinecap='round'
          strokeLinejoin='round'
          height='3em'
          width='3em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <polyline points='11 17 6 12 11 7'></polyline>
          <polyline points='18 17 13 12 18 7'></polyline>
        </svg>
      </button>
      <div className='flex flex-row w-fit'>
        {pages.map((page) => (
          <button
            key={page}
            className={`cursor-pointer ${
              input.currentPage === page
                ? 'font-PtdBold  outline-gray-400 '
                : 'font-PtdRegular '
            } w-[30px] text-black rounded-[50px]  h-[30px] flex justify-center items-center mx-[10px]`}
            onClick={() => input.onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {currentGroup < Math.ceil(input.totalPages / buttonGroupSize) && (
        <button
          onClick={handleNextGroup}
          className=' outline-blue-500 ml-[10px] w-[30px] h-[30px] flex justify-center items-center '
        >
          <svg
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
            height='3em'
            width='3em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <polyline points='13 17 18 12 13 7'></polyline>
            <polyline points='6 17 11 12 6 7'></polyline>
          </svg>
        </button>
      )}
    </div>

    // <ul className='flex flex-row'>
    //   {pages.map((page) => (
    //     <li
    //       key={page}
    //       className={`cursor-pointer ${
    //         input.currentPage === page ? 'font-PtdSemiBOld' : 'font-PtdRegular'
    //       }`}
    //       onClick={() => input.onPageChange(page)}
    //     >
    //       {page}
    //     </li>
    //   ))}
    // </ul>
  );
}

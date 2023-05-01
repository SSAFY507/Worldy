import * as React from 'react';
import { useState, useEffect } from 'react';
import pathSEB from '../assets/images/SupportExploreBackground.png';
import pathSMB from '../assets/images/SupportMonopolyBackground.png';

import '../styles/SupportStyles.css';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';

type SupportItemType = {
  content: string;
  date: string;
  response: string;
};

export default function Support() {
  const myImageList = {
    SupportExploreBackground: pathSEB,
    SupportMonopolyBackground: pathSMB,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
        console.log(loadedImages);
      }, 300);
    }
  }, [isLoaded]);

  const [searchText, setSearchText] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitSearch();
    }
  };

  const handleSubmitSearch = () => {
    console.log(searchText);
  };

  const [subjectIndex, setSubjectIndex] = useState<number>(0);

  const handleSubjectIndex = (index: number) => {
    setSubjectIndex(index);
    setResState(-1);
  };

  const subjectList: SupportItemType[][] = [
    [
      {
        content:
          '질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 11-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1질문 1-1',
        date: '2023-04-30',
        response: '답변 1',
      },
      { content: '질문 1-2', date: '2023-04-29', response: '답변 2' },
      { content: '질문 1-2', date: '2023-04-29', response: '답변 2' },
      { content: '질문 1-2', date: '2023-04-29', response: '답변 2' },
      {
        content: '질문 1-2',
        date: '2023-04-29',
        response:
          '답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2답변 2',
      },
    ],
    [{ content: '질문 2-1', date: '2023-04-28', response: '답변 3' }],
    [{ content: '질문 3-1', date: '2023-04-28', response: '답변 3' }],
    [{ content: '질문 4-1', date: '2023-04-28', response: '답변 3' }],
    [{ content: '질문 5-1', date: '2023-04-28', response: '답변 3' }],
  ];

  const [resState, setResState] = useState<number>(-1);

  const openResponse = (index: number) => {
    index === resState ? setResState(-1) : setResState(index);
    console.log('index', index);
    console.log('resState', resState);
  };

  const ItemBox = (item: SupportItemType, index: number) => {
    return (
      <>
        <button
          className=' w-full h-fit flex flex-row justify-between items-center px-[15px] py-[10px] bg-[rgba(164,164,164,0.29)]'
          onClick={() => openResponse(index)}
        >
          <div className=' w-[95%] h-fit min-h-[60px] flex flex-col justify-between items-start '>
            <div className='flex flex-row my-[5px] justify-start items-center text-white text-[20px] p-[10px] min-h-1/2 w-full h-fit leading-6 text-start'>
              {item.content}
            </div>
            <div className='min-h-1/2 w-1/5 my-[5px]  flex flex-row justify-start items-center text-gray-400 text-[16px] font-PtdLight'>
              <div className='px-[10px] border-r-[1px] border-r-gray-400 border-solid border-0'>
                {subjectIndex === 0
                  ? '자주 묻는 질문'
                  : subjectIndex === 1
                  ? '전체'
                  : subjectIndex === 2
                  ? '계졍/보안'
                  : subjectIndex === 3
                  ? '게임 문의'
                  : '기타 문의'}
              </div>
              <div className='px-[10px]'>{item.date}</div>
            </div>
          </div>
          <div className=' w-[3%] h-[50px]'></div>
        </button>
        <div
          className={`${
            resState !== index
              ? 'w-0 h-0 opacity-0'
              : 'w-full h-fit opacity-100  mt-[5px]  flex flex-col justify-between items-center px-[15px] py-[10px] bg-[rgba(94,85,70,0.31)]'
          }
          `}
        >
          <div className='flex flex-row my-[5px] justify-start items-center text-white text-[20px] p-[10px] min-h-1/2 w-full h-fit leading-6 text-start transit'>
            {resState === index ? item.response : null}
          </div>
          <div className='w-full h-[50px] flex flex-row justify-end items-center'>
            <span className='text-white mx-[10px] text-[15px] flex flex-row justify-center items-center font-PtdLight'>
              추가적으로 궁금한 게 있으신가요?
            </span>
            <button className=' rounded-full w-[80px] h-[70%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'>
              문의하기
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='hide-scrollbar min-w-full h-fit min-h-full bg-gray-800 flex justify-center items-start pt-[20px] absolute top-20 left-0 overflow-hidden'>
      <div className='w-full h-fit flex flex-col justify-stretch items-center'>
        <div className='w-full h-[300px]   flex flex-col justify-start items-center'>
          <div className='w-[100%] h-full   flex justify-start flex-col items-center px-[10px]'>
            <div className='my-[10px]  w-[100%] h-[17%] flex flex-row justify-end items-center px-[100px]'>
              <div className='  w-[30%] h-full px-[30px] flex flex-row justify-between items-center'>
                <button className=' rounded-full w-[120px] h-[90%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'>
                  문의하기
                </button>
                <button className='rounded-full w-[120px] h-[90%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'>
                  신고하기
                </button>
                <button className='rounded-full w-[120px] h-[90%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'>
                  문의/신고 내역
                </button>
              </div>
            </div>
            <div className='my-[10px]  w-[50%] h-[25%] grid justify-center items-center text-[40px] font-PtdExtraBold text-white'>
              WORLDY SOFT 고객 지원
            </div>
            <div className='my-[10px]  outline-red-500 w-[45%] h-[25%] flex flex-row justify-stretch items-center'>
              <button className='w-[60px] h-[60px] bg-white grid justify-center items-center'>
                <svg
                  stroke='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 24 24'
                  height='2em'
                  width='2em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z'></path>
                  <path d='M11.412,8.586C11.791,8.966,12,9.468,12,10h2c0-1.065-0.416-2.069-1.174-2.828c-1.514-1.512-4.139-1.512-5.652,0 l1.412,1.416C9.346,7.83,10.656,7.832,11.412,8.586z'></path>
                </svg>
              </button>
              <input
                className='bg-white h-[60px] w-full px-[10px] text-[25px]'
                type='text'
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                placeholder='WORLDY SOFT 내 검색'
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className='h-[80px] w-full  outline-yellow-400 flex justify-center items-stretch  border-b-[1px] border-0 border-b-[rgba(164,163,163,0.5)] border-solid'>
          <div className='w-[90%] h-full flex justify-start'>
            <button
              className={`flex flex-row justify-between items-center w-[220px] h-full  outline-red-500 text-[22px] ${
                subjectIndex === 0
                  ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                  : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
              }`}
              onClick={() => handleSubjectIndex(0)}
            >
              <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-between items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px] border-dotted'>
                <svg
                  width='22'
                  height='23'
                  viewBox='0 0 16 17'
                  xmlns='http://www.w3.org/2000/svg'
                  fill={
                    subjectIndex === 0 ? '#ff4d45' : 'rgba(147,147,147,0.7)'
                  }
                  opacity='1'
                >
                  <path
                    d='M14.412 0C15.294 0 16 .68 16 1.529V11.55c0 .529-.275 1.02-.745 1.303l-6.392 3.906c-.53.321-1.177.321-1.706 0L.745 12.853A1.514 1.514 0 0 1 0 11.55V1.53C0 .679.706 0 1.588 0zM7.748 2.485C5.582 2.485 4.11 3.9 4.11 6.407c0 2.156 1.088 3.562 2.774 3.922.576 1.221 1.78 2.094 3.509 2.094.63 0 1.141-.103 1.44-.257l-.33-1.334-.155.046a2.882 2.882 0 0 1-.742.097c-.64 0-1.354-.195-1.717-.718 1.525-.442 2.496-1.818 2.496-3.85 0-2.495-1.472-3.922-3.637-3.922zm0 1.57c1.045 0 1.696.873 1.696 2.352 0 1.591-.651 2.505-1.696 2.505-1.046 0-1.686-.914-1.686-2.505 0-1.479.64-2.352 1.686-2.352z'
                    fill='current'
                    fill-rule='evenodd'
                  ></path>
                </svg>
                자주 묻는 질문
              </div>
            </button>
            <button
              className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                subjectIndex === 1
                  ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                  : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
              }`}
              onClick={() => handleSubjectIndex(1)}
            >
              <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px]  border-solid'>
                전체
              </div>
            </button>
            <button
              className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                subjectIndex === 2
                  ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                  : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
              }`}
              onClick={() => handleSubjectIndex(2)}
            >
              <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px] border-solid'>
                계정/보안
              </div>
            </button>
            <button
              className={`flex justify-center items-center w-fit h-full  text-[20px]  ${
                subjectIndex === 3
                  ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                  : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
              }`}
              onClick={() => handleSubjectIndex(3)}
            >
              <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px]  border-solid'>
                게임 문의
              </div>
            </button>
            <button
              className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                subjectIndex === 4
                  ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                  : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
              }`}
              onClick={() => handleSubjectIndex(4)}
            >
              <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center'>
                기타 문의
              </div>
            </button>
          </div>
        </div>
        <div className='hide-scrollbar w-[90%] h-fit max-h-full  pt-[20px] flex flex-col justify-start items-center overflow-scroll'>
          {subjectList[subjectIndex].map((item, index) => (
            <div key={index} className=' outline-white my-[10px] w-full h-fit'>
              {ItemBox(item, index)}
            </div>
          ))}
          <div className=' h-[50px]'></div>
        </div>
      </div>
    </div>
  );
}

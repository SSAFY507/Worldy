import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBG from '../assets/images/MyPageBackground.png';
import { BsPersonCircle } from 'react-icons/bs';

type MyPageMenuType = {
  icon?: React.ReactNode;
  title: string;
  url: string;
};

export default function MyPage() {
  const MyPageMenuItems: MyPageMenuType[] = [
    { icon: <BsPersonCircle />, title: '계정 정보', url: '어디여' },
    { icon: <BsPersonCircle />, title: '계정 정보', url: '어디여' },
    { icon: <BsPersonCircle />, title: '계정 정보', url: '어디여' },
    { icon: <BsPersonCircle />, title: '계정 정보', url: '어디여' },
  ];

  const [myPageMenuHoverState, setMyPageMenuHoverState] = useState<number>(-1);

  const handleMyPageMenuHoverState = (input: number) => {
    setMyPageMenuHoverState(input);
  };

  const MyPageMenuComponent = ({
    input,
    key,
  }: {
    input: MyPageMenuType;
    key: number;
  }) => {
    return (
      <a
        key={key}
        onMouseEnter={() => handleMyPageMenuHoverState(key)}
        onMouseLeave={() => handleMyPageMenuHoverState(-1)}
        className='w-full h-[2em] flex flex-row justify-start items-center mb-[1em] outline outline-gray-500 pl-[15px]'
        href={input.url}
      >
        <span
          className={`${
            myPageMenuHoverState === key ? 'text-buttonRed' : 'text-gray-300'
          } text-[1.5em]`}
        >
          {input.icon}
        </span>
        <span
          className={`text-[1.2em] text-white font-PtdMedium pl-[.8em] hover:bg-white`}
        >
          {input.title}
        </span>
      </a>
    );
  };

  return (
    <div
      className='w-full h-full flex flex-row justify-center items-center overflow-hidden'
      style={{ backgroundImage: `url(${pathBG})`, backgroundSize: '100%' }}
    >
      <div className='w-[80%] h-full outline outline-white flex flex-row justify-stretch items-center'>
        <div className='w-[25%] h-full outline outline-yellow-300 pt-[5em]'>
          <div className='w-[90%] h-fit outline outline-yellow-200 flex flex-col items-start'>
            <div className='flex flex-row justify-start pl-[15px]'>
              <span className='text-white font-PtdBold text-[3em]'>
                마이 페이지
              </span>
            </div>
            <div className='w-full h-fit my-[3em] outline outline-yellow-600'>
              {MyPageMenuItems.map((item, index) =>
                MyPageMenuComponent({ input: item, key: index })
              )}
            </div>
          </div>
        </div>
        <div className='flex-1 h-full outline outline-yellow-300 overflow-y-scroll'></div>
      </div>
    </div>
  );
}

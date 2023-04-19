import React, { useState } from 'react';
import LogoWhite from '../assets/images/Logo-white.png';
import { ImSearch } from 'react-icons/im';
import { AiOutlineGlobal } from 'react-icons/ai';
import LoginModal from './LoginModal';
import ReactDOM from 'react-dom';

export default function Navbar({ onLoginClick }: any) {
  const navList = [];
  navList.push(['홈', '/']);
  navList.push(['게임 정보', '/']);
  navList.push(['업데이트', '/']);
  navList.push(['세계 탐험', '/']);
  navList.push(['모노폴리', '/hoons']);
  navList.push(['고객 지원', '/']);

  const handleLoginModalClick = (e: any) => {
    e.preventDefault();
    onLoginClick();
  };

  return (
    <>
      <nav>
        <div className='w-screen h-20 bg-neutral-950 flex flex-row items-center justify-between px-6'>
          <div className='w-1/6 h-full'>
            <div className='w-fit h-full'>
              <a href='/'>
                <img src={LogoWhite} className='h-full' />
              </a>
            </div>
          </div>
          <div className='w-3/5 h-full'>
            <ul className='flex flex-row items-center justify-center h-full'>
              {navList.map((item, index) => (
                <li key={index} className='mx-10'>
                  <a href={item[1]}>
                    <div className='w-20 text-base h-10 flex flex-row items-center justify-center text-center text-white'>
                      {item[0]}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-1/6 h-full flex flex-row items-center justify-between'>
            <div className='w-1/2 flex flex-row justify-start'>
              <button className='w-1/3'>
                <ImSearch color='white' />
              </button>
              <button className='w-1/3'>
                <AiOutlineGlobal size='20' color='white' />
              </button>
            </div>
            <div className='w-1/2 h-ful flex flex-row justify-center items-center'>
              <button
                onClick={handleLoginModalClick}
                className='bg-buttonRed rounded-full h-10 w-32 text-white text-sm'
              >
                무료 플레이하기
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

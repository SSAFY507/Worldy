import React, { useState } from 'react';
import LogoWhite from '../assets/images/Logo-white.png';
import WorldySoftLogo from '../assets/images/WorldySoftLogo.png';
import { ImSearch } from 'react-icons/im';
import { AiOutlineGlobal } from 'react-icons/ai';
import LoginModal from './LoginModal';
import ReactDOM from 'react-dom';
import BUTTON_RED from './Button_Red';
import '../styles/NavBarAnimation.css';

type NavListType = {
  name: string;
  path: string;
};

export default function Navbar({
  onLoginClick,
  onLoginAdmin,
}: {
  onLoginClick: () => void;
  onLoginAdmin: () => void;
}) {
  const navList: NavListType[] = [
    { name: '홈', path: '/' },
    { name: '게임 정보', path: '/gameinfo' },
    { name: '업데이트', path: '/upadtes' },
    { name: '세계 탐험', path: '/explore' },
    { name: '모노폴리', path: '/monopoly' },
    { name: '고객 지원', path: '/support' },
  ];

  const handleLoginModalClick = (e: any) => {
    e.preventDefault();
    onLoginClick();
  };

  const [tempLoginColor, setTempLoginColor] = useState<boolean>(false);
  const adminLogin = () => {
    onLoginAdmin();
    setTempLoginColor((prev) => !prev);
  };

  const [loginState, setLoginState] = useState<boolean>(false);
  const handleLoginState = () => {
    setLoginState(!loginState);
  };

  const afterLoginButtonIcon: JSX.Element = (
    <div className='grid place-content-center w-full h-full'>
      <svg
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        viewBox='0 0 16 16'
        height='1.8em'
        width='1.8em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z'
          clip-rule='evenodd'
        ></path>
      </svg>
    </div>
  );

  return (
    <>
      <nav>
        <div className='w-screen h-20 bg-neutral-950 flex flex-row items-center justify-between px-6'>
          <div className='w-1/6 h-full flex flex-row justify-start items-center'>
            <div className='w-fit h-fit' id='StarButton'>
              {[...Array(6)].map((_, i) => (
                <div className={`star-${i + 1}`} key={i}>
                  <svg
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox='0 0 784.11 815.53'
                    style={{
                      shapeRendering: 'geometricPrecision',
                      textRendering: 'geometricPrecision',
                      imageRendering: 'pixelated',
                      fillRule: 'evenodd',
                      clipRule: 'evenodd',
                    }}
                    version='1.1'
                    xmlSpace='preserve'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <defs></defs>
                    <g id='Layer_x0020_1'>
                      <metadata id='CorelCorpID_0Corel-Layer'></metadata>
                      <path
                        d='M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z'
                        className='fil0'
                      ></path>
                    </g>
                  </svg>
                </div>
              ))}
              <a href='/'>
                <img
                  src={WorldySoftLogo}
                  className='h-[40px]'
                  alt='Worldy Soft Comp'
                />
              </a>
            </div>
          </div>
          <div className='w-3/5 h-full'>
            <ul className='flex flex-row items-center justify-center h-full'>
              {navList.map((item, index) => (
                <li key={index} className='mx-10'>
                  <a href={item.path}>
                    <div
                      id='NavBarButtons-Animation'
                      className=' w-20 text-lg h-10 flex flex-row items-center justify-center text-center text-white font-PtdRegular '
                    >
                      {item.name}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-1/6 h-full flex flex-row items-center justify-between'>
            <div className='w-1/2 h-full flex flex-row justify-end items-center  outline-white'>
              <button
                className='w-[2.5em] h-[2.5em] mx-[.5em]  grid place-items-center outline-red-300'
                onClick={handleLoginState}
              >
                <ImSearch color='white' />
              </button>
              <button
                className='w-[2.5em] h-[2.5em] mx-[.5em]  grid place-items-center outline-red-300'
                onClick={adminLogin}
              >
                <AiOutlineGlobal
                  size='20'
                  color={tempLoginColor ? 'green' : 'white'}
                />
              </button>
            </div>
            <div className=' w-1/2 h-full flex flex-row justify-center items-center'>
              {loginState ? (
                <BUTTON_RED
                  fontSize={16}
                  width={50}
                  height={50}
                  rounded={true}
                  onClick={handleLoginModalClick}
                  text={afterLoginButtonIcon}
                  fontFamily={'font-PtdRegular'}
                />
              ) : (
                <BUTTON_RED
                  fontSize={16}
                  width={80}
                  height={35}
                  rounded={true}
                  onClick={handleLoginModalClick}
                  text='로그인'
                  fontFamily={'font-PtdRegular'}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

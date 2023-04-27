import React, { useState } from 'react';
import LogoWhite from '../assets/images/Logo-white.png';
import WorldySoftLogo from '../assets/images/WorldySoftLogo.png';
import { ImSearch } from 'react-icons/im';
import { AiOutlineGlobal } from 'react-icons/ai';
import LoginModal from './LoginModal';
import ReactDOM from 'react-dom';
import BUTTON_RED from './Button_Red';
import '../styles/NavBarAnimation.css';

export default function Navbar({
  onLoginClick,
  onLoginAdmin,
}: {
  onLoginClick: () => void;
  onLoginAdmin: () => void;
}) {
  const navList = [];
  navList.push(['홈', '/']);
  navList.push(['게임 정보', '/gameinfo']);
  navList.push(['업데이트', '/updates']);
  navList.push(['세계 탐험', '/explore']);
  navList.push(['모노폴리', '/monopoly']);
  navList.push(['고객 지원', '/support']);

  const handleLoginModalClick = (e: any) => {
    e.preventDefault();
    onLoginClick();
  };

  const [tempLoginColor, setTempLoginColor] = useState<boolean>(false);
  const adminLogin = () => {
    onLoginAdmin();
    setTempLoginColor((prev) => !prev);
  };

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
                  <a href={item[1]}>
                    <div
                      id='NavBarButtons-Animation'
                      className=' w-20 text-lg h-10 flex flex-row items-center justify-center text-center text-white font-PtdRegular '
                    >
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
              <button className='w-1/3' onClick={adminLogin}>
                <AiOutlineGlobal
                  size='20'
                  color={tempLoginColor ? 'green' : 'white'}
                />
              </button>
            </div>
            <div className=' w-1/2 h-ful flex flex-row justify-start items-center'>
              <BUTTON_RED
                fontSize={16}
                width={80}
                height={35}
                rounded={true}
                onClick={handleLoginModalClick}
                text='로그인'
                fontFamily={'font-PtdRegular'}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

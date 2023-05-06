import React, { useState } from 'react';
import LogoWhite from '../assets/images/Logo-white.png';
import WorldySoftLogo from '../assets/images/WorldySoftLogo.png';
import { ImSearch } from 'react-icons/im';
import { AiOutlineGlobal } from 'react-icons/ai';
import LoginModal from './LoginModal';
import ReactDOM from 'react-dom';
import BUTTON_RED from './Button_Red';
import '../styles/NavBarAnimation.css';
import SallyPath from '../assets/images/SallyProfilePic.png';

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
    { name: '업데이트', path: '/updates' },
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

  const [hoverAfterLoginIcon, setHoverAfetrLoginIcon] =
    useState<boolean>(false);

  const handleHoverAfterLoginIcon = (input: boolean) => {
    setHoverAfetrLoginIcon(input);
  };

  const afterLoginButtonIcon: JSX.Element = (
    <div className='grid place-content-center w-full h-full'>
      <svg
        stroke='currentColor'
        fill={`${hoverAfterLoginIcon ? 'rgb(255,77,69)' : 'white'}`}
        strokeWidth='0'
        viewBox='0 0 16 16'
        height='1.5em'
        width='1.5em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        ></path>
      </svg>
    </div>
  );

  const [clickStateAfterLoginIcon, setClickStateAfterLoginIcon] =
    useState<boolean>(false);

  const handleClickStateAfterLoginIcon = () => {
    setClickStateAfterLoginIcon(!clickStateAfterLoginIcon);
  };

  const userNick: string = 'Sunday';
  const userName: string = '김설희';

  const [hoverModalContent, setHoverModalContent] = useState<number>(0);

  const hoverModalMyPage = (input: number) => [setHoverModalContent(input)];

  const AferLoginIconButtonComponent: React.ReactNode = (
    <div className='relative '>
      <button
        className={` w-[2.5em] h-[2.5em]  ml-[1.5em] mr-[2em]  rounded-3xl `}
        onMouseEnter={() => handleHoverAfterLoginIcon(true)}
        onMouseLeave={() => handleHoverAfterLoginIcon(false)}
        onClick={handleClickStateAfterLoginIcon}
      >
        {afterLoginButtonIcon}
      </button>
      <div
        className={`w-[13em] h-fit bg-[rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-stretch items-center absolute outline outline-[.05em] outline-[rgba(255,255,255,0.2)] rounded-xl -bottom-[2em] right-0  transition-all duration-300 ease-out ${
          clickStateAfterLoginIcon
            ? 'z-0 opacity-100 transform translate-y-[100%]'
            : '-z-20 opacity-0 transform translate-y-0'
        }`}
      >
        <div className='w-full h-[4em] flex flex-row justify-stretch items-center border-b-[.05em] border-solid border-0 border-[rgba(255,255,255,0.2)] '>
          <div className='w-[5em] h-full flex justify-center items-center'>
            <div className=' w-[2.5em] h-[2.5em] rounded-full  overflow-hidden bg-[rgba(255,255,255,0.5)]'>
              <img src={SallyPath} alt='쌜리' className='w-full h-full' />
            </div>
          </div>
          <div className='h-full flex-1 py-[.5em] flex flex-col justify-stretch items-center  text-white'>
            <div className='h-full w-full flex justify-start items-center font-PtdSemiBOld text-[20px]'>
              {userNick}
            </div>
          </div>
        </div>
        <div className='w-full h-fit flex flex-col justify-center text-[rgba(220,220,220,0.8)] font-PtdRegular'>
          <a
            className={`w-full h-[2.8em] text-center flex justify-center items-center border-b-[.05em] border-solid border-0 border-[rgba(255,255,255,0.2)] ${
              hoverModalContent === 1
                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                : ''
            }`}
            href='/mypage'
            onMouseEnter={() => hoverModalMyPage(1)}
            onMouseLeave={() => hoverModalMyPage(0)}
          >
            마이페이지
          </a>
          <a
            className={`w-full h-[2.8em] text-center  flex justify-center items-center border-b-[.05em] border-solid border-0 border-[rgba(255,255,255,0.2)] ${
              hoverModalContent === 2
                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                : ''
            }`}
            href='/support'
            onMouseEnter={() => hoverModalMyPage(2)}
            onMouseLeave={() => hoverModalMyPage(0)}
          >
            고객 지원
          </a>
          <a
            className={`w-full h-[2.8em] text-center  flex justify-center items-center ${
              hoverModalContent === 3
                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                : ''
            }`}
            href='/support'
            onMouseEnter={() => hoverModalMyPage(3)}
            onMouseLeave={() => hoverModalMyPage(0)}
          >
            로그아웃
          </a>
        </div>
        {/* <div className='w-full h-[2em] flex flex-row justify-end items-center my-[.12em] '>
          <button
            className={`w-fit h-full px-[1em] ml-[1em]  ${
              hoverModalContent === 3
                ? 'text-[rgba(255,255,255,0.7)]'
                : 'text-[rgba(255,255,255,0.3)]'
            } text-[15px]`}
            onMouseEnter={() => hoverModalMyPage(3)}
            onMouseLeave={() => hoverModalMyPage(0)}
          >
            로그아웃
          </button>
        </div> */}
      </div>
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
            <div className='flex-1 h-full flex flex-row justify-end items-center  outline-white'>
              <button
                className='w-[2.5em] h-[2.5em]  grid place-items-center outline-red-300'
                onClick={handleLoginState}
              >
                <ImSearch color='white' />
              </button>
              <button
                className='w-[2.5em] h-[2.5em] ml-[1.5em]   grid place-items-center outline-red-300'
                onClick={adminLogin}
              >
                <AiOutlineGlobal
                  size='20'
                  color={tempLoginColor ? 'green' : 'white'}
                />
              </button>
            </div>
            <div
              className={`${
                loginState ? 'w-fit' : 'w-1/2'
              } h-full flex flex-row justify-center items-center outline-white`}
            >
              {loginState ? (
                AferLoginIconButtonComponent
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

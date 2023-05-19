import '../styles/NavBarAnimation.css';

import React, { useEffect, useState } from 'react';
import {
  loginNickName,
  loginProfileImg,
  loginState,
} from '../_store/slices/loginSlice';

import { AiOutlineGlobal } from 'react-icons/ai';
import BUTTON_RED from './Button_Red';
import CustomAxios from '../API/CustomAxios';
import { ImSearch } from 'react-icons/im';
import LoginModal from './LoginModal';
import LogoWhite from '../assets/images/Logo-white.png';
import ReactDOM from 'react-dom';
import SallyPath from '../assets/images/SallyProfilePic.png';
import Swal from 'sweetalert2';
import WorldySoftLogo from '../assets/images/WorldySoftLogo.png';
import { logout } from '../_store/slices/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

type NavListType = {
  name: string;
  path: string;
};

export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  const DOMAIN = process.env.REACT_APP_BASE_URL;
  const DOMAIN_S = process.env.REACT_APP_BASE_URL_SHORTER;
  const navigate = useNavigate();

  const navList: NavListType[] = [
    { name: '홈', path: '/' },
    // { name: '게임 정보', path: '/info' },
    // { name: '업데이트', path: '/updates' },
    { name: '세계 탐험', path: '/explore' },
    { name: '월디폴리', path: '/create' },
    { name: '고객 지원', path: '/support' },
  ];

  const checkLoginState = sessionStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();

  const [logoutResult, setLogoutResult] = useState<any>();

  const logoutAxios = async () => {
    const loginToken = sessionStorage.getItem('token');
    //console.log('로그아웃 시 토큰 : ', loginToken);
    try {
      const response = await CustomAxios({
        APIName: 'logout',
        APIType: 'get',
        UrlQuery: DOMAIN + '/user/logout',
        Token: loginToken,
      });
      setLogoutResult(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   console.log('로그아웃 결과: ', logoutResult);
  // }, [logoutResult]);

  const logoutClick = async () => {
    await logoutAxios().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  const handleLoginModalClick = (e: any) => {
    e.preventDefault();
    onLoginClick();
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

  const userNick: string = sessionStorage.getItem('nickname') || '';
  const userProfileImg: string | null = sessionStorage.getItem('profileImg');

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
            <div className=' w-[2.5em] h-[2.5em] rounded-full grid place-content-center  overflow-hidden bg-[rgba(255,255,255,0.5)]'>
              <img src={userProfileImg || ''} alt='쌜리' className='' />
            </div>
          </div>
          <div className='h-full flex-1 py-[.5em] flex flex-col justify-stretch items-center  text-white'>
            <div className='h-full w-full flex justify-start items-center font-PtdSemiBOld text-[15px]'>
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
          <button
            className={`w-full h-[2.8em] text-center  flex justify-center items-center ${
              hoverModalContent === 3
                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                : ''
            }`}
            onMouseEnter={() => hoverModalMyPage(3)}
            onMouseLeave={() => hoverModalMyPage(0)}
            onClick={logoutClick}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className='z-50'>
        <div className='w-screen h-20 bg-neutral-950 flex flex-row items-center justify-between px-6 z-50'>
          <div className='w-1/6 h-full flex flex-row justify-start items-center'>
            <div className='w-fit h-fit' id='StarButton'>
              <a href='/'>
                <img
                  src={WorldySoftLogo}
                  className='h-[45px]'
                  alt='Worldy Soft Comp'
                />
              </a>
            </div>
          </div>
          <div className='w-3/5 h-full'>
            <ul className='flex flex-row items-center justify-center h-full'>
              {navList.map((item, index) => (
                <li key={index} className='mx-10'>
                  {!checkLoginState && index >= 1 ? (
                    <button>
                      <div
                        id='NavBarButtons-Animation'
                        className=' w-20 text-lg h-10 flex flex-row items-center justify-center text-center text-white font-PtdRegular '
                        onClick={handleLoginModalClick}
                      >
                        {item.name}
                      </div>
                    </button>
                  ) : (
                    <a href={item.path}>
                      <div
                        id='NavBarButtons-Animation'
                        className=' w-20 text-lg h-10 flex flex-row items-center justify-center text-center text-white font-PtdRegular '
                      >
                        {item.name}
                      </div>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-1/6 h-full flex flex-row items-center justify-end'>
            {/* <div className='flex-1 h-full flex flex-row justify-end items-center  outline-white'>
              <button className='w-[2.5em] h-[2.5em]  grid place-items-center outline-red-300'>
                <ImSearch color='white' />
              </button>
              <button className='w-[2.5em] h-[2.5em] ml-[1.5em]  grid place-items-center outline-red-300'>
                <AiOutlineGlobal
                  size='20'
                  color={tempLoginColor ? 'green' : 'white'}
                />
              </button>
            </div> */}
            <div
              className={`${
                checkLoginState ? 'w-fit' : 'w-1/2'
              } h-full flex flex-row justify-center items-center outline-white`}
            >
              {checkLoginState ? (
                AferLoginIconButtonComponent
              ) : (
                <BUTTON_RED
                  fontSize={16}
                  width={80}
                  height={35}
                  rounded={true}
                  // onClick={handleLoginModalClick}
                  onClick={
                    Swal.fire({
                      title: '😉맵 확장 중입니다.😉',
                      icon: 'warning',
                      iconColor: '#FA5B54',
                      // showCancelButton: true,
                      confirmButtonColor: '#FA5B54',
                      // cancelButtonColor: '#999999',
                      confirmButtonText: 'YES',
                      // cancelButtonText: 'NO',
                    }).then((result: any) => {
                      navigate('/')
                    })
                  }
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

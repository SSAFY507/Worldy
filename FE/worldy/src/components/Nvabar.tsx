import React, { useEffect, useState } from 'react';
import LogoWhite from '../assets/images/Logo-white.png';
import WorldySoftLogo from '../assets/images/WorldySoftLogo.png';
import { ImSearch } from 'react-icons/im';
import { AiOutlineGlobal } from 'react-icons/ai';
import LoginModal from './LoginModal';
import ReactDOM from 'react-dom';
import BUTTON_RED from './Button_Red';
import '../styles/NavBarAnimation.css';
import SallyPath from '../assets/images/SallyProfilePic.png';

import {
  addRankInfo,
  loginNickName,
  loginProfileImg,
  loginState,
  myExp,
  myLevel,
  myRank,
  myTier,
} from '../_store/slices/loginSlice';
import { logout } from '../_store/slices/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CustomAxios from '../API/CustomAxios';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useSelect } from '@react-three/drei';
import { useSelector } from 'react-redux';

type NavListType = {
  name: string;
  path: string;
};
type MyRankInfo = {
  rank: number;
  nickName: string;
  profileImg: string;
  tier: string;
  level: number;
  percent: number;
  exp: number;
};

export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  const navigate = useNavigate();

  const getLoginToken: string | null = sessionStorage.getItem('token');

  const [axiosMyRankInfo, setAxiosMyRankInfo] = useState<MyRankInfo>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addRankInfo({
        rank: axiosMyRankInfo?.rank || 1,
        tier: axiosMyRankInfo?.tier || 'Bronze',
        level: axiosMyRankInfo?.level || 1,
        exp: axiosMyRankInfo?.exp || 0,
      })
    );
    console.log('넣는 데이터 : ' + axiosMyRankInfo?.tier);
  }, [axiosMyRankInfo]);

  useEffect(() => {
    getRankInfoList();
  }, []);

  const getRankInfoList = async () => {
    console.log('Session에서의 가져오는 토큰', getLoginToken);
    try {
      const response = await CustomAxios({
        APIName: 'getRankInfoList',
        APIType: 'get',
        UrlQuery: `https://k8a507.p.ssafy.io/api/game/ranking`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      console.log('랭크 리스트 받은 거: ', response);
      setAxiosMyRankInfo(response.myRank);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    //console.log('token이 무엇이냐 ', token);
  };

  const navList: NavListType[] = [
    { name: '홈', path: '/' },
    { name: '게임 정보', path: '/info' },
    // { name: '업데이트', path: '/updates' },
    { name: '세계 탐험', path: '/explore' },
    { name: '월디 게임', path: '/create' },
    { name: '고객 지원', path: '/support' },
  ];

  const checkLoginState = sessionStorage.getItem('isLoggedIn');

  const [logoutResult, setLogoutResult] = useState<any>();

  const logoutAxios = async () => {
    console.log('로그아웃 시 토큰 : ', getLoginToken);
    try {
      const response = await CustomAxios({
        APIName: 'logout',
        APIType: 'get',
        UrlQuery: 'https://k8a507.p.ssafy.io/api/user/logout',
        Token: getLoginToken,
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

  const [clickStateAfterLoginIcon, setClickStateAfterLoginIcon] =
    useState<boolean>(false);

  const handleClickStateAfterLoginIcon = () => {
    setClickStateAfterLoginIcon(!clickStateAfterLoginIcon);
  };

  const userNick: string = sessionStorage.getItem('nickname') || '';
  const userProfileImg: string | null = sessionStorage.getItem('profileImg');

  const [hoverModalContent, setHoverModalContent] = useState<number>(0);

  const hoverModalMyPage = (input: number) => [setHoverModalContent(input)];

  // const levelContent = (): JSX.Element => {
  //   return (
  //     <div className='w-[500px] flex flex-row justify-between items-center'>
  //       <span className='mr-[20px]'>LV.{axiosRankInfoList?.myRank.level}</span>
  //       <div className=' w-full h-[40px]  ml-[20px] flex flex-col justify-between items-start  outline-white'>
  //         <div className='w-fit text-[15px] h-fit flex flex-row justify-center items-center '>
  //           EXP : ({axiosRankInfoList?.myRank.exp}
  //           /100)
  //         </div>
  //         <div className='relative h-[10px] w-[400px] outline outline-[rgba(255,255,255,0.5)] flex flex-row justify-start items-center'>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
  //           <div
  //             className='absolute top-0 left-0 h-[10px] bg-blue-300'
  //             style={{ width: `${axiosRankInfoList?.myRank.exp}%` }}
  //           ></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }; fill={`${hoverAfterLoginIcon ? 'rgb(255,77,69)' : 'white'}`}

  const navProfileImg = useSelector(loginProfileImg);
  const navNickname =
    useSelector(loginNickName) || sessionStorage.getItem('nickname');
  const navRank = useSelector(myRank);
  const navTier = useSelector(myTier);
  const navLevel = useSelector(myLevel);
  const navExp = useSelector(myExp);
  // const navExp = 37;

  const AferLoginIconButtonComponent: React.ReactNode = (
    <div className='relative  outline-white w-fit h-fit flex flex-row justify-between items-center'>
      <div className='w-fit h-[65px] bg-[rgba(255,255,255,0.3)] rounded-full flex flex-row justify-between items-center px-[20px]'>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden grid place-content-center mr-[10px]'>
          <img src={navProfileImg} alt='프로필 이미지' />
        </div>
        <div className='w-[220px] h-full py-[3px] outline-white flex flex-col justify-between items-start px-[10px]'>
          <div className='w-[200px] h-[30px] flex flex-row justify-between items-center '>
            <span className='font-PtdMedium text-[18px] text-white'>
              {navNickname}
            </span>
            <span className='font-PtdLight text-[18px] text-white'>
              LV.{navLevel}
            </span>
          </div>
          <div className='w-[200px] h-[20px] realtive'>
            <div className='relative h-[10px] w-[200px] outline outline-[rgba(255,255,255,0.5)] flex flex-row justify-start items-center'>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
              <div
                className='absolute top-0 left-0 h-[10px] bg-blue-300'
                style={{ width: `${navExp}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={` w-[2.5em] h-[2.5em]  ml-[1.5em] mr-[2em]  rounded-3xl relative `}
        onMouseEnter={() => handleHoverAfterLoginIcon(true)}
        onMouseLeave={() => handleHoverAfterLoginIcon(false)}
        onClick={handleClickStateAfterLoginIcon}
      >
        <div>
          <BsPlusCircleFill
            color={'rgb(255,77,69)'}
            size={30}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${
              clickStateAfterLoginIcon
                ? 'opacity-100 rotate-[720deg]'
                : 'opacity-0 rotate-0'
            }`}
          />
        </div>
        <div>
          <BsPlusCircle
            color={'white'}
            size={30}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${
              !clickStateAfterLoginIcon
                ? 'opacity-100 rotate-0'
                : 'opacity-0 rotate-[720deg]'
            }`}
          />
        </div>
      </button>
      <div
        className={`w-[13em] h-fit bg-[rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-stretch items-center absolute outline outline-[.05em] outline-[rgba(255,255,255,0.2)] rounded-xl -bottom-[2em] right-[1em]  transition-all duration-300 ease-out ${
          clickStateAfterLoginIcon
            ? 'z-0 opacity-100 transform translate-y-[100%]'
            : '-z-20 opacity-0 transform translate-y-0'
        }`}
      >
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

import * as React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import BUTTON_RED from '../components/Button_Red';
import pathBI from '../assets/images/MainPageBackground.png';
import pathLC from '../assets/images/LogoColored.png';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import { CSSTransition } from 'react-transition-group';
import '../styles/CSSTransitionStyles.css';
import Footer from '../components/Footer';
import CustomAxios from '../API/CustomAxios';
import { useDispatch } from 'react-redux';
import { addRankInfo } from '../_store/slices/loginSlice';
import LoaderLinear from '../components/Loaders/LoaderLinear';

type MyRankInfo = {
  rank: number;
  nickName: string;
  profileImg: string;
  tier: string;
  level: number;
  percent: number;
  exp: number;
};
function IntroPage({ onLoginClick }: { onLoginClick: () => void }) {
  const tempClick = () => {
    onLoginClick();
  };

  const [moreInfo, setMoreInfo] = useState<boolean>(true);
  const closeMoreInfo = () => {
    setMoreInfo(false);
  };

  // const [axiosMyRankInfo, setAxiosMyRankInfo] = useState<MyRankInfo>();
  // const getLoginToken: string | null = sessionStorage.getItem('token');

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     addRankInfo({
  //       rank: axiosMyRankInfo?.rank || 1,
  //       tier: axiosMyRankInfo?.tier || 'Bronze',
  //       level: axiosMyRankInfo?.level || 1,
  //       exp: axiosMyRankInfo?.exp || 0,
  //     })
  //   );
  //   //console.log('경험치 : ' + axiosMyRankInfo?.exp);
  // }, []);

  // useEffect(() => {
  //   getRankInfoList();
  // }, []);

  // const getRankInfoList = async () => {
  //   //console.log('Session에서의 가져오는 토큰', getLoginToken);
  //   try {
  //     const response = await CustomAxios({
  //       APIName: 'getRankInfoList',
  //       APIType: 'get',
  //       UrlQuery: DOMAIN + `/game/ranking`,
  //       Token: getLoginToken,
  //     });
  //     //console.log('닉네임 중복 체크 성공');
  //     //console.log('랭크 리스트 받은 거: ', response);
  //     setAxiosMyRankInfo(response.myRank);
  //   } catch (error) {
  //     //console.error('Error fetching data:', error);
  //   }
  //   //console.log('token이 무엇이냐 ', token);
  // };

  const myImageList = {
    BackgroundImage: pathBI,
    LogoColored: pathLC,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 500);
    }
  }, [isLoaded]);

  const [popupFirst, setPopupFirst] = useState<boolean>(false);
  const [popupSecond, setPopupSecond] = useState<boolean>(false);
  const [popupSecondBr, setPopupSecondBr] = useState<boolean>(false);
  const [popupThird, setPopupThird] = useState<boolean>(false);

  const [popupGreyInfo, setPopupGreyInfo] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setPopupFirst(true), 1500);
    setTimeout(() => setPopupSecond(true), 2500);
    setTimeout(() => setPopupSecondBr(true), 3000);
    setTimeout(() => setPopupThird(true), 3800);
    setTimeout(() => setPopupGreyInfo(true), 3800);
    //console.log('헉');
  }, []);

  return (
    <>
      {loadedAll ? (
        <div
          // style={{ backgroundColor: 'rgba(27, 27, 27, 0.5)' }}
          className='h-full flex flex-col justify-center items-center relative'
        >
          {/* <Footer /> */}
          {moreInfo && (
            <CSSTransition
              in={popupGreyInfo}
              timeout={1200}
              classNames='CSSTransition-IntroPage-GreyPopup'
              unmountOnExit
            >
              <div
                className='z-0 absolute top-0 left-0 h-14 w-screen flex flex-row justify-between items-center text-base'
                style={{ backgroundColor: '#333336' }}
              >
                <div className='w-1/4'></div>
                <div>
                  <span className='text-white font-PtdLight'>
                    Worldy Games 에 오신 것을 환영합니다. 지금 당장 모험을
                    떠나보세요.
                  </span>
                  {/* <a
                    href='/mypage'
                    className='text-blue-500 mx-4 underline underline-offset-4'
                  >
                    * 더 알아보기
                  </a> */}
                  <button
                    className='text-blue-500 mx-4 underline underline-offset-4'
                    onClick={closeMoreInfo}
                  >
                    * 그만 보기
                  </button>
                </div>
                <div className='flex flex-row justify-end items-center w-1/4 px-10'>
                  <button onClick={closeMoreInfo}>
                    <svg
                      stroke='currentColor'
                      fill='rgba(148, 148, 152, 1)'
                      strokeWidth='0'
                      viewBox='0 0 1024 1024'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
                    </svg>
                  </button>
                </div>
              </div>
            </CSSTransition>
          )}

          <div className='h-2/5 w-1/2 flex flex-col justify-center items-center mb-28'>
            <div className='w-full h-1/3 flex flex-row justify-center items-center'>
              <CSSTransition
                in={popupFirst}
                timeout={1200}
                className='h-full w-fit'
                classNames='CSSTransition-IntroPage-Popup'
                unmountOnExit
              >
                <img
                  className='h-full w-fit'
                  src={loadedImages['LogoColored']}
                  alt='WORLDY GAME'
                />
              </CSSTransition>
            </div>
            <div className='w-fit min-w-[700px] h-[100px] py-5 flex flex-row justify-between items-center text-7xl '>
              <div className='font-PtdBold text-white w-fit '>
                <CSSTransition
                  in={popupSecond}
                  timeout={1200}
                  classNames='CSSTransition-IntroPage-Popup'
                  unmountOnExit
                >
                  <span className='font-PtdBold text-white'>모여라, </span>
                </CSSTransition>
              </div>
              <div className='font-PtdBold text-white w-fit '>
                <CSSTransition
                  in={popupSecondBr}
                  timeout={1200}
                  classNames='CSSTransition-IntroPage-Popup'
                  unmountOnExit
                >
                  <span className='font-PtdBold text-white'>
                    세계를 탐험하라!
                  </span>
                </CSSTransition>
              </div>
            </div>
            <div className='w-full flex-1 flex flex-row justify-center items-start pt-7'>
              <CSSTransition
                in={popupThird}
                timeout={1200}
                classNames='CSSTransition-IntroPage-Popup'
                unmountOnExit
              >
                <BUTTON_RED
                  text='무료 플레이하기'
                  rounded={true}
                  fontSize={20}
                  width={200}
                  height={50}
                  onClick={tempClick}
                />
              </CSSTransition>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full bg-white pt-20'>
          <LoaderLinear />
        </div>
      )}
    </>
  );
}

export default IntroPage;

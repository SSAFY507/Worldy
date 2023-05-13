import * as React from 'react';
import { useState, useEffect } from 'react';
import pathGC from '../assets/images/GameController.png';
import pathLL from '../assets/images/LoginLogo.png';
import pathKLB from '../assets/images/KakaoLoginButton.png';
import LoaderPyramid from './Loaders/LoaderPyramid';
import KakaoLogin from './KakaoLogin';
import axios from 'axios';
import { access } from 'fs';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import PersonalAccept from './PersonalAccept';

import { useDispatch, useSelector } from 'react-redux';
import { addToken, loginState } from '../_store/slices/loginSlice';
import { login, logout } from '../_store/slices/loginSlice';
import CustomAxios from '../API/CustomAxios';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PointerOutProps = {
  onClose: () => void;
};
export default function LoginModal({ onClose }: PointerOutProps) {
  const myImageList = {
    GameController: pathGC,
    LoginLogo: pathLL,
    KakaoLoginButton: pathKLB,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      });
    }
  }, [isLoaded]);

  const firstLogin: boolean = true;

  ////////////////////카카오 로그인 버튼 관련

  const checkLoginState = sessionStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();

  const [submitKakaoTokenResult, setSubmitKakaoTokenResult] = useState<any>();

  //카카오 로그인 성공 시 데이터 확인 및 분할

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const [showPersonalAccept, setShowPersonalAccept] = useState<boolean>(false);
  const handleShowPersonalAccept = () => {
    setShowPersonalAccept(!showPersonalAccept);
  };

  return (
    <div
      // onClick={onClose}
      className='fixed top-4 left-0 w-full h-full bg-behindModalBackground z-10 flex flex-row justify-center items-center'
    >
      {showPersonalAccept && (
        <PersonalAccept closePA={() => setShowPersonalAccept(false)} />
      )}
      <div
        id='LoginWholeModalFrame'
        className='bg-white pt-[10px] px-[10px] rounded-xl w-[480px] h-2/3 flex flex-col z-20'
      >
        {loadedAll ? (
          <div>
            <div id='XbuttonFrame' className='flex flex-row justify-end'>
              <button onClick={onClose}>
                <div>
                  <svg
                    stroke='currentColor'
                    fill='black'
                    strokeWidth='0'
                    viewBox='0 0 1024 1024'
                    height='1.9em'
                    width='1.9em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className='h-full my-4 flex flex-col justify-between px-12'>
              <div className=' w-full h-24 flex flex-row justify-center items-center px-[10px] '>
                <div className=' w-[90px] h-[90px] '>
                  <img
                    src={loadedImages['GameController']}
                    alt='컨트롤 아이콘'
                  />
                </div>
                <div className='w-[px]'></div>

                <div className='w-fit h-full flex flex-row justify-start items-center text-[32px] font-PtdBold px-[20px] '>
                  월디에 오신 것을
                  <br /> 환영합니다.
                </div>
              </div>
              <div className=' w-full h-fit'>
                <img src={loadedImages['LoginLogo']} alt='로그인 로고' />
              </div>
              <div className=' w-full h-fit flex justify-center items-center mt-[15px]'>
                <KakaoLogin />
              </div>
              <div className=' w-full h-20 flex flex-col items-center justify-between py-4 font-PtdMedium text-base'>
                <div className='flex flex-row justify-center items-center text-[15px]'>
                  저희 Worldy는 회원님의 정보를 다음과 같이 처리합니다.
                </div>
                <button
                  onClick={handleShowPersonalAccept}
                  className='underline underline-offset-2 decoration-2 text-[13px] mt-[2px] text-blue-400'
                >
                  개인 정보 처리방침
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <LoaderPyramid text='첫 인사 생각 중...' />
          </div>
        )}
      </div>
      {showErrorModal && (
        <div className='z-30 bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0 flex justify-center items-center fixed'>
          <div className='bg-white rounded-[10px] w-[80%] max-w-[400px] h-fit min-h-[200px] '>
            <div className='flex justify-end items-start h-1/5 px-[10px] pt-[10px]'>
              <button
                onClick={closeErrorModal}
                className='h-fit w-fit rounded-[999px]'
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 1024 1024'
                  height='1.8em'
                  width='1.8em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'></path>
                </svg>
              </button>
            </div>
            <div className='h-3/5 mt-[20px] mb-[30px] flex justify-center items-start text-center font-PtdRegular text-[22px] '>
              요청하신 작업을 수행하지 못했습니다.
              <br />
              <br />
              잠시 후 다시 시도해주세요.
            </div>
            <div className='h-[60px] flex justify-center items-center border-t-[rgba(0,0,0,0.3)] border-t-[1px] border-solid font-PtdRegular text-[18px]'>
              <button className='h-full w-full' onClick={closeErrorModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

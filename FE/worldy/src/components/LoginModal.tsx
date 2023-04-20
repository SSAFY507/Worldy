import * as React from 'react';
import { useState, useEffect } from 'react';
import GameController from '../assets/images/GameController.png';
import LoginLogo from '../assets/images/LoginLogo.png';
import KakaoLoginButton from '../assets/images/KakaoLoginButton.png';
import LoaderPyramid from './LoaderPyramid';

type PointerOutProps = {
  onClose: () => void;
};
export default function LoginModal({ onClose }: PointerOutProps) {
  const [loadedLoginLogo, setLoadedLoginLogo] = useState<boolean>(false);
  const [loadedGameController, setLoadedGameController] =
    useState<boolean>(false);

  useEffect(() => {
    const LoginLogoImg = new Image();
    const GameControllerImg = new Image();
    LoginLogoImg.src = LoginLogo;
    GameControllerImg.src = GameController;
    LoginLogoImg.onload = () => {
      setTimeout(() => {
        setLoadedLoginLogo(true);
      }, 300);
      console.log('LoginLogo 로드');
    };
    GameControllerImg.onload = () => {
      setTimeout(() => {
        setLoadedGameController(true);
      }, 300);
      console.log('GameController 로드');
    };
  }, [LoginLogo, GameController]);

  return (
    <div
      // onClick={onClose}
      className='fixed top-4 left-0 w-full h-full bg-behindModalBackground z-10 flex flex-row justify-center items-center'
    >
      <div
        id='LoginWholeModalFrame'
        className='bg-white py-5 px-10 rounded-xl w-1/3 h-3/4 flex flex-col z-20'
        onClick={undefined}
      >
        {loadedLoginLogo && loadedGameController ? (
          <div>
            <div id='XbuttonFrame' className='flex flex-row justify-end'>
              <button onClick={onClose}>
                <div>
                  <svg
                    stroke='currentColor'
                    fill='black'
                    stroke-width='0'
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
              <div className=' w-full h-24 flex flex-row justify-between px-10'>
                <div className=' bg-gray-50 w-32'>
                  <img src={GameController} />
                </div>
                <div className='w-full h-full flex flex-row justify-start items-center text-3xl font-PtdBold px-10'>
                  월디에 오신 것을
                  <br /> 환영합니다.
                </div>
              </div>
              <div className=' w-full h-fit'>
                <img src={LoginLogo} />
              </div>
              <div className=' w-full h-fit'>
                <img src={KakaoLoginButton} />
              </div>
              <div className=' w-full h-20 flex flex-col items-center justify-between py-4 font-PtdMedium text-base'>
                <div className='flex flex-row justify-center items-center'>
                  <div className='mr-2'>아직 WORLDY 회원이 아니신가요?</div>
                  <div className='text-blue-400 underline underline-offset-2 decoration-2'>
                    <a href='/'>계정 생성</a>
                  </div>
                </div>
                <div className='underline underline-offset-2 decoration-2'>
                  <a href='/'>서비스 이용약관</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <LoaderPyramid />
          </div>
        )}
      </div>
    </div>
  );
}

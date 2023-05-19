import * as THREE from 'three';
import * as React from 'react';
import { useState, useEffect } from 'react';

import WorldMap from '../components/Explore/WorldMap';
import SHLoader from '../components/Loaders/SHLoader';
import LoaderCompass from '../components/Loaders/LoaderCompass';
import SallyTotu from '../assets/images/SallyTuto.png';

const Explore = () => {
  const [doneLoader, setDoneLoader] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setDoneLoader(true);
    }, 3000);
  }, []);

  const [sallyState, setSallyState] = useState<boolean>(true);

  const SallyToturial = (): JSX.Element => {
    return (
      <div
        className={`absolute flex flex-col justify-end items-center w-screen h-full bg-[rgba(0,0,0,0.5)] z-50 ${
          doneLoader ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-screen h-[800px] relative pl-[100px] outline-white flex flex-row justify-start items-end'>
          <div className='w-screen absolute bottom-0 left-0 h-[550px] bg-[rgba(0,0,0,0.5)] flex flex-row justify-start items-start pt-[60px] pl-[580px]'>
            <div className='w-full h-[250px] flex flex-row justify-start items-start z-30'>
              <div className='w-fit mr-[70px] h-[250px] flex flex-col justify-between items-start text-[rgba(220,220,220,1)] font-PtdRegular rounded-xl  outline-[rgba(255,255,255,0.8)] outline-[5px] '>
                <span className='font-PtdExtraLight text-[#F9C53A] text-[20px]'>
                  Sally
                </span>
                <span className='text-[40px] '>
                  안녕? 세계 탐험으로 온 걸 환영해!
                </span>
                <span className='text-[28px] leading-[34px]'>
                  원하는 대륙을 두 번 클릭한 다음,
                  <br />
                  목적지를 한번 더 클릭해서 나라에 들어갈 수 있어.
                </span>
                <span className='text-[35px] text-white '>
                  자, 네가 가고싶은 나라는 어디니?
                </span>
              </div>
              <div className='h-full w-[250px]  outline-red-300 flex flex-col justify-end items-center'>
                <button
                  className='w-[200px] h-[50px] rounded-full text-[20px] bg-[#73ae73] hover:bg-[#73d673] text-white'
                  onClick={() => setSallyState(false)}
                >
                  출발하기
                </button>
              </div>
            </div>
          </div>
          <img
            src={SallyTotu}
            alt='Sally Tutorial'
            className='h-[900px] translate-y-[100px]'
            style={{ transform: 'rotatey(180deg)' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className='relative'>
      {!doneLoader && (
        <div className='w-screen h-screen bg-white grid place-content-center pb-[80px]'>
          <SHLoader text='로더' />
        </div>
      )}
      {sallyState && <SallyToturial />}
      <div className={`${sallyState ? 'blur-sm' : ''}`}>
        <WorldMap />
      </div>
    </div>
  );
};

export default Explore;

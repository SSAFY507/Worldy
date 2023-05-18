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
        className={`absolute grid place-content-center w-screen h-full bg-[rgba(0,0,0,0.5)] z-50 ${
          doneLoader ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-[1500px] h-[800px] outline-white flex flex-row justify-end items-end'>
          <div className='w-[1020px] h-full  flex flex-col justify-start items-end'>
            <div className='w-full h-[400px] px-[30px] py-[40px] text-[rgba(180,180,180,1)] font-PtdMedium bg-[rgba(0,0,0,0.5)] rounded-xl outline outline-[rgba(255,255,255,0.8)] outline-[5px] flex flex-col justify-between items-start'>
              <span className='text-[50px] text-[rgba(220,220,220,1)]'>
                안녕? 세계 탐험으로 온 걸 환영해!
              </span>
              <span className='text-[30px] leading-[38px]'>
                이곳에서는 각 나라마다 다양한 퀴즈를 만나볼 뿐만 아니라,
                <br />그 나라들만의 소식과 문화, 그리고 역사를 알 수 있어.
              </span>
              <span className='text-[32px] text-white leading-[40px]'>
                원하는 대륙을 두 번 클릭한 다음
                <br />
                목적지를 한번 더 클릭해서 나라에 들어갈 수 있지.
              </span>
              <span className='text-[40px] '>
                자, 네가 가고싶은 나라는 어디니?
              </span>
            </div>
            <div className='w-full h-[100px]  outline-red-300 grid place-content-center'>
              <button
                className='w-[200px] h-[50px] rounded-full text-[20px] bg-[#73ae73] hover:bg-[#73d673] text-white'
                onClick={() => setSallyState(false)}
              >
                출발하기
              </button>
            </div>
          </div>
          <img src={SallyTotu} alt='Sally Tutorial' className='w-[240px]' />
        </div>
      </div>
    );
  };

  return (
    <div className='relative'>
      {!doneLoader && (
        <div className='w-screen h-screen bg-gray-800 grid place-content-center pb-[80px]'>
          <LoaderCompass />
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

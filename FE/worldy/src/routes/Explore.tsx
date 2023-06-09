import * as THREE from 'three';
import * as React from 'react';
import { useState, useEffect } from 'react';

import WorldMap from '../components/Explore/WorldMap';
import SHLoader from '../components/Loaders/SHLoader';
import LoaderCompass from '../components/Loaders/LoaderCompass';
import SallyTotu from '../assets/images/SallyTuto.png';
import { useDispatch } from 'react-redux';
import { BsBoxArrowUpRight } from 'react-icons/bs';
// import { addSallyMet } from '../_store/slices/loginSlice';

const Explore = () => {
  const [doneLoader, setDoneLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // const met = sessionStorage.getItem('sally');
    // if (met === 'already') setSallyState(false);
    // else setSallyState(true);
    setTimeout(() => {
      setDoneLoader(true);
    }, 3000);
  }, []);

  const [sallyState, setSallyState] = useState<boolean>(true);

  const SallyToturial = (): JSX.Element => {
    return (
      <div
        className={`absolute flex flex-col justify-end items-center w-screen h-full bg-[rgba(100,100,100,0)] z-50 ${
          doneLoader ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-screen h-[800px] relative pl-[100px] outline-white flex flex-row justify-start items-end'>
          <div className='w-screen absolute bottom-0 left-0 h-[550px] bg-[rgba(0,0,0,0.8)] flex flex-row justify-start items-start pt-[60px] pl-[580px]'>
            <div className='w-full h-[250px] flex flex-row justify-start items-start z-30'>
              <div className='w-fit mr-[70px] h-[250px] flex flex-col justify-between items-start text-[rgba(220,220,220,1)] font-PtdExtraLight rounded-xl  outline-[rgba(255,255,255,0.8)] outline-[5px] '>
                <span className='font-PtdExtraLight text-[#F9C53A] text-[20px]'>
                  Sally
                </span>
                <span className='text-[25px]  text-white'>
                  안녕? 세계 탐험으로 온 걸 환영해!
                </span>
                <span className='text-[25px]  text-white leading-[34px] '>
                  원하는 대륙을{' '}
                  <span className='underline-offset-2 underline'>
                    더블 클릭
                  </span>
                  한 다음,
                  <br />
                  목적지를{' '}
                  <span className='underline-offset-2 underline'>
                    한 번 더 클릭
                  </span>
                  해서 각 나라에 들어갈 수 있어.
                </span>
                <span className='text-[25px] text-white '>
                  자, 네가 가고싶은 나라는 어디니?
                </span>
              </div>
              <div className='h-full w-[250px]  outline-red-300 flex flex-col justify-end items-center'>
                <button
                  className='w-[200px] h-[50px] rounded-md text-[20px] bg-buttonRed hover:bg-[rgba(255,18,5,1)] text-white'
                  onClick={() => {
                    setSallyState(false);
                    // dispatch(addSallyMet('already'));
                  }}
                >
                  <span className='flex flex-row justify-center items-center'>
                    출발하기
                    <BsBoxArrowUpRight size={16} className='ml-[20px]' />
                  </span>
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
      <div className={`${sallyState ? '' : ''}`}>
        <WorldMap />
      </div>
    </div>
  );
};

export default Explore;

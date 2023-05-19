import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import { SiPowerapps } from 'react-icons/si';
import { RiVipCrownFill } from 'react-icons/ri';
import pathLC from '../assets/images/LogoColored.png';

export default function GameResult() {
  const location = useLocation();
  const gameResult = location.state;

  const setTierColor = (input: string): string => {
    if (input === 'Platinum') return '#86FFF8';
    else if (input === 'Gold') return '#FFEE95';
    else if (input === 'Silver') return '#E1FBFF';
    else return '#EED4BB';
  };

  const userNickname: string = sessionStorage.getItem('nickname') || '';

  return (
    <> 
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover ">
      <div className='w-[800px] h-[600px] bg-white/50 rounded-[20px] mt-[50px] flex flex-col items-center'>
        <img
          className='w-[270px] object-cover mt-[60px]'
          src={pathLC}
          alt='WORLDY GAME'
        />
        <div>
          <div
            className={
              'relative flex flex-row justify-between items-center mt-[25px] mb-[7px] bg-[rgba(0,0,0,0)] px-[10px] rounded-md w-[600px] h-[45px] font-PtdSemiBold text-white text-[16px] '
            }
          >
            <div className='w-[50px] h-full mr-[10px] grid place-content-center'>
              <span className='grid place-content-center'>Rank</span>
            </div>
            <div className='w-[180px] h-full mr-[10px] flex flex-row justify-center items-center '>
              <span className=''>Player</span>
            </div>
            <div className='flex-1' />
            <div className='w-[80px] h-full mr-[20px] grid place-content-center '>
              <span className=''>Amount</span>
            </div>
            <div className='w-[50px] h-full  grid place-content-center '>
              <span className=''>Tier</span>
            </div>
          </div>
          {location.state?.rankPlayer.map((item: any, key: any) => (
            <div
              key={key}
              className={`rangking relative flex flex-row justify-between items-center mb-[9px] bg-[rgba(0,0,0,0)] hover:bg-[rgba(180,180,180,0.3)] px-[10px] rounded-md ${item.nickName === userNickname
                ? 'gameglowing z-10  w-[600px] h-[50px] my-[15px] -translate-x-[5px]'
                : 'w-[600px] h-[45px]'
                }`}
            >
              <div className='w-[50px] h-[50px] mr-[20px] grid place-content-center'>
                <span className='font-PtdBold text-[25px] text-white'>
                  {key + 1}
                </span>
              </div>
              <div className='flex-1 h-fit  outline-white flex justify-between items-center'>
                <div className='w-[25px] h-[25px]  outline-[rgba(220,220,220,0.3)] rounded-full overflow-hidden grid place-content-center  mr-[20px]'>
                  <img src={item.profileImg} alt='프로필 이미지' />
                </div>
                <div className='w-[150px] h-fit  outline-red-300 flex flex-row justify-start items-center '>
                  <span className='font-PtdRegular text-white text-[20px] truncate '>
                    {item.nickName}
                  </span>
                </div>
                <div className='w-[30px] flex-1 flex-row flex justify-start items-center '>
                  <RiVipCrownFill
                    className={`${key === 0
                      ? 'text-[#D1C68F]'
                      : key === 1
                        ? 'text-[#a4a4a4]'
                        : key === 2
                          ? 'text-[#837D63]'
                          : 'opacity-0'
                      }
                        shadow-lg
                        w-[15px] h-[15px]
                        `}
                  />
                </div>
                <div className='w-[150px] h-fit  outline-red-300 flex flex-row justify-start items-center '>
                  <span className='font-PtdRegular text-white text-[15px] truncate '>
                    {key === 0 ? '+ 40EXP' : key === 1 ? '+ 30EXP' : key === 0 ? '+ 25EXP' : '+ 20EXP'}
                  </span>
                </div>
              </div>
              <div className='flex flex-row  outline-white justify-between items-center w-[140px] h-fit'>
                <div className='w-[100px] flex-2 grid place-ontent-right mr-[20px]'>
                  <span className='font-PtdLight text-[15px] text-white'>
                    {item.assets} 만원
                  </span>
                </div>
                <div className='w-fit h-2/3  outline-white rounded-[100px] flex flex-row justify-center items-center px-[10px]'>
                  <SiPowerapps size={22} color={setTierColor(item.tier)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </>
  );
}

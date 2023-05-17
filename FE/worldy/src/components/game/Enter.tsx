import * as React from 'react';
import { useState, useEffect } from 'react';

import { SiPowerapps } from 'react-icons/si';

export default function Enter() {

  //const userTier = axiosRankInfoList?.myRank.tier || '';
  const userTier = 'Bronze'

  const setTierColor = (input: string): string => {
    if (input === 'Platinum') return '#86FFF8';
    else if (input === 'Gold') return '#FFEE95';
    else if (input === 'Silver') return '#E1FBFF';
    else return '#EED4BB';
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover bg">     
        <div className='text-[35px] text-white font-PtdSemiBOld flex flex-col justify-center items-center'>
          <div>플레이어가 입장 중 입니다.</div>
          <div className='mt-[15px]'>잠시만 기다려주세요.</div>
          <img
              className='mt-[20px] w-[70px] object-cover'
              src={'/game/loading.gif'}
              alt='WORLDY GAME'
          />
        </div>
        <div className='w-[960px] h-[610px] bg-white/50 rounded-[20px] mt-[50px]'>
          <div className='text-[40px] text-white font-PtdSemiBOld flex flex-col justify-center items-center mt-[75px]'>
            <div className='flex flex-row justify-between items-center w-[800px] '>
              <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>
                  <div className='flex flex-row font-PtdLight w-[280px] justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div>플레이어</div>
                    <div>{userTier}</div>
                  </div>
                  <div className='flex flex-row w-[370px] mt-[5px] items-center text-[20px] text-black text-[32px]'>
                    <img
                        className='ml-[42px] w-[50px] object-cover rounded-[50px]'
                        src={'http://k.kakaocdn.net/dn/ccm9k3/btr32vaK5pj/lCrukBd6M1gZtN05DbBHYk/img_640x640.jpg'}
                        alt='Profile'
                    />
                    <div className='ml-[20px]'>도리</div>
                  <SiPowerapps
                    size={32}
                    color={setTierColor(userTier)}
                    className='ml-[120px]'
                  />
                  </div>
                  <div className=" border-[1px] w-[300px] border-[#E3E3E3] border-solid mt-[15px]"></div>
                  <div className='flex flex-row w-[280px] mt-[10px] font-PtdLight justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div className='ml-[10px]'>MMR</div>
                    <div className=''>현재 레벨</div>
                  </div>
                  <div className='flex flex-row w-[280px] mt-[10px] justify-between items-center text-black text-[25px]'>    
                    <div className=''>2000</div>
                    <div className=''>12<span className='text-[15px]'>LV</span></div>
                  </div>
              
              </div>
              <div className='w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>


              </div>
            </div>
            <div className='flex flex-row justify-between items-center w-[800px] mt-[60px] '>
              <div className='w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'></div>
              <div className='w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

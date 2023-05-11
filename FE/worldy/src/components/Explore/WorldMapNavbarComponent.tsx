import * as React from 'react';

import { useEffect, useState } from 'react';

import { BsExclamationCircle } from 'react-icons/bs';
import Cloud from '../../assets/images/Cloud.png';
import ExchangeRateIcon from '../../assets/images/ExchangeRateIcon.png';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Moon from '../../assets/images/Moon.png';
import logoColoredBlue from '../../assets/images/LogoColoredBlue.png';

export default function WorldMapNavbarComponent() {
  const list = {
    country: '미국',
    countryEng: 'United States',
    titlecontent: '미국의 역사를 확인해주세요.',
  };

  const menuFunc = () => {
    console.log('메뉴');
  };

  const menuList = [
    { title: '메뉴1', menuClick: menuFunc() },
    { title: '메뉴2', menuClick: menuFunc() },
    { title: '메뉴3', menuClick: menuFunc() },
    { title: '메뉴4', menuClick: menuFunc() },
  ];

  const infoList = {
    time: 18,
    weather: '흐림',
    temper: 18,
    amountvia: 0.76,
    pref: '미국 달러',
  };

  const [clickedLeftMenu, setClickedLeftMenu] = useState<boolean>(false);

  const [timeLineString, setTimeLineString] = useState<string>('');
  const [timeAPM, setTimeAPM] = useState<string>('');

  useEffect(() => {
    setTimeLineString(
      infoList.time < 11
        ? '아침'
        : infoList.time < 17
        ? '오후'
        : infoList.time < 20
        ? '저녁'
        : '밤'
    );
    setTimeAPM(
      infoList.time === 12
        ? '12PM'
        : infoList.time === 24
        ? '0AM'
        : infoList.time > 12
        ? `${infoList.time - 12}PM`
        : `${infoList.time}AM`
    );
  });

  const [doDDiyong, setDoDDiyong] = useState<boolean>(false);

  return (
    <div className='relative h-20 w-full bg-[#161617] flex flex-row justify-between px-[30px]'>
      {/* <button
        className={`z-10 absolute top-[120px] bg-[rgba(0,0,0,0.8)] h-[300px] w-[230px] rounded-r-3xl transition-all duration-1000 ease-in ${
          clickedLeftMenu ? 'left-0' : '-left-[190px]'
        }
        flex flex-row justify-between items-center`}
        onClick={() => setClickedLeftMenu((prev) => !prev)}
      >
        <div className='mr-[10px] bg-[rgba(0,0,0,0.5)] outline-black h-[280px] w-full flex flex-col justify-stretch items-start'>
          {menuList.map((item, index) => (
            <button
              key={index}
              className={`w-full bg-[rgba(220,220,220,0.2)] hover:bg-[rgba(255,255,255,0.4)] text-gray-300 hover:text-white ${
                index !== 0
                  ? 'border-0 border-t-[2px] border-[rgba(240,240,240,0.7)] border-solid'
                  : ''
              } 
              grid place-content-center`}
              style={{ height: `${280 / menuList.length}px` }}
              onClick={() => item.menuClick}
            >
              <span className='font-PtdMedium text-[30px]'>{item.title}</span>
            </button>
          ))}
        </div>
        <div className='w-[30px] h-full  mx-[5px] py-[30px] flex flex-col justify-start items-center font-PtdExtraBold text-[20px] text-white'>
          <span className='text-[18px]'>M</span>
          <span className='text-[23px]'>E</span>
          <span>N</span>
          <span>U</span>
        </div>
      </button> */}
      <div className='relative h-full w-[20%]  outline-white flex flex-row justify-start items-center'>
        <button>
          <IoMdArrowRoundBack size={30} color={'#D2D2D2'} />
        </button>
        <div className='absolute top-[130px] w-fit h-fit flex flex-col justify-start items-start  ml-[30px] pl-[20px]'>
          {/* border-0 border-l-[4px] border-white border-solid */}
          {/* <span
            className='text-[50px] text-white font-PtdExtraBold'
            onMouseEnter={() => setDoDDiyong(true)}
            onMouseLeave={() => setDoDDiyong(false)}
          >
            {list.country}
          </span> */}
          {/* <span className='text-[40px] mt-[2px] text-[rgba(235,235,235,1)] font-PtdExtraLight'>
            {list.countryEng}
          </span> */}
        </div>
      </div>
      {/* <div className='h-[80px] w-[80%]  outline-white overflow-hidden'>
        <div
          className='h-full w-full flex flex-row justify-center items-center transition-all duration-500 ease-out '
          style={{ marginTop: doDDiyong ? '0px' : '60px' }}
        >
          <BsExclamationCircle
            color={'white'}
            size={20}
            className='mr-[10px]'
          />
          <span className=' text-[22px] font-PtdRegular text-white'>
            {list.titlecontent}
          </span>
        </div>
      </div> */}
      {/* <div className='relative h-full w-[20%]  outline-white flex flex-row justify-end items-center'>
        <img src={logoColoredBlue} alt='colored logo' className='w-[100px]' />
        <div className='absolute top-[80px] -right-[30px] w-[400px] h-[20px]  bg-[#65ADFF]' />

        <div className='absolute top-[100px] -right-[30px] w-[400px] h-[280px] p-[40px] bg-[#65ADFF]  outline-white flex flex-col justify-between items-center'>
          <div
            className='w-[300px] h-[50px] px-[20px] rounded-full shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center'
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 60%,  rgba(255, 255, 255, 0.2) 100%)',
            }}
          >
            <div className='w-[40px] h-[40px] mr-[20px]  outline-white grid place-content-center'>
              <img src={Moon} alt='시간대 아이콘' className='w-[30px]' />
            </div>
            <div className='w-[60px] h-[40px] ml-[20px] outline-black flex flex-row justify-start items-center'>
              <span className='text-[#414141] font-PtdBold text-[22px]'>
                {timeLineString}
              </span>
            </div>
            <div className='flex-1 h-[40px]  outline-white flex flex-row justify-center items-center pr-[20px]'>
              <span className='text-[#5c5c5c] font-PtdLight text-[22px]'>
                {timeAPM}
              </span>
            </div>
          </div>
          <div
            className='w-[300px] h-[50px] px-[20px]  rounded-full shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center'
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 60%,  rgba(255, 255, 255, 0.2) 100%)',
            }}
          >
            <div className='w-[40px] h-[40px] mr-[20px]  outline-white grid place-content-center'>
              <img src={Cloud} alt='날씨 아이콘' className='w-[30px]' />
            </div>
            <div className='w-[60px] h-[40px] ml-[20px]  outline-black flex flex-row justify-start items-center'>
              <span className='text-[#414141] font-PtdBold text-[22px]'>
                {infoList.weather}
              </span>
            </div>
            <div className='flex-1 h-[40px]  outline-white flex flex-row justify-center items-center pr-[20px]'>
              <span className='text-[#5c5c5c] font-PtdLight text-[22px]'>
                {infoList.temper}℃
              </span>
            </div>
          </div>
          <div
            className='w-[300px] h-[80px] pl-[20px] rounded-full shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center'
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5) 0%,  rgba(0, 0, 0, 0.25) 100%)',
            }}
          >
            <div className='w-[40px] h-[40px] mr-[20px] outline-white grid place-content-center'>
              <img
                src={ExchangeRateIcon}
                alt='환율 아이콘'
                className='w-[30px]'
              />
            </div>
            <div className='w-[200px] h-[60%]  outline-red-300 ml-[20px] flex flex-col justify-between items-start'>
              <div className='w-full h-fit  outline-black flex flex-row justify-start items-stretch'>
                <span className='text-[#D7D7D7] font-PtdRegular text-[17px]'>
                  1,000 대한민국 원 =
                </span>
              </div>
              <div className='w-full h-fit  outline-white flex flex-row justify-start items-center'>
                <span className='text-white font-PtdSemiBOld text-[24px]'>
                  {`${infoList.amountvia} ${infoList.pref}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

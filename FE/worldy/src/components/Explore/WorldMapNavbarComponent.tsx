import '../../styles/SweetAlertStyles.css';

import * as React from 'react';

import { useEffect, useState } from 'react';

import { BsExclamationCircle } from 'react-icons/bs';
import Cloud from '../../assets/images/Cloud.png';
import CustomAxios from '../../API/CustomAxios';
import ExchangeRateIcon from '../../assets/images/ExchangeRateIcon.png';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Moon from '../../assets/images/Moon.png';
import Swal from 'sweetalert2';
import { countryLst } from './CountrySpeak';
import logoColoredBlue from '../../assets/images/LogoColoredBlue.png';
import { useNavigate } from 'react-router';

interface Props {
  hoborAsset: string;
  selectAsset: string;
  countryName: string;
  GetSelectAssetName: (name: string) => void;
}
// ["paintBox", "historyBox", "quizBox", "foodBox", "personalityBox",  "newsBox", "back"

interface ListType {
  [key: string]: string;
}

interface InfoType {
  nationName: string;
  exchangeRate: string;
  weatherName: string;
  temp: string;
  time: number;
}

const DOMAIN = process.env.REACT_APP_BASE_URL;

const switchTrans: ListType = {
  paintBox: '틀림 그림 찾기에 도전해보세요!',
  quizBox: '퀴즈를 풀어보세요!',
  personalityBox: '인물을 알아봐요!',
  newsBox: '소식을 알아봐요!',
  foodBox: '음식을 잘 아시나요?',
};

const WorldMapNavbarComponent = ({
  countryName,
  selectAsset,
  hoborAsset,
  GetSelectAssetName,
}: Props) => {
  const getLoginToken: string | null = sessionStorage.getItem('token');
  const countryId = countryLst[countryName].id;

  const [infoData, setInfoData] = useState<InfoType>();

  const getDatasList = async () => {
    try {
      const response = await CustomAxios({
        APIName: 'getDatasList',
        APIType: 'get',
        UrlQuery: DOMAIN + `/adventure/info/dynamic/${countryId}`,
        Token: getLoginToken,
      });
      setInfoData(response);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const [departure, setDeparture] = useState<boolean>(true);

  console.log(infoData, '');

  const list: ListType = {
    country: countryLst[`${countryName}`].KOREAN,
    countryEng: countryLst[`${countryName}`].ENGLISH,
    titlecontent: `${countryLst[`${countryName}`].KOREAN}의 ${
      switchTrans[`${hoborAsset}`]
    }`,
  };

  const infoList = {
    time: Number(infoData?.time),
    weather: infoData?.weatherName,
    temper: infoData?.temp,
    amountvia: infoData?.exchangeRate,
    // pref: '미국 달러',
  };

  const [clickedLeftMenu, setClickedLeftMenu] = useState<boolean>(false);

  const [timeLineString, setTimeLineString] = useState<string>('');
  const [timeAPM, setTimeAPM] = useState<string>('');

  const navigate = useNavigate();

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
        : infoList.time === 0
        ? '0AM'
        : infoList.time > 12
        ? `${infoList.time - 12}PM`
        : `${infoList.time}AM`
    );
  }, [infoData]);
  console.log(timeAPM);
  const [doDDiyong, setDoDDiyong] = useState<boolean>(false);

  const [contentText, setContentText] = useState<string>('');

  useEffect(() => {
    if (hoborAsset) {
      setDoDDiyong(true);
      setContentText(list.titlecontent);
    } else {
      setDoDDiyong(false);
    }
  }, [hoborAsset]);

  const nick = sessionStorage.getItem('nickname');

  useEffect(() => {
    setTimeout(() => {
      setDeparture(false);
    }, 9500);
  });

  useEffect(() => {
    if (countryName) {
      getDatasList();
    }
  }, [countryName]);

  useEffect(() => {
    if (doDDiyong) {
      setDeparture(false);
    }
  }, [doDDiyong]);

  return (
    <div className='relative h-20 w-full bg-[#161617] flex flex-row justify-between px-[30px]'>
      <div className='relative h-full w-[20%]  outline-white flex flex-row justify-start items-center'>
        <button>
          <IoMdArrowRoundBack
            size={30}
            color={'#D2D2D2'}
            onClick={() => {
              if (selectAsset) {
                // detail page인 경우, Country Map 으로
                GetSelectAssetName('');
                selectAsset = '';
                // alert("나라로 이동합니다.");
                // Swal.fire({
                //   title: '나라로 이동합니다.',
                //   confirmButtonText: '확인',
                //   buttonsStyling: false,
                //   customClass: {
                //     confirmButton: 'swal2-confirm',
                //   },
                // });
              } else {
                // Country Map인 경우, World Map 으로
                // alert('대륙으로 이동합니다');
                Swal.fire({
                  title: '대륙으로 이동합니다.',
                  confirmButtonText: '확인',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'swal2-confirm',
                  },
                }).then(function () {
                  navigate('/explore');
                });
                // navigate('/explore');

                // Swal.fire({icon: 'error',
                //   title: '결제실패',
                //   text: msg,	}).then(function(){
                //   location.href='home';
                //   })
              }
            }}
          />
        </button>
        {selectAsset ? null : (
          <div className='absolute top-[150px] w-[500px] flex-nowrap h-fit flex flex-col justify-start items-start  ml-[20px] pl-[20px]'>
            <span className='text-[50px] text-white font-PtdExtraBold'>
              {list.country}
            </span>
            <span className='text-[50px] mt-[2px] flex flex-row text-[rgba(255,255,255,0.5)] font-PtdExtraBold'>
              {list.countryEng}
            </span>
          </div>
        )}
      </div>
      <div className='h-[80px] w-[80%]  outline-white overflow-hidden relative'>
        <div
          className='h-full w-full flex flex-row justify-center items-center transition-all duration-[400ms] ease-out '
          style={{
            marginTop: doDDiyong ? '0px' : '60px',
            opacity: doDDiyong ? '100%' : '10%',
          }}
        >
          <>
            <BsExclamationCircle
              color={'white'}
              size={20}
              className='mr-[10px]'
            />
            <span className=' text-[22px] font-PtdRegular text-white'>
              {contentText}
            </span>
          </>
        </div>
        <span
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-PtdMedium  transition-all duration-[600ms] ease-out'
          style={{
            fontSize: departure ? '25px' : '10px',
            opacity: departure ? '100%' : '0%',
          }}
        >
          {list.country}에 오신 {nick}님 환영합니다!
        </span>
        {/* <div className='w-1/4'></div> */}
      </div>
      <div className='relative h-full w-[20%]  outline-white flex flex-row justify-end items-center'>
        <img src={logoColoredBlue} alt='colored logo' className='w-[100px] cursor-pointer' 
          onClick={() => {
            GetSelectAssetName('');
            selectAsset = '';
            navigate('/');
          }}/>
        {/* <div className='absolute top-[80px] -right-[30px] w-[400px] h-[20px]  bg-[#65ADFF]' /> */}
        {selectAsset ? null : (
          <div className='absolute top-[110px] -right-[20px] w-[400px] h-[280px] p-[40px] outline-white flex flex-col justify-between items-center'>
            <div
              className='w-[300px] h-[50px] px-[20px] rounded-[5px] shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center hover:bg-[rgba(255,255,255,1)]'
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 60%,  rgba(255, 255, 255, 0.5) 100%)',
              }}
            >
              <div className='w-[25px] h-[25px] ml-[10px] mr-[50px]  outline-white grid place-content-center'>
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
              className='w-[300px] h-[50px] px-[20px] rounded-[5px] shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center hover:bg-[rgba(255,255,255,1)]'
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 60%,  rgba(255, 255, 255, 0.5) 100%)',
              }}
            >
              <div className='w-[25px] h-[25px] mr-[50px] ml-[10px]  outline-white grid place-content-center'>
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
              className='w-[300px] h-[80px] pl-[20px] rounded-[5px] shadow-lg shadow-[rgba(82,82,82,0.2)] flex flex-row justify-start items-center hover:bg-[rgba(0,0,0,0.7)]'
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, rgba(0, 0, 0, 0.2) 0%,  rgba(0, 0, 0, 0.2) 100%)',
              }}
            >
              <div className='w-[25px] h-[25px] mr-[30px] ml-[10px] outline-white grid place-content-center'>
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
                    {`${infoList.amountvia}`}
                    {/* {`${infoList.amountvia} ${infoList.pref}`} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMapNavbarComponent;

// const menuFunc = () => {
//   console.log('메뉴');
// };

// const menuList = [
//   { title: '메뉴1', menuClick: menuFunc() },
//   { title: '메뉴2', menuClick: menuFunc() },
//   { title: '메뉴3', menuClick: menuFunc() },
//   { title: '메뉴4', menuClick: menuFunc() },
// ];

{
  /* <button
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
      </button> */
}

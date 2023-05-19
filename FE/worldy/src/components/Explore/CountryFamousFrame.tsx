import React, { useEffect, useState } from 'react'

import CustomAxios from '../../API/CustomAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { countryLst } from './CountrySpeak';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import food from '../../assets/images/foodImg.png'
import person from '../../assets/images/personImg.png'

interface Props {
  selectAsset: string;
  countryName: string;
};

interface FamousDataType {
  infoId : string,
  nationName : string,
  category : string,
  
  name : string,
  subName: string,
  imgUrl : string,
  content : string,
  videoUrl : string,
  instaUrl? : string,
};

const DOMAIN = process.env.REACT_APP_BASE_URL

const CountryFamousFrame = ({selectAsset, countryName}:Props) => {
  const [select, setSelect] = useState<number>(0);
  const [axiosGetFamousData, SetAxiosGetFamousData] = useState<FamousDataType[] | undefined>();

  const countryId = countryLst[countryName].id
  const getLoginToken: string | null = sessionStorage.getItem('token');


  /** 데이터 받는 함수 */
  const getDatasList = async (url:string) => {
    try {
      const response = await CustomAxios({
        APIName: 'getDatasList',
        APIType: 'get',
        UrlQuery: DOMAIN + url,
        Token: getLoginToken,
      });
      SetAxiosGetFamousData(response);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (getLoginToken){
      if (selectAsset === "foodBox") {
        getDatasList(`/adventure/info/static?nationId=${countryId}&category=food`)
      } else {
        getDatasList(`/adventure/info/static?nationId=${countryId}&category=people`)
      }
    }
  },[])

  const checkContent = (idx:number) => {
    setSelect(idx);
  }
  console.log(axiosGetFamousData)
  if (axiosGetFamousData) {
    console.log(axiosGetFamousData![select].imgUrl)
    return (
      <div className='h-full w-[540px] flex flex-col justify-center items-center'>
        <div className=' h-2/3 w-full flex flex-col justify-center items-center rounded-3xl bg-[rgba(255,255,255,0.6)] shadow-xl mt-10'>
          <div className='h-1/4 w-full flex justify-center items-center'>
            <img className={`h-[140px] w-[140px] ${(selectAsset === "foodBox")?" rounded-full":"rounded-xl" } `} src={axiosGetFamousData[select].imgUrl} alt="famous" />
          </div>
          <div className='h-1/6 w-full flex flex-col justify-center items-center'>
            <div className='h-1/3 w-full text-center text-3xl font-PtdExtraBold '>{axiosGetFamousData[select].name}</div>
            {/* <div className='h-1/3 w-full text-center text-lg font-PtdSemiBOld opacity-40 '>{axiosGetFamousData[select].subName}</div> */}
            <div className='h-1/3 w-full text-center text-lg font-PtdSemiBOld opacity-40 '>{axiosGetFamousData[select].subName}</div>
          </div>
          <div className='h-1/3 w-full text-center text-lg font-PtdRegular inline-block px-14 pt-3 pb-5 opacity-70 overflow-auto'>{axiosGetFamousData[select].content}</div>
          <div className='h-[60px] w-full flex justify-center items-center'>
            {(selectAsset === "foodBox")
            ?
            <div 
            className='h-7 opacity-40 cursor-pointer underline'
            onClick={() => {
              window.open(axiosGetFamousData[select].videoUrl)
              }}
              >레시피 확인하기 {""} ↗</div>  
            : 
            <div className='w-[70px] h-1/2 flex flex-row justify-between items-center' >
              <FontAwesomeIcon 
                className=' h-6 opacity-70 cursor-pointer' 
                icon={faInstagram} 
                onClick={() => {
                  window.open(axiosGetFamousData[select].instaUrl)
                }}
                />
              <FontAwesomeIcon 
                className=' h-6 opacity-70 cursor-pointer' 
                icon={faYoutube} 
                onClick={() => {
                  window.open(axiosGetFamousData[select].videoUrl)
                }}
              />
            </div>
            }
          </div>
        </div>
        <div className='h-[48px] w-[100px] flex felx-row justify-center py-3 mt-8'>
          <div className='flex flex-row '>
            <div className={`${(select === 0 ? "bg-[rgba(0,0,0,0.2)]" : "bg-[rgba(229,231,235,0.2)]")} h-full w-[25px] text-center font-PtdMedium text-white py-1 rounded-full cursor-pointer`}
              onClick={() => {checkContent(0)}}
            >1</div>
            <div className={`${(select === 1? "bg-[rgba(0,0,0,0.2)]" : "bg-[rgba(229,231,235,0.2)]")} h-full w-[25px] text-center font-PtdMedium text-white py-1 mx-1 rounded-full cursor-pointer`}
              onClick={() => checkContent(1)}
              >2</div>
            <div className={`${(select === 2 ? "bg-[rgba(0,0,0,0.2)]" : "bg-[rgba(229,231,235,0.2)]")} h-full w-[25px] text-center font-PtdMedium text-white py-1 rounded-full cursor-pointer`}
              onClick={() => checkContent(2)}
            >3</div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default CountryFamousFrame;

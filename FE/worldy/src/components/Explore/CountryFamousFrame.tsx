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

interface FamousType {
  imgUrl: string,
  name: string,
  subName: string,
  content: string,
  instaUrl?: string,
  videoUrl?: string,
};

export interface FamousDataType {
  infoId : string,
  nationName : string,
  category : string,
  
  name : string,
  subName: string,
  // imgUrl : string,
  img_url : string,
  content : string,
  // videoUrl : string,
  video_url : string,
  // instaUrl? : string,
  insta_url? : string,
};

interface UrlListType {
  [key:string]: string,
}



// const personData:FamousType[] = 
const personData:FamousType = 
// [
  {
  imgUrl: person,
  name: "파블로 피카소",
  subName: "Pablo Picasso",
  content: "회화, 조각, 도예, 판화 등 다방면으로 활약한 스페인의 미술가. 입체주의의 거장으로 평가받는다. 대표작으로는 '아비뇽의 처녀들'과 '게르니카'가 유명하다. 현대 미술의 뛰어난 거장을 꼽으라고 할때 빠지지 않고 언급되고 있으며, 또 국내외를 막론하고 천재 화가의 대명사로 꼽혀 대중성과 작품성을 동시에 가진 예술가이다. 매우 장수한 인물로서 10대에서 90대까지 80년 가량 맹활약하며 매우 수많은 작품을 남겼다.",
  instaUrl: "http://www.github.com/Lee-HanBin",
  videoUrl:"https://www.youtube.com/results?search_query=%ED%94%BC%EC%B9%B4%EC%86%8C",
  }
//   {
//     img: person,
//     title: "파블로 피카소",
//     subName: "Pablo Picasso",
//     discription: "회화, 조각, 도예, 판화 등 다방면으로 활약한 스페인의 미술가. 입체주의의 거장으로 평가받는다. 대표작으로는 '아비뇽의 처녀들'과 '게르니카'가 유명하다. 현대 미술의 뛰어난 거장을 꼽으라고 할때 빠지지 않고 언급되고 있으며, 또 국내외를 막론하고 천재 화가의 대명사로 꼽혀 대중성과 작품성을 동시에 가진 예술가이다. 매우 장수한 인물로서 10대에서 90대까지 80년 가량 맹활약하며 매우 수많은 작품을 남겼다.",
//     instaUrl: "http://www.github.com/Lee-HanBin",
//     videoUrl:"https://www.youtube.com/results?search_query=%ED%94%BC%EC%B9%B4%EC%86%8C",
//   },
//   {
//     img: person,
//     title: "파블로 피카소",
//     subName: "Pablo Picasso",
//     discription: "회화, 조각, 도예, 판화 등 다방면으로 활약한 스페인의 미술가. 입체주의의 거장으로 평가받는다. 대표작으로는 '아비뇽의 처녀들'과 '게르니카'가 유명하다. 현대 미술의 뛰어난 거장을 꼽으라고 할때 빠지지 않고 언급되고 있으며, 또 국내외를 막론하고 천재 화가의 대명사로 꼽혀 대중성과 작품성을 동시에 가진 예술가이다. 매우 장수한 인물로서 10대에서 90대까지 80년 가량 맹활약하며 매우 수많은 작품을 남겼다.",
//     instaUrl: "http://www.github.com/Lee-HanBin",
//     videoUrl:"https://www.youtube.com/results?search_query=%ED%94%BC%EC%B9%B4%EC%86%8C",
//   },
// ]

// const axiosGetFamousData: FamousType[] = [
const foodData: FamousType = 
  {
  imgUrl: food,
  name: "추로스",
  subName: "Churros",
  content: `길쭉하게 튀긴 빵으로 꽈배기와 친척관계이다. 일종의 도넛으로 분류하고 있다. 호주에서는 아예 멕시칸 도넛(Mexican donut)이라고 부른다. 한국에서 흔히 영어 식으로 "츄러스"라고 부르고 있지만, 국립국어원에서 정한 스페인어 표기법을 따른 정확한 표기는 "추로스"이다. 어원은 튀겨지는 소리를 표현한 의성어. 미국이나 멕시코에서 만들어진 것으로 아는 사람들이 많지만 본고장은 스페인이다.`,
  videoUrl: "https://www.10000recipe.com/recipe/6869140"
  }
//   {
//     img: food,
//     title: "추로스",
//     subName: "Churros",
//     discription: `길쭉하게 튀긴 빵으로 꽈배기와 친척관계이다. 일종의 도넛으로 분류하고 있다. 호주에서는 아예 멕시칸 도넛(Mexican donut)이라고 부른다. 한국에서 흔히 영어 식으로 "츄러스"라고 부르고 있지만, 국립국어원에서 정한 스페인어 표기법을 따른 정확한 표기는 "추로스"이다. 어원은 튀겨지는 소리를 표현한 의성어. 미국이나 멕시코에서 만들어진 것으로 아는 사람들이 많지만 본고장은 스페인이다.`,
//     videoUrl: "https://www.10000recipe.com/recipe/6869140"
//   },
//   {
//     img: food,
//     title: "추로스",
//     subName: "Churros",
//     discription: `길쭉하게 튀긴 빵으로 꽈배기와 친척관계이다. 일종의 도넛으로 분류하고 있다. 호주에서는 아예 멕시칸 도넛(Mexican donut)이라고 부른다. 한국에서 흔히 영어 식으로 "츄러스"라고 부르고 있지만, 국립국어원에서 정한 스페인어 표기법을 따른 정확한 표기는 "추로스"이다. 어원은 튀겨지는 소리를 표현한 의성어. 미국이나 멕시코에서 만들어진 것으로 아는 사람들이 많지만 본고장은 스페인이다.`,
//     videoUrl: "https://www.10000recipe.com/recipe/6869140"
//   },
// ]
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

  if (axiosGetFamousData) {
    console.log(axiosGetFamousData![select].img_url)
    return (
      <div className='h-full w-[540px] flex flex-col justify-center items-center'>
        <div className=' h-2/3 w-full flex flex-col justify-center items-center rounded-3xl bg-[rgba(255,255,255,0.6)] shadow-xl mt-10'>
          <div className='h-1/4 w-full flex justify-center items-center'>
            <img className={`h-[140px] w-[140px] ${(selectAsset === "foodBox")?" rounded-full":"rounded-xl" } `} src={axiosGetFamousData[select].img_url} alt="famous" />
          </div>
          <div className='h-1/6 w-full flex flex-col justify-center items-center'>
            <div className='h-1/3 w-full text-center text-3xl font-PtdExtraBold '>{axiosGetFamousData[select].name}</div>
            {/* <div className='h-1/3 w-full text-center text-lg font-PtdSemiBOld opacity-40 '>{axiosGetFamousData[select].subName}</div> */}
            <div className='h-1/3 w-full text-center text-lg font-PtdSemiBOld opacity-40 '>준비중입니다.</div>
          </div>
          <div className='h-1/3 w-full text-center text-lg font-PtdRegular inline-block px-14 pt-3 pb-5 opacity-70 overflow-auto'>{axiosGetFamousData[select].content}</div>
          <div className='h-[60px] w-full flex justify-center items-center'>
            {(selectAsset === "foodBox")
            ?
            <div 
            className='h-7 opacity-40 cursor-pointer underline'
            onClick={() => {
              window.open(axiosGetFamousData[select].video_url)
              }}
              >레시피 확인하기 {""} ↗</div>  
            : 
            <div className='w-[70px] h-1/2 flex flex-row justify-between items-center' >
              <FontAwesomeIcon 
                className=' h-6 opacity-70 cursor-pointer' 
                icon={faInstagram} 
                onClick={() => {
                  window.open(axiosGetFamousData[select].insta_url)
                }}
                />
              <FontAwesomeIcon 
                className=' h-6 opacity-70 cursor-pointer' 
                icon={faYoutube} 
                onClick={() => {
                  window.open(axiosGetFamousData[select].video_url)
                }}
              />
            </div>
            }
          </div>
        </div>
        <div className='h-[48px] w-[100px] flex felx-row justify-center py-3 mt-8'>
          <div className='flex flex-row '>
            <div className={`${(select === 0 ? " bg-green-400" : "bg-gray-200")} h-full w-[25px] text-center font-PtdMedium text-white py-1 rounded-full cursor-pointer`}
              onClick={() => {checkContent(0)}}
            >1</div>
            <div className={`${(select === 1? "bg-green-400" : "bg-gray-200")} h-full w-[25px] text-center font-PtdMedium text-white py-1 mx-1 rounded-full cursor-pointer`}
              onClick={() => checkContent(1)}
              >2</div>
            <div className={`${(select === 2 ? "bg-green-400" : "bg-gray-200")} h-full w-[25px] text-center font-PtdMedium text-white py-1 rounded-full cursor-pointer`}
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

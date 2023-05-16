import React, { useEffect, useState } from 'react'

import CountryPaintDetailModal from './CountryPaintDetailModal'
import CustomAxios from '../../API/CustomAxios'
import { ReactComponent as GOne } from "../../assets/images/1.svg"
import { ReactComponent as GStart } from "../../assets/images/START.svg"
import { ReactComponent as GThree } from "../../assets/images/3.svg"
import { ReactComponent as GTwo } from "../../assets/images/2.svg"
import { ReactComponent as POne } from "../../assets/images/p1.svg"
import { ReactComponent as PStart } from "../../assets/images/pSTART.svg"
import { ReactComponent as PThree } from "../../assets/images/p3.svg"
import { ReactComponent as PTwo } from "../../assets/images/p2.svg"
import { ReactComponent as PaintTitleIcon } from '../../assets/images/painttitle.svg'
import QuizModal from '../QuizModal'
import { ReactComponent as QuizTitleIcon } from "../../assets/images/quiztitle.svg"
import { ScrappedQuizType } from '../../routes/MyPage'
import { countryLst } from './CountrySpeak'
import { useParams } from 'react-router'

const tempScrappedQuizList: ScrappedQuizType[] = [
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'ox',
    category: 'cul',
    image: '',
    content: '일본의 모든 도시는 한국의 모든 도시와 표준시가 1시간 차이난다.',
    answer: 'O',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: "",
    hintType: true, //힌트
    commentary: '일본은 한국보다 실제 시간이 30분 빠릅니다',
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: true, //맞춘 문제인가
  },
  {
    quizId: 0,
    nationName: '중국',
    level: 2,
    quizType: 'multi',
    category: 'cul',
    image: '',
    content:
      '중국의 역사는 매우 오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요..',
    answer: '하나라',
    multiFirst: '진나라진나라진나라', //1번
    multiSecond: '명나라', //2번
    multiThird: '하나라', //3번
    multiFourth: '성나라', //4번
    hint: "",
    hintType: true, //힌트
    commentary: '힌트 무슨 유형인가', //힌트 유형
    userAnswer: '1', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
  },
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'blank',
    category: 'cul',
    image: '',
    content: '세종대왕.',
    answer: '세종대왕',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: "",
    hintType: true, //힌트
    commentary: 'ㅅㅈㄷㅇ', //힌트 유형
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
  },
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'ox',
    category: 'cul',
    image: '',
    content: '대한민국에서 쓰이는 언어는 한극어이다.',
    answer: 'X',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: "",
    hintType: false, //힌트
    commentary: '힌트 무슨 유형인가', //힌트 유형
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
  },
];


interface Props {
  selectAsset: string;
};

export interface PaintDataType {
  imgNum: number,
  diffUrl: string,
  imgTitle: string,
  imgContent: string,
  originalUrl: string,
  answerPointList: string[][]
};

export interface QuizDataType {

};


interface ImgObjectType {
  [key:string]: JSX.Element[];
};

const DOMAIN = process.env.REACT_APP_BASE_URL

const CountryQuizFrame = ({selectAsset}:Props) => {
  const [counting, setCounting] = useState<number>(-2)
  const [quizModalState, setQuizModalState] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number>(0);
  const [axiosGetPaintData, setAxiosGetPaintData] = useState<PaintDataType | undefined>();
  const [axiosGetQuizData, setAxiosGetQuizData] = useState<QuizDataType[] | undefined>();

  const params = useParams()
  const countryName: string = params.country || '';

  const getLoginToken: string | null = sessionStorage.getItem('token');
  const countryId = countryLst[countryName].id

  /** 게임을 재시작 하는 함수 */
  const GetRegameFlag = (num:number) => {
    setCounting(num);
    if (countryId) {
      if (selectAsset === "quizBox") {
        getDatasList("quizBox", "");
      } else {
        getDatasList("paintBox", `/quiz/hidden/${countryId}`);
      }          
    }
  };

  const imgObject:ImgObjectType = {
    quizBox:[
      <QuizTitleIcon />,
      <GOne />, 
      <GTwo />, 
      <GThree />, 
      <GStart />, 
      <QuizModal
        input={tempScrappedQuizList[selectedQuizId]}
        closeModal={() => setQuizModalState(false)}
      />
    ],
    paintBox:[
      <PaintTitleIcon />, 
      <POne />, 
      <PTwo />, 
      <PThree />, 
      <PStart />,
      <CountryPaintDetailModal
        selectAsset={selectAsset}
        GetRegameFlag={GetRegameFlag}
        axiosGetPaintData={axiosGetPaintData}
      />
    ],
  }

  const selectImg:JSX.Element[] = imgObject[selectAsset];

  /** 데이터 받는 함수 */
  const getDatasList = async (box: string, url:string) => {
    try {
      const response = await CustomAxios({
        APIName: 'getDatasList',
        APIType: 'get',
        UrlQuery: DOMAIN + url,
        Token: getLoginToken,
      });
      if (box === "quizBox") {
          setAxiosGetQuizData(response);
      } else {
        setAxiosGetPaintData(response);
      }          
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (countryId) {
      if (selectAsset === "quizBox") {
        getDatasList("quizBox", "");
      } else {
        getDatasList("paintBox", `/quiz/hidden/${countryId}`);
      }          
    }
  }, [])

  useEffect(() => {
    if (counting > -1) {
      setTimeout(() => {
        setCounting((i) => i-1)
      }, 1000);
    }
  },[counting])

  return (
    <div className="h-full w-full mt-20 flex  items-center justify-center">
      {(counting > -2)
        ?
        <div className="h-full w-full flex items-center justify-center ">
          {(counting === 3) ? <div className="absolute">{selectImg[3]}</div> : null}
          {(counting === 2) ? <div className="absolute">{selectImg[2]}</div> : null}
          {(counting === 1) ? <div className="absolute">{selectImg[1]}</div> : null}
          {(counting === 0) ? <div className="absolute">{selectImg[4]}</div> : null}
          {(counting === -1) 
            ?         
            <div className={
              `${(selectAsset === "quizBox") ? "absolute h-[1100px] flex" : "h-full w-full flex items-center justify-center"} `} 
            >
              {selectImg[5]}
            </div>    
            :
            null
          }    
        </div>

      :
      <div className="h-full w-1/3 flex items-center justify-center" >
        <div className="absolute translate-y-[-120%]">
          {selectImg[0]}
        </div>
        <div className="h-1/4 w-full flex flex-col shadow-xl ">
          <div className={`h-1/6 w-full  rounded-t-xl shadow-3xl
            ${(selectAsset === "quizBox") ? "bg-[#61C7BB]" : "bg-[#EACFFF]"}`}
           />
          <div className="h-5/6 w-full flex flex-col rounded-b-xl bg-white shadow-xl">
            <div className="h-1/2 w-full flex flex-col justify-center items-center pt-10">
              <button
                className={`h-[50px] w-[300px] flex justify-center items-center border-solid border-[1px] rounded-3xl shadow-lg text-xl
                  ${(selectAsset === "quizBox") ? "bordedr-[#61C7BB] text-[#61C7BB]" : "bordedr-[#C5ACE5] text-[#C5ACE5]"}`}
                onClick={() => {
                  setCounting(3)
                }}
                >
                START
              </button>
            </div>
            <div className={`h-1/3 w-full text-xs opacity-60 font-PtdLight text-center 
              ${(selectAsset === "quizBox") ? "text-[#61C7BB]" : "text-[#C5ACE5]"} pt-5`}
            >버튼을 누르면 3초 후 문제가 공개됩니다.
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}
export default CountryQuizFrame;
import * as React from 'react';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import CountryFamousFrame from './CountryFamousFrame';
import CountryNewsDetail from './CountryNewsDetail';
import CountryQuizFrame from './CountryQuizFrame';
import CrAnswer from '../../assets/images/CorrectAnswer.png';
import CustomAxios from '../../API/CustomAxios';
import WrAnswer from '../../assets/images/WrongAnswer.png';
import book from '../../assets/images/bookIcon.png';
import food from '../../assets/images/food.png';
import foodIcon from '../../assets/images/foodIcon.png';
import newsIcon from '../../assets/images/newsIcon.png';
import paint from '../../assets/images/paint.png';
import paintIcon from '../../assets/images/paintIcon.png'
import pathBA from '../../assets/images/BtgAttention.png';
import pathBC from '../../assets/images/BtgCurious.png';
import pathBH from '../../assets/images/BtgHandup.png';
import pathBP from '../../assets/images/BtgPointing.png';
import pathBT from '../../assets/images/BtgTeach.png';
import pathTB from '../../assets/images/TutorialBackground.png';
import pathTQT from '../../assets/images/TutorialQuizText.png';
import person from '../../assets/images/person.png';
import personIcon from '../../assets/images/personIcon.png';
import quiz from '../../assets/images/quiz.png';
import quizIcon from '../../assets/images/quizIcon.png';
import { useDispatch } from 'react-redux';
import useLoadImagesHook from '../../_hooks/useLoadImagesHook';

interface TutorialItemType {
  imgsrc: string;
  contentText?: string;
  contentCoreText?: string;
  // contentItem: React.ReactNode;
  onClick?: () => void;
};

interface Props {
  selectAsset: string;
  countryName: string;
  GetSelectAssetName: (name:string) => void;
};

interface SpeakType {
  [key: string]: DetailType;
}

interface DetailType {
  title: string,
  subTitle: string,
  contents: string[],
  icon: string,
  npcImg: string,
  mainIcon: string,

}

interface Country {
  [key: string]: {
    id?: string,
    KOREAN: string,
    ENGLISH: string,
  }
}

export interface NewsDataType {
  id: number,
  nationName: string,
  newsTitle: string,
  newsSummary: string,
  newsImg: string,
  newsUrl: string
};
// nations = {"대한민국" : 9, "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27}
export const countryLst: Country = {
  asia_Korea: {
    id: '9',
    KOREAN: '대한민국',
    ENGLISH: 'Korea',
  },
  asia_China: {
    id: '7',
    KOREAN: '중국',
    ENGLISH: 'China',
  },
  asia_india: {
    id: '4',
    KOREAN: '인도',
    ENGLISH: 'India',
  },
  asia_Japen: {
    id: '8',
    KOREAN: '일본',
    ENGLISH: 'Japen',
  },
  africa_Egypt: {
    id: '27',
    KOREAN: '이집트',
    ENGLISH: 'Egypt',
  },
  europe_France: {
    id: '18',
    KOREAN: '프랑스',
    ENGLISH: 'France',
  },
  europe_Italia: {
    id: '14',
    KOREAN: '이탈리아',
    ENGLISH: 'Italia',
  },
  europe_Spain: {
    id: '12',
    KOREAN: '스페인',
    ENGLISH: 'Spain',
  },
  europe_UK: {
    id: '19',
    KOREAN: '영국',
    ENGLISH: 'United Kingdom',
  },
  northAmerica_America: {
    id: '39',
    KOREAN: '미국',
    ENGLISH: 'United States',
  },
};

const DOMAIN = process.env.REACT_APP_BASE_URL

const CountrySpeak  = ({countryName, selectAsset, GetSelectAssetName}:Props) => {

  const getLoginToken: string | null = sessionStorage.getItem('token');
  const [axiosGetData, setAxiosGetData] = useState<NewsDataType | undefined>();
  const countryId = countryLst[countryName].id
  /** 뉴스 데이터 받는 함수 */
  const getNewsList = async () => {
    try {
      const response = await CustomAxios({
        APIName: 'getNewsList',
        APIType: 'get',
        UrlQuery: DOMAIN + `/adventure/news/${countryId}`,
        Token: getLoginToken,
      });
      setAxiosGetData(response)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {

    if (getLoginToken){
      switch (selectAsset) {
        case "newsBox":
          getNewsList();
          break;
        case "quizBox":
          getNewsList();
          break;
        case "paintBox":
          getNewsList();
          break;
        case "foodBox":
          getNewsList();
          break;
        case "personalityBox":
          getNewsList();
          break;
        default:
          break;
        }
    }
  },[selectAsset])

  console.log(axiosGetData)
//   ///////////////////////////////
  const myImageList = {
    TutorialBackground: pathTB,
    BtgAttention: pathBA,
    BtgCurious: pathBC,
    BtgPointing: pathBP,
    BtgHandup: pathBH,
    BtgTeach: pathBT,
    TutorialQuizText: pathTQT,
    WrongAnswer: WrAnswer,
    CorrectAnswer: CrAnswer,
  };

  // const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  // const [loadedAll, setLoadedAll] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isLoaded) {
  //     setTimeout(() => {
  //       setLoadedAll(true);
  //       console.log(loadedImages);
  //     }, 300);
  //   }
  // }, [isLoaded]);

  const TutorialItemList: TutorialItemType[] = [
    {
      imgsrc: myImageList['BtgAttention'],
      contentText:
        '안녕, 내 이름은 설희야. 책 읽는 걸 매우 좋아해! 책을 읽다 보면 내가 경험해보지 못한 세상이 참 넓은 것 같아. 아차! 내 정신 좀 봐, ',
      contentCoreText: '넌 이름이 뭐야?',
      // contentItem: eneterNickNameContentItem,
    },
    {
      imgsrc: myImageList['BtgCurious'],
      contentText: `역사는 역사다`,
      contentCoreText: '혹시 평소에 관심있는 분야가 있니?',
      // contentItem: selectInterests,
    },
    {
      imgsrc: myImageList['BtgHandup'],
      contentText: `오! 안녕안녕`,
      // contentItem: takeQuiz,
    },
    {
      imgsrc: myImageList['BtgPointing'],
      contentText:
        '이런, 아직은 자신있는 분야가 없구나? 그렇다면 내가 랜덤한 분야의 퀴즈를 내볼게, 한 번 맞춰볼래? 너무 어렵진 않을 거야!',
      // contentItem: mustTakeQuiz,
    },
    {
      imgsrc: myImageList['BtgTeach'],
      // contentItem: showQuiz,
    },
    {
      imgsrc: myImageList['BtgCurious'],
      contentText:
        '좋아! 잘 했어. 방금 푼 퀴즈들은 앞으로 우리가  만나게 될 WORLDY 세상의 맛보기일 뿐이야. 이제 준비가 된 것 같은데, 어때? 바로 출발할까?',
      // contentItem: readyToGo,
    },
  ];

  const [targetIndex, setTargetIndex] = useState<number>(0);
  
  // useEffect(() => {
  //   if (loadedAll) {
  //     setTimeout(() => {
  //       setPopupName(true);
  //       setPopupText(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setPopupItem(true);
  //     }, 1500);
  //   }
  // }, [loadedAll]);

  // useEffect(() => {
  //   if (targetIndex !== 0) {
  //     setPopupText(false);
  //     setPopupItem(false);
  //     if (targetIndex === 4) {
  //       setTimeout(() => {
  //         setPopupItem(true);
  //       }, 200);
  //     } else {
  //       setTimeout(() => {
  //         setPopupText(true);
  //       }, 500);
  //       setTimeout(() => {
  //         setPopupItem(true);
  //       }, 1500);
  //     }
  //   }
  // }, [targetIndex]);

  const ment:SpeakType = {
    newsBox: {
      title: `${countryLst[`${countryName}`].KOREAN} 최신 뉴스`,
      subTitle: `${countryLst[`${countryName}`].ENGLISH} Latest News`,
      contents: [`${countryLst[`${countryName}`].KOREAN}의 최신 뉴스를 제공합니다.`, "하루에 한 번, 매일 아침 업데이트 되는", `${countryLst[countryName].KOREAN}의 새로운 소식을 만나보세요`],
      icon: newsIcon,
      npcImg: pathBA,
      mainIcon: book,
    },
    quizBox: {
      title: `${countryLst[`${countryName}`].KOREAN} 상식 퀴즈`,
      subTitle: `${countryLst[`${countryName}`].ENGLISH} Trivia Quiz`,
      contents: ["시사, 역사, 문화 등", "다양한 카테고리의 재미있는", `${countryLst[countryName].KOREAN} 상식 퀴즈를 풀어보세요!`],
      icon: quizIcon,
      npcImg: pathBP,
      mainIcon: quiz,
    },
    paintBox: {
      title: "틀림 그림 찾기",
      subTitle: "Hidden Catch of AI",
      contents: [`${countryLst[`${countryName}`].KOREAN}의 명소 이미지가 등장합니다.`, "시간 안에 AI가 바꾸어 놓은 부분 중" , "세 가지를 찾아보세요!"],
      icon: paintIcon,
      npcImg: pathBC,
      mainIcon: paint,
    },
    personalityBox:{
      title: `${countryLst[`${countryName}`].KOREAN} 유명 인물`,
      subTitle: `${countryLst[`${countryName}`].ENGLISH} famous person`,
      contents: [`${countryLst[`${countryName}`].KOREAN}의 유명 인물을 소개합니다.`, "다양한 인물의 설명과 함께" , "인스타그램, 유튜브를 확인해보세요."],
      icon: personIcon,
      npcImg: pathBA,
      mainIcon: person,
    },
    foodBox: {
      title: `${countryLst[`${countryName}`].KOREAN} 음식`,
      subTitle: `${countryLst[`${countryName}`].ENGLISH} famous food`,
      contents: [`${countryLst[`${countryName}`].KOREAN}의 대표 음식을 소개합니다.`, "다양한 음식에 대한 설명과" , "레시피를 확인해보세요!"],
      icon: foodIcon,
      npcImg: pathBA,
      mainIcon: food,
    }
  }
 
  const data = [
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙",
      thumbnailLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYuvXXrtU9czKyRpF0dBbPkUebPVeDLseFg&usqp=CAU",
      title: "샬라샬라",
    },
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙",
      thumbnailLink: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F076%2F2022%2F08%2F24%2F2022082401001759800108441_20220824151804165.jpg&type=sc960_832",
      title: "샬라샬라샬랄라",
    },
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙우아아아아ㅏ앙",
      thumbnailLink: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5339%2F2023%2F03%2F03%2F0000261078_001_20230303161201781.jpg&type=a340",
      title: "샬라샬라샬랄라",
    },
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리",
      thumbnailLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYuvXXrtU9czKyRpF0dBbPkUebPVeDLseFg&usqp=CAU",
      title: "샬라샬라",
    },
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리",
      thumbnailLink: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F076%2F2022%2F08%2F24%2F2022082401001759800108441_20220824151804165.jpg&type=sc960_832",
      title: "샬라샬라샬랄라",
    },
    {
      link: "https://github.com/Lee-hanbin",
      press: "",
      summary: "얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리얄리얄리얄리리리리",
      thumbnailLink: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5339%2F2023%2F03%2F03%2F0000261078_001_20230303161201781.jpg&type=a340",
      title: "샬라샬라샬랄라",
    },
  ]

  if (axiosGetData) {
    return (
      <div className="w-full h-full flex items-end">
        <div className="z-10 w-1/4 translate-x-10 absolute">
          <img
            className="h-[50%]"
            src={ment[`${selectAsset}`].icon}
            alt=""
          />
        </div>
        <div className="z-10 h-3/5 translate-x-80 absolute">
          <img
            className="h-[100%]"
            src={ment[`${selectAsset}`].npcImg}
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-row items-end bg-[rgba(255,255,255,0.4)]">
          <div className="h-full w-1/4 flex flex-col bg-[rgba(0,0,0,0.3)] ">
            <div className="h-2/3 flex flex-col justify-center text-white p-20">
              <div className="h-1/2 flex flex-col">
                <div className="flex flex-col pb-10">
                  <div className='text-3xl pb-5'>
                    <img className="h-10 " src={ment[`${selectAsset}`].mainIcon} alt=""/>
                  </div>
                  <div className='text-4xl font-PtdExtraBold'>{ment[`${selectAsset}`].title}</div>
                  <div className='text-2xl font-PtdLight'>{ment[`${selectAsset}`].subTitle}</div>
                </div>
                <div className="h-1/2">
                  <div className="pb-1 font-PtdLight">{ment[`${selectAsset}`].contents[0]}</div>
                  <div className="pb-1 font-PtdLight">{ment[`${selectAsset}`].contents[1]}</div>
                  <div className="pb-1 font-PtdLight">{ment[`${selectAsset}`].contents[2]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-3/4 flex flex-col justify-center items-center">
            {(selectAsset === "newsBox") ? <CountryNewsDetail data={axiosGetData}/> :null}
            {(selectAsset === "quizBox" || selectAsset === "paintBox") ? <CountryQuizFrame selectAsset={selectAsset}/> : null}
            {(selectAsset === "foodBox" || selectAsset === "personalityBox") ? <CountryFamousFrame selectAsset={selectAsset} /> :null}
  
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}


export default CountrySpeak;

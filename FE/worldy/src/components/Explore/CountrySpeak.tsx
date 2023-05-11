import * as React from 'react';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import CrAnswer from '../../assets/images/CorrectAnswer.png';
// import LoaderPyramid from '../LoaderPyramid';
import WrAnswer from '../../assets/images/WrongAnswer.png';
import book from '../../assets/images/bookIcon.png'
import newsIcon from '../../assets/images/newsIcon.png'
import pathBA from '../../assets/images/BtgAttention.png';
import pathBC from '../../assets/images/BtgCurious.png';
import pathBH from '../../assets/images/BtgHandup.png';
import pathBP from '../../assets/images/BtgPointing.png';
import pathBT from '../../assets/images/BtgTeach.png';
import pathTB from '../../assets/images/TutorialBackground.png';
import pathTQT from '../../assets/images/TutorialQuizText.png';
import { useDispatch } from 'react-redux';
import useLoadImagesHook from '../../_hooks/useLoadImagesHook';
import CountryNewsDetail from './CountryNewsDetail';

/*
  1. click하면 text index + 1
  2. text index가 끝까지 가면 GetSelectAssetName("")
*/

interface TutorialItemType {
  imgsrc: string;
  contentText?: string;
  contentCoreText?: string;
  // contentItem: React.ReactNode;
  onClick?: () => void;
};

interface Props {
  GetSelectAssetName: (name:string) => void;
};

const CountrySpeak  = ({GetSelectAssetName}:Props) => {
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

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
        console.log(loadedImages);
      }, 300);
    }
  }, [isLoaded]);

  //////////////////////////////
  const npcName = '설희';

  /////////////////////////////////////////////////

  const TutorialItemList: TutorialItemType[] = [
    {
      imgsrc: loadedImages['BtgAttention'],
      contentText:
        '안녕, 내 이름은 설희야. 책 읽는 걸 매우 좋아해! 책을 읽다 보면 내가 경험해보지 못한 세상이 참 넓은 것 같아. 아차! 내 정신 좀 봐, ',
      contentCoreText: '넌 이름이 뭐야?',
      // contentItem: eneterNickNameContentItem,
    },
    {
      imgsrc: loadedImages['BtgCurious'],
      contentText: `역사는 역사다`,
      contentCoreText: '혹시 평소에 관심있는 분야가 있니?',
      // contentItem: selectInterests,
    },
    {
      imgsrc: loadedImages['BtgHandup'],
      contentText: `오! 안녕안녕`,
      // contentItem: takeQuiz,
    },
    {
      imgsrc: loadedImages['BtgPointing'],
      contentText:
        '이런, 아직은 자신있는 분야가 없구나? 그렇다면 내가 랜덤한 분야의 퀴즈를 내볼게, 한 번 맞춰볼래? 너무 어렵진 않을 거야!',
      // contentItem: mustTakeQuiz,
    },
    {
      imgsrc: loadedImages['BtgTeach'],
      // contentItem: showQuiz,
    },
    {
      imgsrc: loadedImages['BtgCurious'],
      contentText:
        '좋아! 잘 했어. 방금 푼 퀴즈들은 앞으로 우리가  만나게 될 WORLDY 세상의 맛보기일 뿐이야. 이제 준비가 된 것 같은데, 어때? 바로 출발할까?',
      // contentItem: readyToGo,
    },
  ];

  const [targetIndex, setTargetIndex] = useState<number>(0);

  const [popupName, setPopupName] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<boolean>(false);
  const [popupItem, setPopupItem] = useState<boolean>(false);

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

  useEffect(() => {
    if (targetIndex !== 0) {
      setPopupText(false);
      setPopupItem(false);
      if (targetIndex === 4) {
        setTimeout(() => {
          setPopupItem(true);
        }, 200);
      } else {
        setTimeout(() => {
          setPopupText(true);
        }, 500);
        setTimeout(() => {
          setPopupItem(true);
        }, 1500);
      }
    }
  }, [targetIndex]);

  const data = [
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


  return (
    <div>
      <div className="w-full h-full absolute flex items-end">
        <div className="z-10 translate-x-10 absolute w-1/4 ">
          <img
            className="h-[50%]"
            src={newsIcon}
            alt=""
          />
        </div>
        <div className="z-10 absolute translate-x-80 h-1/2 ">
          <img
            className="h-[100%]"
            src={TutorialItemList[targetIndex].imgsrc}
            alt=""
          />
        </div>
        <div className="z-5 absolute bg-[rgba(0,0,0,0.3)] h-full w-1/4 flex flex-col">
          <div className="h-2/3 flex flex-col justify-center text-white p-20">
            <div className="h-1/2 flex flex-col">
              <div className="flex flex-col pb-10">
                <div className='text-3xl pb-5'>
                  <img className="h-10" src={book} alt=""/>
                </div>
                <div className='text-4xl font-extrabold'>미국 최신 뉴스</div>
                <div className='text-xl font-extralight'>United States Latest News</div>
              </div>
              <div className="h-1/2">
                <div className="pb-1">미국의 최신 뉴스를 제공합니다.</div>
                <div className="pb-1">하루에 한 번, 매일 아침 업데이트 되는</div>
                <div className="pb-1">미국의 새로운 소식을 만나보세요</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute w-full h-full flex flex-row justify-center ">
        <div className="w-1/3">
        </div>
        <div className="mt-40 mr-40 w-1/4 flex flex-row itmes-center">
          <CountryNewsDetail data={data}/>
        </div>
      </div>
    </div>
  );
  

}


export default CountrySpeak;



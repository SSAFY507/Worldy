import * as React from "react";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { CSSTransition } from "react-transition-group";
import CrAnswer from "../../assets/images/CorrectAnswer.png";
import LoaderPyramid from "../Loaders/LoaderPyramid";
import WrAnswer from "../../assets/images/WrongAnswer.png";
import pathBA from "../../assets/images/BtgAttention.png";
import pathBC from "../../assets/images/BtgCurious.png";
import pathBH from "../../assets/images/BtgHandup.png";
import pathBP from "../../assets/images/BtgPointing.png";
import pathBT from "../../assets/images/BtgTeach.png";
import pathTB from "../../assets/images/TutorialBackground.png";
import pathTQT from "../../assets/images/TutorialQuizText.png";
import { useDispatch } from "react-redux";
import useLoadImagesHook from "../../_hooks/useLoadImagesHook";

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
}

interface Props {
  GetSelectAssetName: (name: string) => void;
}

const CountrySpeak = ({ GetSelectAssetName }: Props) => {
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
  const npcName = "설희";

  /////////////////////////////////////////////////

  const TutorialItemList: TutorialItemType[] = [
    {
      imgsrc: loadedImages["BtgAttention"],
      contentText:
        "안녕, 내 이름은 설희야. 책 읽는 걸 매우 좋아해! 책을 읽다 보면 내가 경험해보지 못한 세상이 참 넓은 것 같아. 아차! 내 정신 좀 봐, ",
      contentCoreText: "넌 이름이 뭐야?",
      // contentItem: eneterNickNameContentItem,
    },
    {
      imgsrc: loadedImages["BtgCurious"],
      contentText: `역사는 역사다`,
      contentCoreText: "혹시 평소에 관심있는 분야가 있니?",
      // contentItem: selectInterests,
    },
    {
      imgsrc: loadedImages["BtgHandup"],
      contentText: `오! 안녕안녕`,
      // contentItem: takeQuiz,
    },
    {
      imgsrc: loadedImages["BtgPointing"],
      contentText:
        "이런, 아직은 자신있는 분야가 없구나? 그렇다면 내가 랜덤한 분야의 퀴즈를 내볼게, 한 번 맞춰볼래? 너무 어렵진 않을 거야!",
      // contentItem: mustTakeQuiz,
    },
    {
      imgsrc: loadedImages["BtgTeach"],
      // contentItem: showQuiz,
    },
    {
      imgsrc: loadedImages["BtgCurious"],
      contentText:
        "좋아! 잘 했어. 방금 푼 퀴즈들은 앞으로 우리가  만나게 될 WORLDY 세상의 맛보기일 뿐이야. 이제 준비가 된 것 같은데, 어때? 바로 출발할까?",
      // contentItem: readyToGo,
    },
  ];

  const [targetIndex, setTargetIndex] = useState<number>(0);

  const [popupName, setPopupName] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<boolean>(false);
  const [popupItem, setPopupItem] = useState<boolean>(false);

  useEffect(() => {
    if (loadedAll) {
      setTimeout(() => {
        setPopupName(true);
        setPopupText(true);
      }, 500);
      setTimeout(() => {
        setPopupItem(true);
      }, 1500);
    }
  }, [loadedAll]);

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
  return (
    <>
      <div className="w-full h-full relative">
        <div className="z-20 absolute w-1/4 h-full flex flex-row justify-end items-end">
          <img
            className="h-[90%]"
            src={TutorialItemList[targetIndex].imgsrc}
            alt="설설"
          />
        </div>
        <div className="z-10 absolute top-1/2 bg-[rgba(0,0,0,0.8)] w-full h-1/2 flex justify-end">
          <div className="h-full w-3/4 py-10 pl-20 pr-10">
            <div className="w-3/5 h-fit flex flex-col justify-between items-start">
              <div className="outline-white h-[30px] w-full font-PtdLight text-[#f9c53a] text-[20px] flex justify-start items-center">
                <CSSTransition
                  in={popupName}
                  timeout={3000}
                  classNames="CSSTransition-Tutorial-Popup"
                  unmountOnExit
                >
                  <div>{targetIndex !== 4 ? npcName : null}</div>
                </CSSTransition>
              </div>
              <div className="h-fit w-full my-[10px] text-white text-[30px] font-PtdExtraLight leading-[45px] py-[5px]">
                <CSSTransition
                  in={popupText}
                  timeout={1000}
                  classNames="CSSTransition-Tutorial-Popup"
                  unmountOnExit
                >
                  <div>
                    {TutorialItemList[targetIndex].contentText}
                    <div className="border-b-[1.5px] border-b-white border-solid w-fit font-PtdLight">
                      {TutorialItemList[targetIndex].contentCoreText}
                    </div>
                  </div>
                </CSSTransition>
              </div>
              <div className="outline-white flex-1 max-h-full w-full flex flex-col justify-end items-center">
                {/* <CSSTransition
                  in={popupItem}
                  timeout={1000}
                  classNames='CSSTransition-Tutorial-Popup'
                  unmountOnExit
                > */}
                {/* <div className='w-full h-full  outline-red-400'>
                    {TutorialItemList[targetIndex].contentItem}
                  </div> */}
                {/* </CSSTransition> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountrySpeak;

import * as React from 'react';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import pathTB from '../assets/images/TutorialBackground.png';
import pathJHB from '../assets/images/JoshHoldingBook.png';
import pathJC from '../assets/images/JoshCurious.png';
import pathJS from '../assets/images/JoshSitting.png';
import pathJP from '../assets/images/JoshPanic.png';
import pathJJ from '../assets/images/JoshJumping.png';
import pathTQT from '../assets/images/TutorialQuizText.png';
import pathJR from '../assets/images/JoshReady.png';
import LoaderPyramid from '../components/LoaderPyramid';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import { CSSTransition } from 'react-transition-group';

import WrAnswer from '../assets/images/WrongAnswer.png';
import CrAnswer from '../assets/images/CorrectAnswer.png';

type TutorialItemType = {
  imgsrc: string;
  contentText?: string;
  contentCoreText?: string;
  contentItem: React.ReactNode;
  onClick?: () => void;
};

type quizItemType = {
  difficulty: string;
  category: string;
  quizText: string;
  answer: string;
  selections: string[];
};

export default function Tutorial({
  onClickEndTutorial,
}: {
  onClickEndTutorial: () => void;
}) {
  ///////////////////////////////
  const myImageList = {
    TutorialBackground: pathTB,
    JoshHoldingBook: pathJHB,
    JoshCurious: pathJC,
    JoshSitting: pathJS,
    JoshPanic: pathJP,
    JoshJumping: pathJJ,
    JoshReady: pathJR,
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
  const name = 'Josh';

  //   닉네임 입력창 관련/////////////////////////////////////
  const [nickName, setNickName] = useState<string>('');

  // 가능한 닉네임인가?
  const [nickNameState, setNickNameState] = useState<boolean | null>(null);

  //닉네임값 업데이트
  const handleCheckNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setNickName(inputText);
  };

  //닉네임 입력 버튼 관련 //////////////////////////////////////
  const [nickNameCheckBtnState, setNickNameCheckBtnState] =
    useState<boolean>(false);

  //닉네임 길이가 3~10자일 때만 체크 가능ㄴ
  useEffect(() => {
    setNickNameState(null);
    if (nickName.length >= 3 && nickName.length <= 10) {
      setNickNameCheckBtnState(true);
    } else {
      setNickNameCheckBtnState(false);
    }
  }, [nickName]);

  //닉네임이 Sunday(중복X)이면 true, 중복이면 false
  const checkNickName = () => {
    if (nickName === 'Sunday') setNickNameState(true);
    else setNickNameState(false);
  };

  //닉네임이 미중복 확인 됐으니 다음으로 넘어가기(submit)
  const handleSubmitNickName = () => {
    console.log('넘어가기', targetIndex);
    setPopupText(false);
    setPopupItem(false);
    setTargetIndex(1);
  };

  const eneterNickNameContentItem = (
    <div className='w-full  outline-blue-500 py-[10px] flex- flex-col justify-start items-center'>
      <div className='w-full h-fit outline-blue-200 flex flex-row justify-between items-center'>
        <input
          className='h-[60px] w-[90%] rounded-[10px] bg-[rgba(255,255,255,0.3)] text-white pl-[20px] p-[10px] text-[25px] font-PtdRegular'
          type='text'
          value={nickName}
          placeholder='닉네임을 입력해주세요 (3~10자)'
          onChange={handleCheckNickName}
        />
        <button
          className='h-[60px] w-[60px] rounded-[10px] flex justify-center items-center'
          style={
            nickNameState
              ? { backgroundColor: '#18C609' }
              : nickNameCheckBtnState
              ? { backgroundColor: '#fed745' }
              : { backgroundColor: '#d9d9d9' }
          }
          onClick={nickNameState ? handleSubmitNickName : checkNickName}
        >
          {nickNameState ? ( //가능한 닉네임 확인되면 Next, 그 전까지는 Check
            /* next */
            <svg
              stroke='currentColor'
              fill='white'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='50px'
              width='50px'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z'></path>
            </svg>
          ) : (
            /* check */
            <svg
              stroke='currentColor'
              fill='white'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='50px'
              width='50px'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z'></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className=' h-[40px] w-full py-[10px] pl-[20px] text-[20px] flex justify-start items-center font-PtdRegular'
        style={
          nickNameState === null
            ? undefined
            : nickNameState
            ? { color: 'green' }
            : { color: 'red' }
        }
      >
        {nickNameState === null
          ? ''
          : nickNameState
          ? '사용 가능한 닉네임입니다.'
          : '이미 존재하는 닉네임입니다.'}
      </div>
    </div>
  );

  //////////////////////////////////////////////////// 관심있는 분야
  const interestsItems: string[] = ['언어', '역사', '지리', '경제', '없음'];
  const [selectedInterest, setSelectedInterest] = useState<string>('');

  const submitInterest = (index: number) => {
    const tempInterest = interestsItems[index];
    setSelectedInterest(interestsItems[index]);
    setPopupText(false);
    setPopupItem(false);
    if (tempInterest === '없음') setTargetIndex(3);
    else setTargetIndex(2);
  };
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const hoveredStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.3)',
  };

  const selectInterests = (
    <div className='outline-white h-[130px] py-[15px] flex justify-self-start'>
      <div className='w-5/6 h-full flex flex-row justify-between items-center '>
        {interestsItems.map((item, index) => (
          <button
            className='bg-[rgba(255,255,255,0.15)] rounded-[5px] h-2/3 mr-4 flex justify-center items-center font-PtdRegular text-[24px] text-white'
            style={{
              width: `${100 / interestsItems.length}%`,
              ...(hoveredIndex === index ? hoveredStyle : {}),
            }}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => submitInterest(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  /////////////////////////////////////////////////

  const takeQuiz = (
    <div className=' outline-white h-[180px] flex flex-col justify-between items-center'>
      <button
        className='w-full h-[80px] bg-[rgba(255,255,255,0.15)] rounded-[5px] text-left text-white pl-[20px] font-PtdLight text-[30px]'
        style={hoveredIndex === -3 ? hoveredStyle : {}}
        onClick={() => {
          setPopupText(false);
          setPopupItem(false);
          setTargetIndex(4);
        }}
        onMouseEnter={() => setHoveredIndex(-3)}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        "좋아, 얼마든지 내보라구!"
      </button>
      <button
        className='w-full h-[80px] bg-[rgba(255,255,255,0.15)] rounded-[5px] text-left text-white pl-[20px] font-PtdLight text-[30px]'
        style={hoveredIndex === -4 ? hoveredStyle : {}}
        onClick={() => {
          setPopupText(false);
          setPopupItem(false);
          setTargetIndex(3);
        }}
        onMouseEnter={() => setHoveredIndex(-4)}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        "아니... 난 관심이 있다고 했지, 잘 한다고 한 적 없어"
      </button>
    </div>
  );

  const mustTakeQuiz = (
    <div className=' outline-white h-[180px] flex flex-col justify-between items-center'>
      <button
        className='w-full h-[80px] bg-[rgba(255,255,255,0.15)] rounded-[5px] text-left text-white pl-[20px] font-PtdLight text-[30px]'
        style={hoveredIndex === -7 ? hoveredStyle : {}}
        onClick={() => {
          setPopupText(false);
          setPopupItem(false);
          setTargetIndex(4);
        }}
        onMouseEnter={() => setHoveredIndex(-7)}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        "그래 좋아! 일단 해보지 뭐!"
      </button>
    </div>
  );
  const [quizTargetIndex, setQuizTargetIndex] = useState<number>(0);

  /////////////////////////////////////////////////

  const quizList: quizItemType[] = [
    {
      difficulty: '상',
      category: '역사',
      quizText: '다음 중 가장 오래된 고대 문명은 어디인가요?',
      answer: '메소포타미아',
      selections: ['메소포타미아', '이집트', '중국', '인도문명'],
    },
    {
      difficulty: '하',
      category: '역사',
      quizText: '역사 문제 2?',
      answer: '메소포타미아',
      selections: ['메소포타미아', '이집트', '중국', '인도문명'],
    },
    {
      difficulty: '중',
      category: '역사',
      quizText: '역사 문제 3?',
      answer: '메소포타미아',
      selections: ['메소포타미아', '이집트', '중국', '인도문명'],
    },
  ];

  const [selectAnswer, setSelectAnswer] = useState<string>('');
  const checkAnswer = (answer: string) => {
    return setQuizResult(selectAnswer === answer);
  };

  const [quizResult, setQuizResult] = useState<boolean | null>(null);
  const [quizResultImage, setQuizResultImage] = useState<string>('');
  useEffect(() => {
    if (quizResult !== null) {
      setPopupCorrectIcon(true);
      setTimeout(() => {
        setPopupCorrectIcon(false);
        setQuizResult(null);
        setQuizResultImage('');
        setSelectAnswer('');
        if (quizTargetIndex === 2) {
          setTargetIndex(5);
        } else {
          setQuizTargetIndex((prev) => prev + 1);
        }
      }, 2000);
      if (quizResult) {
        setQuizResultImage(loadedImages.CorrectAnswer);
      } else if (!quizResult) {
        setQuizResultImage(loadedImages.WrongAnswer);
      }
    }
  }, [quizResult]);

  const [popupCorrectIcon, setPopupCorrectIcon] = useState<boolean>(false);

  const showQuiz = (
    <div className=' outline-white absolute w-[600px] h-[720px] left-1/3 bottom-[100px] flex flex-col justify-stretch items-center '>
      <div className='h-[80px]  outline-red-400 w-full flex flex-col justify-end items-center'>
        <div className='w-full h-[60px] flex flex-row justify-between items-center rounded-t-[10px] bg-buttonRed font-PtdRegular text-white text-[18px]'>
          <div className='w-1/4 h-full  outline-blue-400 flex justify-center items-center'>
            난이도 : {quizList[quizTargetIndex].difficulty}
          </div>
          <div className='w-1/2 h-[60px]  outline-green-200 flex justify-center items-end'>
            <img src={loadedImages['TutorialQuizText']} alt='QuizText' />
          </div>
          <div className='w-1/4 h-full  outline-blue-400 flex justify-center items-center'>
            카테고리 : {quizList[quizTargetIndex].category}
          </div>
        </div>
      </div>
      <div className='h-[10px] bg-[#d9d9d9] w-full'>
        <div
          className='h-full bg-[#34e7ff]'
          style={{
            width: `${((quizTargetIndex + 1) * 100) / quizList.length}%`,
          }}
        ></div>
      </div>
      <div className='w-full flex-1 bg-white py-[25px] px-[40px] rounded-b-[10px]'>
        <div className='w-full h-full  flex flex-col justify-between items-center'>
          <div className=' outline-blue-400 w-full h-fit mb-[10px] font-PtdSemiBOld leading-[40px] flex justify-center items-center px-[30px] text-[35px] text-center py-[10px]'>
            {quizList[quizTargetIndex].quizText}
          </div>
          <div className=' outline-blue-200 flex-1 w-full flex flex-wrap justify-between content-between'>
            {quizList[quizTargetIndex].selections.map((item, index) => (
              <button
                key={index}
                className='h-[47%] w-[47%] rounded-[15px] bg-[#ededed] flex justify-center items-center text-[24px] font-PtdMedium'
                onClick={() => setSelectAnswer(item)}
                style={
                  selectAnswer === item
                    ? {
                        backgroundColor: '#FF6962',
                        color: 'white',
                      }
                    : {}
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div className=' outline-blue-200 h-[80px] w-full mt-[20px]'>
            <button
              className='rounded-[10px] bg-[#d9d9d9] w-full h-full text-[30px] font-medium text-white'
              style={selectAnswer !== '' ? { backgroundColor: '#FF6962' } : {}}
              onClick={() => checkAnswer(quizList[quizTargetIndex].answer)}
            >
              제출하기
            </button>
            {quizResult === null ? (
              <></>
            ) : (
              <div className='w-full h-full'>
                <CSSTransition
                  in={popupCorrectIcon}
                  timeout={1000}
                  classNames='CSSTransition-Tutorial-Popup'
                  unmountOnExit
                >
                  <div className='w-full h-full first-letter:w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-center items-center '>
                    <img
                      src={quizResultImage}
                      alt='quizResult'
                      className='opacity-80'
                    />
                  </div>
                </CSSTransition>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /////////////////////////////////////////////////

  const readyToGo = (
    <div className=' outline-white h-[180px] flex flex-col justify-between items-center'>
      <button
        className='w-full h-[80px] bg-[rgba(255,255,255,0.15)] rounded-[5px] text-left text-white pl-[20px] font-PtdLight text-[30px]'
        style={hoveredIndex === -9 ? hoveredStyle : {}}
        onClick={onClickEndTutorial}
        onMouseEnter={() => setHoveredIndex(-9)}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        WORLDY 세상으로 출발!
      </button>
    </div>
  );

  /////////////////////////////////////////////////

  const TutorialItemList: TutorialItemType[] = [
    {
      imgsrc: loadedImages['JoshHoldingBook'],
      contentText:
        '안녕, 내 이름은 Josh 야. 책 읽는 걸 매우 좋아해! 책을 읽다 보면 내가 경험해보지 못한 세상이 참 넓은 것 같아. 아차! 내 정신 좀 봐, ',
      contentCoreText: '넌 이름이 뭐야?',
      contentItem: eneterNickNameContentItem,
    },
    {
      imgsrc: loadedImages['JoshCurious'],
      contentText: `${nickName}! 아주 멋진 이름이구나! 월디 세계를 탐험하기 위해서는 알아야할 것들이 많아. 하지만 내가 쉽고 빠르게 도와줄게!`,
      contentCoreText: '혹시 평소에 관심있는 분야가 있니?',
      contentItem: selectInterests,
    },
    {
      imgsrc: loadedImages['JoshJumping'],
      contentText: `오! ${selectedInterest}에 대해 관심이 많구나! 그렇다면 내가 ${selectedInterest} 퀴즈를 내보도록 하지! 실력이 얼마나 되는지 한 번 확인해 볼까?`,
      contentItem: takeQuiz,
    },
    {
      imgsrc: loadedImages['JoshPanic'],
      contentText:
        '이런, 아직은 자신있는 분야가 없구나? 그렇다면 내가 랜덤한 분야의 퀴즈를 내볼게, 한 번 맞춰볼래? 너무 어렵진 않을 거야!',
      contentItem: mustTakeQuiz,
    },
    {
      imgsrc: loadedImages['JoshSitting'],
      contentItem: showQuiz,
    },
    {
      imgsrc: loadedImages['JoshReady'],
      contentText:
        '좋아! 잘 했어. 방금 푼 퀴즈들은 앞으로 우리가  만나게 될 WORLDY 세상의 맛보기일 뿐이야. 이제 준비가 된 것 같은데, 어때? 바로 출발할까?',
      contentItem: readyToGo,
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
      {loadedAll ? (
        <div
          className=' w-screen h-full'
          style={{
            backgroundImage: `url(${loadedImages['TutorialBackground']})`,
            backgroundSize: '100%',
          }}
        >
          <div className='w-full h-full relative'>
            <div className='z-20 absolute w-1/4 h-full flex flex-row justify-end items-end'>
              <img
                className='h-[90%]'
                src={TutorialItemList[targetIndex].imgsrc}
                alt='조쉬조 쉬조쉬'
              />
            </div>
            <div className='z-10 absolute top-1/2 bg-[rgba(0,0,0,0.8)] w-full h-1/2 flex justify-end'>
              <div className='h-full w-3/4 py-10 pl-20 pr-10'>
                <div className='w-3/5 h-fit flex flex-col justify-between items-start'>
                  <div className='outline-white h-[30px] w-full font-PtdLight text-[#f9c53a] text-[20px] flex justify-start items-center'>
                    <CSSTransition
                      in={popupName}
                      timeout={3000}
                      classNames='CSSTransition-Tutorial-Popup'
                      unmountOnExit
                    >
                      <div>{targetIndex !== 4 ? name : null}</div>
                    </CSSTransition>
                  </div>
                  <div className='h-fit w-full my-[10px] text-white text-[30px] font-PtdExtraLight leading-[45px] py-[5px]'>
                    <CSSTransition
                      in={popupText}
                      timeout={1000}
                      classNames='CSSTransition-Tutorial-Popup'
                      unmountOnExit
                    >
                      <div>
                        {TutorialItemList[targetIndex].contentText}
                        <div className='border-b-[1.5px] border-b-white border-solid w-fit font-PtdLight'>
                          {TutorialItemList[targetIndex].contentCoreText}
                        </div>
                      </div>
                    </CSSTransition>
                  </div>
                  <div className='outline-white flex-1 max-h-full w-full flex flex-col justify-end items-center'>
                    <CSSTransition
                      in={popupItem}
                      timeout={1000}
                      classNames='CSSTransition-Tutorial-Popup'
                      unmountOnExit
                    >
                      <div className='w-full h-full  outline-red-400'>
                        {TutorialItemList[targetIndex].contentItem}
                      </div>
                    </CSSTransition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderPyramid text='Josh 앉히는 중...' />
        </div>
      )}
    </>
  );
}
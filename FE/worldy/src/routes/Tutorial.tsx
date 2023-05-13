import * as React from 'react';

import {
  addNickname,
  addRankInfo,
  loginToken,
  myRank,
} from '../_store/slices/loginSlice';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import CrAnswer from '../assets/images/CorrectAnswer.png';
import CustomAxios from '../API/CustomAxios';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import WrAnswer from '../assets/images/WrongAnswer.png';
import axios from 'axios';
import { useNavigate } from 'react-router';
import pathJC from '../assets/images/JoshCurious.png';
import pathJHB from '../assets/images/JoshHoldingBook.png';
import pathJJ from '../assets/images/JoshJumping.png';
import pathJP from '../assets/images/JoshPanic.png';
import pathJR from '../assets/images/JoshReady.png';
import pathJS from '../assets/images/JoshSitting.png';
import pathTB from '../assets/images/TutorialBackground.png';
import pathTQT from '../assets/images/TutorialQuizText.png';
import { useDispatch } from 'react-redux';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';

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

type MyRankInfo = {
  rank: number;
  nickName: string;
  profileImg: string;
  tier: string;
  level: number;
  percent: number;
  exp: number;
};

export default function Tutorial() {
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

  const [myRankInfo, setAxiosMyRankInfo] = useState<MyRankInfo>();

  useEffect(() => {
    dispatch(
      addRankInfo({
        rank: myRankInfo?.rank || 1,
        tier: myRankInfo?.tier || 'Bronze',
        level: myRankInfo?.level || 1,
        exp: myRankInfo?.exp || 0,
      })
    );
  }, [myRankInfo]);
  useEffect(() => {
    getRankInfoList();
  }, []);

  const getRankInfoList = async () => {
    console.log('Session에서의 가져오는 토큰', getLoginToken);
    try {
      const response = await CustomAxios({
        APIName: 'getRankInfoList',
        APIType: 'get',
        UrlQuery: `https://k8a507.p.ssafy.io/api/game/ranking`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      console.log('랭크 리스트 받은 거: ', response);
      setAxiosMyRankInfo(response.myRank);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    //console.log('token이 무엇이냐 ', token);
  };

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
        //console.log(loadedImages);
      }, 300);
    }
  }, [isLoaded]);

  //////////////////////////////
  const name = 'Josh';

  //   닉네임 입력창 관련/////////////////////////////////////
  const [nickName, setNickName] = useState<string>('');

  // 가능한 닉네임인가? true : 제출 가능 상태, false : 다시 입력해야하
  const [noDupNickName, setNoDupNickName] = useState<boolean | null>(null);

  //닉네임값 업데이트
  const handleCheckNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setNickName(inputText);
  };

  //닉네임 입력 버튼 관련 true : 3~8자 채움 false : 길이 불가능
  const [ableNickNameLength, setAbleNickNameLength] = useState<boolean>(false);

  const [checkNicknameResult, setCheckNicknameResult] = useState(null);
  const [submitkNicknameResult, setSubmitNicknameResult] = useState(null);
  const getLoginToken: string | null = sessionStorage.getItem('token');

  //닉네임 길이가 3~8자일 때만 체크 가능ㄴ
  useEffect(() => {
    setNoDupNickName(null);
    if (nickName.length >= 3 && nickName.length <= 8) {
      setAbleNickNameLength(true);
    } else {
      setAbleNickNameLength(false);
    }
  }, [nickName]);

  const dispatch = useDispatch();

  const setFinalNickname = () => {
    dispatch(addNickname(nickName));
  };

  //닉네임이 Sunday(중복X)이면 true, 중복이면 false
  const checkNickNameDup = async () => {
    if (nickName.length >= 3 && nickName.length <= 8) {
      await checkNicknameAxios();
    }
  };

  useEffect(() => {
    if (checkNicknameResult === null) setNoDupNickName(null);
    else if (checkNicknameResult === false) setNoDupNickName(true);
    else setNoDupNickName(false);
  }, [checkNicknameResult]);

  //닉네임이 미중복 확인 됐으니 다음으로 넘어가기(submit)
  const handleSubmitNickName = async () => {
    //console.log('넘어가기', targetIndex);
    setFinalNickname(); //redux에 닉네임 저장
    await submitNickNameAxios(); //서버에 닉네임 저장
    //console.log('submitNickNameAxios 결과', submitkNicknameResult);
    setPopupText(false);
    setPopupItem(false);
    setTargetIndex(1);
  };

  useEffect(() => {
    //console.log('닉네임 중복 결과 ', checkNicknameResult);
  }, [checkNicknameResult]);

  const checkNicknameAxios = async () => {
    console.log('Session에서의 가져오는 토큰', getLoginToken);
    try {
      const response = await CustomAxios({
        APIName: 'checkNickName',
        APIType: 'get',
        UrlQuery: `https://k8a507.p.ssafy.io/api/user/check/${nickName}`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      setCheckNicknameResult(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    //console.log('token이 무엇이냐 ', token);
  };

  // const checkNicknameAxiosBasic = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${loginToken}`,
  //       },
  //     };
  //     const checkNicknameResponse = await axios.get(
  //       `https://k8a507.p.ssafy.io/api/user/check/${nickName}`,
  //       config
  //     );
  //     console.log('checknickname 결과', checkNicknameResponse);
  //   } catch (error) {
  //     console.error('카카오 로그인 새로운 api 실패', error);
  //   }
  // };

  const submitNickNameAxios = async () => {
    try {
      const response = await CustomAxios({
        APIName: 'submitNickName',
        APIType: 'put',
        UrlQuery: `https://k8a507.p.ssafy.io/api/user/nickname/${nickName}`,
        Token: getLoginToken,
      });

      setSubmitNicknameResult(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const eneterNickNameContentItem = (
    <div className='w-full  outline-blue-500 py-[10px] flex- flex-col justify-start items-center '>
      <div className='w-full h-fit outline-blue-200 flex flex-row justify-between items-center'>
        <input
          className='h-[60px] w-[90%] rounded-[10px] bg-[rgba(255,255,255,0.3)] text-white pl-[20px] p-[10px] text-[25px] font-PtdRegular'
          type='text'
          value={nickName}
          placeholder='닉네임을 입력해주세요 (3~8자)'
          onChange={handleCheckNickName}
        />
        <button
          className='h-[60px] w-[60px] rounded-[10px] flex justify-center items-center'
          style={
            noDupNickName === true
              ? { backgroundColor: '#18C609' }
              : ableNickNameLength
              ? { backgroundColor: '#fed745' }
              : { backgroundColor: '#d9d9d9' }
          }
          onClick={noDupNickName ? handleSubmitNickName : checkNickNameDup}
        >
          {noDupNickName ? ( //가능한 닉네임 확인되면 Next, 그 전까지는 Check
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
          noDupNickName === null
            ? undefined
            : noDupNickName
            ? { color: 'green' }
            : { color: 'red' }
        }
      >
        {noDupNickName === null
          ? ''
          : noDupNickName
          ? '사용 가능한 닉네임입니다.'
          : '이미 존재하는 닉네임입니다.'}
      </div>
    </div>
  );

  //////////////////////////////////////////////////// 관심있는 분야
  const interestsItems: string[] = ['문화', '역사', '시사', '없음'];
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [selectedInterestIndex, setSelectedInterestIndex] = useState<number>(0);

  const submitInterest = (index: number) => {
    setSelectedInterestIndex(index);
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
          setSelectedInterestIndex(3);
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

  const quizList: quizItemType[][] = [
    [
      {
        difficulty: '하',
        category: '문화/역사',
        quizText: '다음 중 빈센트 반 고흐의 작품을 골라주세요.',
        answer: '별이 빛나는 밤',
        selections: ['가니카', '거울 앞의 소녀', '데모셀', '별이 빛나는 밤'],
      },
      {
        difficulty: '중',
        category: '문화/역사',
        quizText:
          '다음 중 유네스코 세계문화유산에 등재된 이탈리아의 고고학적 유산을 골라주세요.',
        answer: '콜로세움',
        selections: ['콜로세움', '아테네 학당', '스톤헨지', '테베의 절'],
      },
      {
        difficulty: '상',
        category: '문화/역사',
        quizText:
          '무용 예술의 한 종류인 [카타크]는 어느 나라의 전통 무용을 골라주세요.',
        answer: '인도',
        selections: ['인도', '이집트', '터키', '이란'],
      },
    ],
    [
      {
        difficulty: '하',
        category: '역사',
        quizText: '한글을 창제하신 분을 골라주세요.',
        answer: '세종대왕',
        selections: ['세종대왕', '이성계', '이순신', '장영실'],
      },
      {
        difficulty: '중',
        category: '역사',
        quizText:
          '다음 중 루이 16세와 함께 프랑스 혁명 시기 중요 인물인 마리 앙투아네트의 국적을 골라주세요.',
        answer: '오스트리아',
        selections: ['프랑스', '오스트리아', '영국', '스페인'],
      },
      {
        difficulty: '상',
        category: '역사',
        quizText: '1차 세계 대전이 시작된 연도는 언제인가요?',
        answer: '1914년',
        selections: ['1905년', '1914년', '1917년', '1939년'],
      },
    ],
    [
      {
        difficulty: '하',
        category: '시사',
        quizText:
          '다음 중 신종 코로나바이러스 감염증 (COVID-19)이 처음 발생한 중국의 도시를 골라주세요.',
        answer: '우한',
        selections: ['상하이', '베이징', '광저우', '우한'],
      },
      {
        difficulty: '중',
        category: '시사',
        quizText: '대한민국에서 IMF 구제 금융 요청이 체결된 년도를 골라주세요.',
        answer: '1997년도',
        selections: ['1995년도', '1997년도', '1999년도', '2001년도'],
      },
      {
        difficulty: '상',
        category: '시사',
        quizText:
          '다음 중 국제 금융기구인 세계은행의 본부가 위치한 나라을 골라주세요.',
        answer: '미국',
        selections: ['미국', '캐나다', '프랑스', '영국'],
      },
    ],
    [
      {
        difficulty: '하',
        category: '시사',
        quizText:
          '다음 중 신종 코로나바이러스 감염증 (COVID-19)이 처음 발생한 중국의 도시을 골라주세요.',
        answer: '우한',
        selections: ['상하이', '베이징', '광저우', '우한'],
      },
      {
        difficulty: '중',
        category: '역사',
        quizText:
          '다음 중 루이 16세와 함께 프랑스 혁명 시기 중요 인물인 마리 앙투아네트의 국적을 골라주세요.',
        answer: '오스트리아',
        selections: ['프랑스', '오스트리아', '영국', '스페인'],
      },
      {
        difficulty: '상',
        category: '문화/역사',
        quizText:
          '무용 예술의 한 종류인 [카타크]는 어느 나라의 전통 무용을 골라주세요.',
        answer: '인도',
        selections: ['인도', '이집트', '터키', '이란'],
      },
    ],
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

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  const showQuiz = (
    <div className=' outline-white absolute w-[600px] h-[720px] left-1/3 bottom-[100px] flex flex-col justify-stretch items-center '>
      <div className='h-[80px]  outline-red-400 w-full flex flex-col justify-end items-center'>
        <div className='w-full h-[60px] flex flex-row justify-between items-center rounded-t-[10px] bg-buttonRed font-PtdRegular text-white text-[18px]'>
          <div className='w-1/4 h-full  outline-blue-400 flex justify-center items-center'>
            난이도 :{' '}
            {quizList[selectedInterestIndex][quizTargetIndex].difficulty}
          </div>
          <div className='w-1/2 h-[60px]  outline-green-200 flex justify-center items-end'>
            <img src={loadedImages['TutorialQuizText']} alt='QuizText' />
          </div>
          <div className='w-1/4 h-full  outline-blue-400 flex justify-center items-center'>
            카테고리 :{' '}
            {quizList[selectedInterestIndex][quizTargetIndex].category}
          </div>
        </div>
      </div>
      <div className='h-[10px] bg-[#d9d9d9] w-full'>
        <div
          className='h-full bg-[#34e7ff]'
          style={{
            width: `${((quizTargetIndex + 1) * 100) / 3}%`,
          }}
        ></div>
      </div>
      <div className='w-full flex-1 bg-white py-[25px] px-[40px] rounded-b-[10px]'>
        <div className='w-full h-full  flex flex-col justify-between items-center'>
          <div className=' outline-blue-400 w-full h-fit mb-[10px] font-PtdSemiBOld leading-[40px] flex justify-center items-center px-[30px] text-[35px] text-center py-[10px]'>
            {quizList[selectedInterestIndex][quizTargetIndex].quizText}
          </div>
          <div className=' outline-blue-200 flex-1 w-full flex flex-wrap justify-between content-between'>
            {quizList[selectedInterestIndex][quizTargetIndex].selections.map(
              (item, index) => (
                <button
                  key={index}
                  className={`h-[47%] w-[47%] rounded-[15px] bg-[#ededed] flex justify-center items-center text-[24px] font-PtdMedium  ${
                    quizResult !== null &&
                    quizList[selectedInterestIndex][quizTargetIndex].answer ===
                      item
                      ? 'outline outline-[8px] outline-blue-300'
                      : ''
                  }`}
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
              )
            )}
          </div>
          <div className=' outline-blue-200 h-[80px] w-full mt-[20px]'>
            <button
              className={`rounded-[10px] bg-[#d9d9d9] w-full h-full text-[30px] font-medium text-white`}
              style={selectAnswer !== '' ? { backgroundColor: '#FF6962' } : {}}
              onClick={() =>
                checkAnswer(
                  quizList[selectedInterestIndex][quizTargetIndex].answer
                )
              }
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
                      className='opacity-80 w-[150px]'
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
        onClick={() => {
          navigateHome();
        }}
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

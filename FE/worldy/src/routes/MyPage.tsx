import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import pathBG from '../assets/images/MyPageBackground.png';
import {
  BsFillPersonLinesFill,
  BsBookmarksFill,
  BsFillCaretDownFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { BiLogOut, BiBrain } from 'react-icons/bi';
import { IoIosLogOut, IoLogoGameControllerB } from 'react-icons/io';
import { AiOutlineBulb } from 'react-icons/ai';
import { FiArrowUpRight } from 'react-icons/fi';
import { SiPowerapps } from 'react-icons/si';
import { IoMdPower } from 'react-icons/io';

import {
  RiQuestionAnswerFill,
  RiSave3Fill,
  RiVipCrownFill,
} from 'react-icons/ri';
import { MdAccessTimeFilled, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { TbWorld, TbCategory2 } from 'react-icons/tb';
import moment from 'moment';

import '../styles/MyPageStyles.css';
import '../styles/TailWind.css';

import QuizModal from '../components/QuizModal';
import QNAMoveButton from '../components/QNAMoveButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  loginNickName,
  loginProfileImg,
  logout,
} from '../_store/slices/loginSlice';
import { useSelector } from 'react-redux';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import LoaderBlueCircle from '../components/Loaders/LoaderBlueCircle';
import CustomAxios from '../API/CustomAxios';

type MyPageMenuType = {
  icon: React.ReactNode;
  title: string;
  move: boolean;
  onMove: () => void;
};

type MyPageContentType = {
  title: string;
  contentInfo: string | null;
  content?: JSX.Element;
};

export type ScrappedQuizType = {
  quizId: number; //퀴즈 id
  nationName: string; //국가명
  level: number; //퀴즈 수준
  quizType: string; //퀴즈 유형
  category: string; //카테고리
  image: string; //이미지
  content: string; //문제
  answer: string; //정답
  multiFirst: string | null; //1번
  multiSecond: string | null; //2번
  multiThird: string | null; //3번
  multiFourth: string | null; //4번
  hint: boolean; //힌트
  commentary: string; //힌트 유형
  userAnswer: string | null; //유저가 적은 정답(맞았으면 null)
  success: boolean; //맞춘 문제인가
  explanation?: string;
};

export default function MyPage({
  setRef,
  handleQnaModal,
}: {
  setRef: string;
  handleQnaModal: (input: number) => void;
}) {
  const myImageList = {
    pathBG: pathBG,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 1000);
    }
  }, [isLoaded]);

  const containerRef = useRef<HTMLDivElement>(null);
  const accountInfoRef = useRef<HTMLDivElement>(null);
  const quizScrapRef = useRef<HTMLDivElement>(null);
  const gameLogRef = useRef<HTMLDivElement>(null);
  const QARef = useRef<HTMLDivElement>(null);
  const loginRecordRef = useRef<HTMLDivElement>(null);
  const logoutRef = useRef<HTMLDivElement>(null);

  const userNickname: string = sessionStorage.getItem('nickname') || '';
  const userProfileImg: string | null = sessionStorage.getItem('profileImg');

  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current && ref.current) {
      const container = containerRef.current;
      const contentPosition = ref.current.offsetTop - container.offsetTop;
      container.scrollTo({ top: contentPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (setRef !== '') {
      for (let i = 0; i < MyPageMenuItems.length; i++) {
        if (setRef === MyPageMenuItems[i].title) {
          MyPageMenuItems[i].onMove();
          return;
        }
      }
    }
  }, []);

  const MyPageMenuItems: MyPageMenuType[] = [
    {
      icon: <BsFillPersonLinesFill />,
      title: '계정 정보',
      onMove: () => scrollToContent(accountInfoRef),
      move: false,
    },
    {
      icon: <BsBookmarksFill />,
      title: '퀴즈 스크랩',
      onMove: () => scrollToContent(quizScrapRef),
      move: false,
    },
    {
      icon: <IoLogoGameControllerB size={26} />,
      title: '랭킹',
      onMove: () => scrollToContent(gameLogRef),
      move: false,
    },
    {
      icon: <RiQuestionAnswerFill />,
      title: 'Q&A',
      onMove: () => scrollToContent(QARef),
      move: true,
    },
    // {
    //   icon: <MdAccessTimeFilled />,
    //   title: '로그인 기록',
    //   onMove: () => scrollToContent(loginRecordRef),
    //   move: false,
    // },
    {
      icon: <IoIosLogOut />,
      title: '로그아웃',
      onMove: () => scrollToContent(logoutRef),
      move: false,
    },
  ];

  const [myPageMenuHoverState, setMyPageMenuHoverState] = useState<number>(-1);

  const handleMyPageMenuHoverState = (input: number) => {
    setMyPageMenuHoverState(input);
  };

  const MyPageMenuComponent = ({
    input,
    key,
  }: {
    input: MyPageMenuType;
    key: number;
  }) => {
    return (
      <button
        key={key}
        onMouseEnter={() => handleMyPageMenuHoverState(key)}
        onMouseLeave={() => handleMyPageMenuHoverState(-1)}
        className='w-full h-[2em] flex flex-row justify-start items-center mb-[1em]  pl-[15px]'
        onClick={input.onMove}
      >
        <span
          className={`${
            myPageMenuHoverState === key ? 'text-buttonRed' : 'text-gray-300'
          } text-[1.5em] p-[.1em] w-[2em] flex flex-row justify-start items-center`}
        >
          {input.icon}
        </span>
        <span
          className={`w-full ml-[.5em] text-[1.2em] text-white font-PtdMedium flex flex-row justify-between items-center`}
        >
          {input.title}
          {input.move && <FiArrowUpRight className='mr-[1em]' />}
        </span>
      </button>
    );
  };

  const MyPageContentComponent = (input: MyPageContentType) => {
    return (
      <div className=' w-[95%] min-h-[100px] h-fit outline-white flex flex-row justify-stretch items-start bg-[rgb(39,32,32)]'>
        <div
          className=' w-2/5  h-full p-[50px] flex flex-col justify-start items-start
        '
        >
          <span className='text-white font-PtdBold text-[40px] mb-[.5em]'>
            {input.title}
          </span>
          <span className='text-white font-PtdLight text-[16px] leading-[22px]'>
            {input.contentInfo}
          </span>
        </div>
        <div className=' w-3/5 h-fit p-[50px] bg-[rgb(49,47,45)]'>
          {input.content}
        </div>
      </div>
    );
  };

  const date = moment().format('YYYY-MM-DD');

  const level = 3;
  const exp = 29;

  const levelContent = (): JSX.Element => {
    return (
      <div className='w-[500px] flex flex-row justify-between items-center'>
        <span className='mr-[20px]'>LV.{level}</span>
        <div className=' w-full h-[40px]  ml-[20px] flex flex-col justify-between items-start  outline-white'>
          <div className='w-fit text-[15px] h-fit flex flex-row justify-center items-center '>
            EXP : ({exp}/100)
          </div>
          <div className='relative h-[10px] w-[400px] outline outline-[rgba(255,255,255,0.5)] flex flex-row justify-start items-center'>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div className='z-10 h-full w-1/6 border-0 border-r-[1px] border-solid border-[rgba(255,255,255,0.3)]'></div>
            <div
              className='absolute top-0 left-0 h-[10px] bg-blue-300'
              style={{ width: `${exp}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  const tierContent = (): JSX.Element => {
    return (
      <div className='w-[500px]  h-[40px]  my-[10px] flex flex-row justify-between items-center'>
        <div
          className={`${
            rankInfo[1] === '브론즈' ? 'opacity-100' : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Bronze
          <SiPowerapps size={22} color={'#6a3805'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            rankInfo[1] === '실버' ? 'opacity-100' : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Silver
          <SiPowerapps size={22} color={'#a4a4a4'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            rankInfo[1] === '골드' ? 'opacity-100' : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Gold
          <SiPowerapps size={22} color={'#C9B037'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            rankInfo[1] === '플레티넘' ? 'opacity-100' : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Platinum
          <SiPowerapps size={22} color={'#86FFF8'} className='ml-[10px]' />
        </div>
      </div>
    );
  };

  const accountInfoContentComponent = () => {
    return (
      <div className='w-[95%] min-h-300px h-fit'>
        <div className='w-full h-fit flex flex-row justify-between items-center'>
          <div className='flex-1 h-full mb-[15px] mr-[20px]'>
            {contentBoxComponent({ title: '닉네임', content: userNickname })}
          </div>
          <div className='w-[70px] h-[70px] rounded-full grid place-content-center overflow-hidden mb-[15px] outline-[5px] outline outline-[rgba(255,255,255,0.2)]'>
            <img
              src={userProfileImg || ''}
              alt='프로필 사진'
              className='w-full h-full'
            />
          </div>
        </div>
        <div className='w-full h-full mb-[15px]'>
          {contentBoxComponent({
            title: '레벨',
            content: levelContent(),
          })}
        </div>
        <div className='w-full h-full'>
          {contentBoxComponent({ title: '티어', content: tierContent() })}
        </div>
      </div>
    );
  };

  const [scrappedQuizTypeSelect, setScrappedQuizTypeSelet] =
    useState<number>(-1);
  const handleScrappedQuizTypeSelect = (input: number) => {
    setScrappedQuizTypeSelet(input === scrappedQuizTypeSelect ? -1 : input);
  };
  const clickQuizType = (input: number) => {
    handleQuizPopDownKeyState(input);
    handleScrappedQuizTypeSelect(input === 4 ? 1 : input);
  };

  const quizScrapContentComponent = () => {
    return (
      <div className=' outline-white w-full  h-fit flex flex-col justify-start items-center'>
        <div className='w-full h-1/3 mb-[20px]'>
          <button
            className={`w-full h-[50px]  flex justify-center items-center rounded-lg p-[10px]
            ${
              scrappedQuizTypeSelect === 0
                ? 'bg-[rgba(255,255,255,0.2)]'
                : 'bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.2)] '
            }
            `}
            onClick={() => clickQuizType(0)}
          >
            <span className='text-white text-[20px] font-PtdSemiBOld'>
              전체
            </span>
          </button>
        </div>
        <div className='w-full h-1/3 flex flex-row justify-between items-center mb-[20px]'>
          <button
            className={`w-[30%] h-[50px]  flex justify-center items-center rounded-lg p-[10px]
            ${
              scrappedQuizTypeSelect === 1
                ? 'bg-[rgba(255,255,255,0.2)]'
                : 'bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.2)] '
            }
            `}
            onClick={() => clickQuizType(1)}
          >
            <span className='text-white text-[18px] font-PtdSemiBOld'>
              나라별
            </span>
          </button>
          <button
            className={`w-[30%] h-[50px]  flex justify-center items-center rounded-lg p-[10px]
            ${
              scrappedQuizTypeSelect === 2
                ? 'bg-[rgba(255,255,255,0.2)]'
                : 'bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.2)] '
            }
            `}
            onClick={() => clickQuizType(2)}
          >
            <span className='text-white text-[18px] font-PtdSemiBOld'>
              난이도별
            </span>
          </button>

          <button
            className={`w-[30%] h-[50px] flex justify-center items-center rounded-lg p-[10px]
            ${
              scrappedQuizTypeSelect === 3
                ? 'bg-[rgba(255,255,255,0.2)]'
                : 'bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.2)] '
            }
            `}
            onClick={() => clickQuizType(3)}
          >
            <span className='text-white text-[18px] font-PtdSemiBOld'>
              카테고리별
            </span>
          </button>
        </div>
        <div
          className={`outline-red-600 w-full  transition-all duration-1000 flex flex-row justify-stretch items-stretch rounded-t-xl ${
            quizPopDownBoxState
              ? 'h-[400px] py-[15px] bg-[rgba(0,0,0,0.5)] opcaity-100 pt-[30px] '
              : 'h-0 opacity-0'
          } px-[10px] pb-[0px]`}
        >
          <div className='w-[140px] h-full  outline-blue-300 overflow-y-scroll  px-[15px]'>
            {quizSelectMenuList[
              quizPopDownKeyState === -1 ? 0 : quizPopDownKeyState
            ].map((item, key) => quizMenuBar({ input: item, key: key }))}
          </div>
          <div className='flex-1 h-full  outline-white overflow-y-scroll flex flex-col justify-start items-start px-[10px]'>
            {tempScrappedQuizList.map((item, key) =>
              quizPreviewBox({ input: item, key: key })
            )}
          </div>
        </div>
        <button
          className={`w-full h-[50px]  outline-white flex justify-center items-center text-white transition-all duration-1000 rounded-b-xl py-[20px]
          ${quizPopDownBoxState ? 'bg-[rgba(0,0,0,0.5)]' : ''}`}
          onClick={() => clickQuizType(4)}
        >
          <div>
            <MdKeyboardDoubleArrowRight
              size={30}
              className={`
              transition-all duration-1000
              ${!quizPopDownBoxState ? 'rotate-[90deg]' : '-rotate-[90deg]'}`}
            />
          </div>
        </button>
      </div>
    );
  };

  const quizSelectMenuList: string[][] = [
    ['전체'],
    [
      '전체',
      '가나',
      '남아공',
      '뉴질랜드',
      '대한민국',
      '독일',
      '멕시코',
      '모르코',
      '미국',
      '브라질',
      '사우디',
      '사하라',
      '소말리아',
      '스위스',
      '스페인',
      '싱가포르',
      '영국',
      '이집트',
      '이탈리아',
      '인도',
      '일본',
      '중국',
      '지중해',
      '칠레',
      '캐나다',
      '태국',
      '페루',
      '프랑스',
      '헝가리',
      '호주',
      '홍콩',
    ],
    ['전체', '상', '중', '하'],
    ['전체', '문화/역사', '시사', '기타'],
  ];

  const quizMenuBar = ({ input, key }: { input: string; key: number }) => {
    return (
      <button
        className={`w-full h-[47px]  grid place-content-center my-[2px] border-solid border-0 border-b-[0px]  hover:bg-[rgba(220,220,220,0.2)] hover:text-white font-PtdRegular rounded-md
        ${
          quizMenuSelected === key
            ? 'bg-[rgba(220,220,220,0.3)] text-white hover:bg-[rgba(220,220,220,0.3)]'
            : 'text-[rgba(220,220,220,0.5)] hover:bg-[rgba(220,220,220,0.2)]'
        }
        `}
        key={key}
        onClick={() => setQuizMenuSelected(key)}
      >
        <span className={`${key === 0 ? 'text-[22px]' : 'text-[16px]'} `}>
          {input}
        </span>
      </button>
    );
  };

  const [quizMenuSelected, setQuizMenuSelected] = useState<number>(0);

  /* from-[#958e8e] 
          via-[#76b8b2]
          to-[#00ffbf99] */
  const quizPreviewBox = ({
    input,
    key,
  }: {
    input: ScrappedQuizType;
    key: number;
  }) => {
    const diff: string =
      input.level === 1 ? '하' : input.level === 2 ? '중' : '상';
    const categ: string =
      input.category === 'cul'
        ? '문화'
        : input.category === 'aff'
        ? '시사'
        : '기타';
    return (
      <div className='w-full h-fit mb-[15px]' key={key}>
        <div
          className={`rounded-xl w-full h-[150px] bg-gradient-to-br from-[#a89e9e]  via-[#76b8b2] to-[#00eaff99] opacity-80 hover:opacity-100
          flex flex-row justify-stretch items-center p-[10px]
          `}
        >
          <div className='w-2/3 h-full  outline-red-300 flex flex-col justify-between items-stretch'>
            <div className='w-full h-[65%]  outline-red-500 flex flex-col justify-start items-start'>
              <span className='w-full truncate-multiline font-PtdRegular text-white text-[16px] leading-[20px] p-[10px] h-[70px]  pr-[15px] overflow-hidden '>
                {input.content}
              </span>
            </div>
            <div className='w-full h-[40px]  outline-yellow-500 pr-[15px] grid place-content-center '>
              <div
                className={`w-[180px] h-[30px] ${
                  input.success ? 'bg-[#26aaa5]' : 'bg-[#4f4f4f]'
                } rounded-xl`}
              >
                <button
                  onClick={() => handleQuizModal(key)}
                  className={`${
                    input.success ? 'button-success' : 'button-failed'
                  }
                w-full h-full `}
                >
                  {input.success ? 'Success' : 'Failed...'}
                </button>
              </div>
            </div>
          </div>
          <div className='w-1/3 h-full  outline-blue-300 flex flex-col justify-between p-[10px] px-[15px] items-center text-white text-[16px] font-PtdSemiBOld bg-[rgba(100,100,100,0.45)] rounded-md'>
            <div className='w-full h-1/3 outline-red-300 flex flex-row justify-between items-center '>
              <span>{input.nationName}</span>
              <TbWorld size={20} />
            </div>
            <div className='w-full h-1/3  outline-red-300 flex flex-row justify-between items-center'>
              <span>{diff}</span>
              <AiOutlineBulb size={20} />
            </div>
            <div className='w-full h-1/3  outline-red-300 flex flex-row justify-between items-center'>
              <span>{categ}</span>
              <TbCategory2 size={20} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [quizPopDownKeyState, setQuizPopDownKeyState] = useState<number>(-1);

  useEffect(() => {
    setQuizMenuSelected(0);
  }, [quizPopDownKeyState]);

  const handleQuizPopDownKeyState = (input: number) => {
    if (input === 4) {
      quizPopDownBoxState
        ? setQuizPopDownKeyState(-1)
        : setQuizPopDownKeyState(1);
    } else setQuizPopDownKeyState(quizPopDownKeyState === input ? -1 : input);
  };

  const [quizPopDownBoxState, setQuizPopDownBoxState] = useState<boolean>(true);

  useEffect(() => {
    setQuizPopDownBoxState(quizPopDownKeyState === -1 ? false : true);
    if (quizPopDownKeyState !== -1) scrollToContent(quizScrapRef);
  }, [quizPopDownKeyState]);

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
      hint: true, //힌트
      commentary: '일본은 한국보다 실제 시간이 30분 빠릅니다',
      userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
      success: true, //맞춘 문제인가
      explanation:
        '한국의 중앙 자오선은 동경 127.5°이며 일본의 중앙 자오선은 동경 135°로 일본이 30분 더 빠릅니다. 그러나 일제의 잔재로, 실제로는 일본 표준 자오선인 동경 135°에 맞춰 표준시를 사용하고 있습니다. 반면 북한은 광복 70주년에 표준시를 다시 30분 늦췄고 한국은 북한과 30분의 시차를 가지는 상황입니다.',
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
      hint: true, //힌트
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
      hint: true, //힌트
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
      hint: false, //힌트
      commentary: '힌트 무슨 유형인가', //힌트 유형
      userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
      success: false, //맞춘 문제인가
    },
  ];

  const contentBoxComponent = ({
    title,
    content,
  }: {
    title: string;
    content: any;
  }) => {
    return (
      <div className='w-full h-[80px] bg-[rgba(255,255,255,0.08)] flex flex-col justify-stretch items-start rounded-lg p-[10px]'>
        <div className='h-[15px] text-[rgba(255,255,255,0.5)] text-[13px] flex justify-start items-center'>
          {title}
        </div>
        <div className='flex-1 text-white text-[24px] flex justify-start items-center '>
          {content}
        </div>
      </div>
    );
  };

  const [quizModalState, setQuizModalState] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number>(0);

  const handleQuizModal = (select: number) => {
    setSelectedQuizId(select);
    setTimeout(() => {
      setQuizModalState(true);
    }, 100);
  };

  ////////////////////////////////////////
  type rankListType = {
    topTen: string[];
    myRank: number;
  };

  const inputList: rankListType = {
    topTen: [
      '설희',
      '미희',
      '원규',
      '한빈',
      '성훈',
      '희설킴',
      '희미팍',
      '규원킴',
      '빈한리',
      '훈성리',
    ],
    myRank: 92,
  };

  const [rankList, setMyRankList] = useState<rankListType>(inputList);

  const myRank = rankList.myRank;
  const rankInfo: string[] =
    myRank < 30
      ? ['#86FFF8', '플레티넘']
      : myRank < 80
      ? ['#C9B037', '골드']
      : myRank < 150
      ? ['#a4a4a4', '실버']
      : ['#6a3805', '브론즈'];
  const rankContent = (): JSX.Element => {
    // if (rankList.myRank <= 10) {
    //   const tempList: rankListType = rankList;
    //   tempList.topTen[rankList.myRank - 1] = myName;
    //   setMyRankList(tempList);
    // }

    return (
      <div className='w-full h-fit  outline-yellow-300'>
        {/* <div className='w-full h-[100px] flex flex-row justify-between items-center  outline-blue-300 px-[20px]'>
          <div className='w-fit h-2/3 px-[20px] bg-black rounded-xl grid place-content-center'>
            <span className='text-white text-[25px]'>
              나의 순위 : #.{rankList.myRank}
            </span>
          </div>
          <div className='w-fit h-2/3 px-[20px] flex flex-row justify-center items-center bg-black rounded-xl'>
            <span className='text-white flex flex-row justify-center items-center text-[25px] mr-[20px]'>
              RANK :
            </span>
            <div className='w-fit h-2/3  outline-white bg-[rgba(62,62,62,0.7)]  rounded-xl flex flex-row justify-center items-center px-[10px]'>
              <SiPowerapps
                size={25}
                color={rankInfo[0]}
                className='mr-[10px]'
              />
              <span
                className='text-[25px] font-PtdBold'
                style={{ color: rankInfo[0] }}
              >
                {rankInfo[1]}
              </span>
            </div>
          </div>
        </div> */}
        <div
          className={`w-full h-fit  outline-red-300 flex flex-col justify-start items-start transition-all duration-1000 ease-in-out`}
        >
          <div className='text-[#6A6A6A] font-PtdRegular text-[22px] mx-[15px] '>
            <span>{userNickname}</span>
            <span></span>
            님의 랭킹 정보
          </div>
          <div className='text-[#CBCBCB] font-PtdRegular text-[22px] mx-[15px] mt-[5px]'>
            <span>전체 플레이어 중 상위 </span>
            <span className='text-emerald-300'>
              {myRank}위, 15% 이내입니다.
            </span>
          </div>
          <div className='w-full h-[50px] flex flex-row justify-start items-start  text-white'></div>
          <div
            className={`w-full h-fit outline-white opacity-100 transition-all duration-1000  ease-in-out overflow-hidden flex flex-col justify-start items-center`}
          >
            <div className='w-[450px] h-[50px] flex flex-row justify-start items-center text-[20px] text-[#6A6A6A] font-PtdLight'>
              <span className='w-fit'>no.</span>
              <span className='w-fit ml-[20px]'>nickname</span>
              <span className='w-fit ml-[200px]'>level</span>
              <span className='place-content-right ml-[50px]'>tier</span>
            </div>

            {rankList.topTen.map((item, key) => (
              <div
                key={key}
                className={`rangking relative flex flex-row justify-start items-center mb-[7px] bg-[rgba(0,0,0,0)] hover:bg-[rgba(180,180,180,0.3)] px-[10px] rounded-md ${
                  key + 1 === myRank
                    ? 'glowmyrank z-10  w-[500px] h-[50px] my-[15px] '
                    : 'w-[490px] h-[45px]'
                }`}
              >
                <div className='relative w-[50px] h-[50px]  grid place-content-center'>
                  <span className='absolute top-0 left-0 w-[50px] h-[50px] grid place-content-center font-PtdLight text-[20px] text-gray-300'>
                    {key + 1}
                  </span>
                </div>
                <div className='w-fit h-fit flex flex-row justify-center items-center'>
                  <span className='font-PtdLight text-white text-[20px] ml-[30px]'>
                    {item}
                  </span>
                </div>
                <div className='w-[50px] flex-1 flex-row flex justify-start items-center pl-[20px]'>
                  <RiVipCrownFill
                    className={`${
                      key === 0
                        ? 'text-[#D1C68F]'
                        : key === 1
                        ? 'text-[#a4a4a4]'
                        : key === 2
                        ? 'text-[#837D63]'
                        : 'hidden'
                    }
                        ${key}
                        shadow-lg
                        w-[15px] h-[15px]
                        `}
                  />
                </div>
                <div className='w-[100px] flex-2 grid place-ontent-right pl-[20px]'>
                  <span className='font-PtdLight text-[20px] text-[#B2B2B2]'>
                    lv.1
                  </span>
                </div>
                <div className='w-fit h-2/3 bg-[rgba(62,62,62,0.7)] rounded-[100px] flex flex-row justify-center items-center px-[10px]'>
                  <SiPowerapps size={22} color={'#86FFF8'} />
                </div>
              </div>
            ))}
            <div className='w-full h-fit grid place-content-center'>
              <BsThreeDotsVertical
                size={20}
                color={'rgba(255,255,255,0.3)'}
                className='my-[10px]'
              />
            </div>
            {myRank > 10 && (
              <div
                className={`rangking w-[500px] h-[50px] flex flex-row justify-start items-center mt-[10px] mb-[25px] rounded-md bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(180,180,180,0.5)] px-[10px] glowmyrank z-10`}
              >
                <div className='relative w-[50px] h-[50px]  grid place-content-center'>
                  <span className='absolute top-0 left-0 w-[50px] h-[50px] grid place-content-center font-PtdLight text-[20px] text-gray-300'>
                    {myRank}
                  </span>
                </div>
                <div className='w-fit h-fit flex flex-row flex-1 justify-center items-center -ml-[200px]'>
                  <span className='font-PtdLight text-white text-[20px]'>
                    {userNickname}
                  </span>
                </div>
                <div className='w-[100px] flex-2 grid place-ontent-right'>
                  <span className='font-PtdLight text-[20px] text-[#B2B2B2]'>
                    lv.1
                  </span>
                </div>
                <div className='w-fit h-2/3 bg-[rgba(62,62,62,0.7)] rounded-[100px] flex flex-row justify-center items-center px-[10px]'>
                  <SiPowerapps size={22} color={rankInfo[0]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qnaLinkContent = (): JSX.Element => {
    return (
      <div className='w-full h-[100px]  grid place-content-center'>
        <QNAMoveButton handleQnaModal={handleQnaModal} />
      </div>
    );
  };

  const [logoutResult, setLogoutResult] = useState<any>();

  const logoutAxios = async () => {
    const loginToken = sessionStorage.getItem('token');
    console.log('로그아웃 시 토큰 : ', loginToken);
    try {
      const response = await CustomAxios({
        APIName: 'logout',
        APIType: 'get',
        UrlQuery: 'https://k8a507.p.ssafy.io/api/user/logout',
        Token: loginToken,
      });
      setLogoutResult(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const logoutClick = async () => {
    await logoutAxios().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  useEffect(() => {
    console.log('로그아웃 결과: ', logoutResult);
  }, [logoutResult]);

  const [iconColor, setIconColor] = useState<string>('#E6E6E6');

  const logoutContent = (): JSX.Element => {
    return (
      <div
        className='relative w-full h-[60px] outline-white grid place-content-center'
        onMouseEnter={() => setIconColor('#FF4D45')}
        onMouseLeave={() => setIconColor('#E6E6E6')}
      >
        <button className='logoutbtn' onClick={logoutClick}>
          <span className='logouticon w-fit h-fit outline-white'>
            <IoMdPower size={26} color={iconColor} />
          </span>
          <span className='logouttext  font-PtdSemiBOld'>
            로그아웃 하시겠습니까?
          </span>
        </button>
      </div>
    );
  };

  return (
    <div
      className='w-full h-full flex flex-row justify-center items-center overflow-y-clip'
      style={{ backgroundImage: `url(${pathBG})`, backgroundSize: '100%' }}
    >
      {loadedAll ? (
        <>
          {quizModalState && (
            <QuizModal
              input={tempScrappedQuizList[selectedQuizId]}
              closeModal={() => setQuizModalState(false)}
            />
          )}
          <div
            className={`w-[80%] h-full  flex flex-row justify-stretch items-center ${
              quizModalState ? 'blur-sm' : ''
            }`}
          >
            <div className='w-[25%] h-full pt-[5em]'>
              <div className='w-[90%] h-fit  flex flex-col items-start'>
                <div className='flex flex-row justify-start pl-[15px]'>
                  <span className='text-white font-PtdBold text-[3em]'>
                    마이 페이지
                  </span>
                </div>
                <div className='w-full h-fit my-[3em] '>
                  {MyPageMenuItems.map((item, index) =>
                    MyPageMenuComponent({ input: item, key: index })
                  )}
                </div>
              </div>
            </div>
            <div
              className='flex-1 h-full pt-[60px]  overflow-y-scroll pb-[30em]'
              ref={containerRef}
            >
              <div
                className=' w-full h-fit pt-[20px] text-white'
                ref={accountInfoRef}
              >
                {MyPageContentComponent({
                  title: '계정 정보',
                  contentInfo:
                    '계정 정보 중, Worldy Game 닉네임은 게임 내에서 특정 플레이어를 인식하거나 찾을 때 사용됩니다.',
                  content: accountInfoContentComponent(),
                })}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={quizScrapRef}>
                {MyPageContentComponent({
                  title: '퀴즈 스크랩',
                  contentInfo:
                    '지난 세계 탐험 여행에서 만난 다양한 퀴즈 중, 플레이어가 따로 저장해둔 퀴즈들을 모아 볼 수 있습니다.',
                  content: quizScrapContentComponent(),
                })}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={gameLogRef}>
                {MyPageContentComponent({
                  title: '랭킹',
                  contentInfo:
                    '모든 플레이어들 사이에서 당신의 순위와 랭크를 확인할 수 있습니다. 당신의 경쟁 상대는 누구인가요?',
                  content: rankContent(),
                })}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={QARef}>
                {MyPageContentComponent({
                  title: 'Q&A',
                  contentInfo: null,
                  content: qnaLinkContent(),
                })}
              </div>
              {/* <div className=' w-full h-fit pt-[20px]' ref={loginRecordRef}>
            {MyPageContentComponent({
              title: '로그인 기록',
              contentInfo:
                '지금까지 WORLDY SOFT에 접속한 기록입니다. 로그인 기록을 확인하여 외부 로그인에 대한 위험을 방지할 수 있습니다.',
              content: undefined,
            })}
          </div> */}
              <div className=' w-full h-fit pt-[20px]' ref={logoutRef}>
                {MyPageContentComponent({
                  title: '로그아웃',
                  contentInfo: null,
                  content: logoutContent(),
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-full bg-white'>
          <LoaderBlueCircle text='정보 모으는 중...' />
        </div>
      )}
    </div>
  );
}

import '../styles/MyPageStyles.css';
import '../styles/TailWind.css';

import * as React from 'react';

import { BiBrain, BiLogOut } from 'react-icons/bi';
import {
  BsBookmarksFill,
  BsFillCaretDownFill,
  BsFillPersonLinesFill,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { IoIosLogOut, IoLogoGameControllerB } from 'react-icons/io';
import { MdAccessTimeFilled, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import {
  RiQuestionAnswerFill,
  RiSave3Fill,
  RiVipCrownFill,
} from 'react-icons/ri';
import { TbCategory2, TbWorld } from 'react-icons/tb';
import {
  loginNickName,
  loginProfileImg,
  logout,
  myRank,
} from '../_store/slices/loginSlice';
import { useEffect, useRef, useState } from 'react';

import { AiOutlineBulb } from 'react-icons/ai';
import CustomAxios from '../API/CustomAxios';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoMdPower } from 'react-icons/io';
import LoaderBlueCircle from '../components/Loaders/LoaderBlueCircle';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import QNAMoveButton from '../components/QNAMoveButton';
import QuizModal from '../components/QuizModal';
import { SiPowerapps } from 'react-icons/si';
import moment from 'moment';
import pathBG from '../assets/images/MyPageBackground.png';
import { useDispatch } from 'react-redux';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

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
  hint: string;
  hintType: boolean; //힌트
  userAnswer: string | null; //유저가 적은 정답(맞았으면 null)
  success: boolean; //맞춘 문제인가
  commentary: string;
};

type RankItemType = {
  rank: number;
  nickName: string;
  profileImg: string;
  tier: string;
  level: number;
  percent?: number;
  exp?: number;
};

type RankListType = {
  myRank: RankItemType;
  rankTop10User: RankItemType[];
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

  const getLoginToken: string | null = sessionStorage.getItem('token');

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
        setTimeout(() => {
          setFillExp(true);
        }, 300);
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
  const userProfileImg: string = sessionStorage.getItem('profileImg') || '';

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
          className={`w-full ml-[.5em] text-[1.2em] text-white font-PtdMedium flex flex-row justify-start items-center`}
        >
          {input.title}
          {input.move && <FiArrowUpRight className='ml-[1em]' />}
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

  const levelContent = (): JSX.Element => {
    return (
      <div className='w-[500px] flex flex-row justify-between items-center'>
        <span className='mr-[20px]'>LV.{axiosRankInfoList?.myRank.level}</span>
        <div className=' w-full h-[40px]  ml-[20px] flex flex-col justify-between items-start  outline-white'>
          <div className='w-fit text-[15px] h-fit flex flex-row justify-center items-center '>
            EXP : ({axiosRankInfoList?.myRank.exp}
            /100)
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
              style={{ width: `${axiosRankInfoList?.myRank.exp}%` }}
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
            axiosRankInfoList?.myRank.tier === 'Bronze'
              ? 'opacity-100'
              : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Bronze
          <SiPowerapps size={22} color={'#6a3805'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            axiosRankInfoList?.myRank.tier === 'Silver'
              ? 'opacity-100'
              : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Silver
          <SiPowerapps size={22} color={'#a4a4a4'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            axiosRankInfoList?.myRank.tier === 'Gold'
              ? 'opacity-100'
              : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Gold
          <SiPowerapps size={22} color={'#C9B037'} className='ml-[10px]' />
        </div>
        <div
          className={`${
            axiosRankInfoList?.myRank.tier === 'Platinum'
              ? 'opacity-100'
              : 'opacity-30'
          } h-[40px] bg-[rgba(255,255,255,0.2)] rounded-[100px] flex flex-row justify-center items-center py-[8px] px-[10px]`}
        >
          Platinum
          <SiPowerapps size={22} color={'#86FFF8'} className='ml-[10px]' />
        </div>
      </div>
    );
  };

  const [axiosRankInfoList, setAxiosRankInfoList] = useState<RankListType>();

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
      setAxiosRankInfoList(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    //console.log('token이 무엇이냐 ', token);
  };

  useEffect(() => {
    console.log('랭크 받앙오기');
    getRankInfoList();
  }, []);

  const userLevel = axiosRankInfoList?.myRank.level || '';
  const userExp = axiosRankInfoList?.myRank.exp || 0;
  const userTier = axiosRankInfoList?.myRank.tier || '';
  const userRank = axiosRankInfoList?.myRank.rank || 0;

  const [fillExp, setFillExp] = useState<boolean>(false);

  const accountInfoContentComponent = () => {
    return (
      <div className='w-full h-fit  outline-white flex flex-col justify-between items-stretch'>
        <div className='w-full h-[80px] -translate-y-[4px] outline-red-300 flex flex-row justify-start items-center'>
          <div className='w-[70px] h-[70px] rounded-full overflow-hidden grid place-content-center'>
            <img src={userProfileImg || ''} alt='프로필사진' />
          </div>
          <div className='flex-1 h-full ml-[20px] flex flex-col justify-end items-start pb-[10px]'>
            <span className='flex flex-row justify-start items-center text-[#B1B1B1] font-PtdRegular text-[20px] mb-[8px]'>
              {userNickname}님은
              <p className='text-white font-PtdBold mx-[10px]'>
                LV.{userLevel},
              </p>
              <p
                className={`flex flex-row justify-start items-center mr-[10px] font-PtdBold`}
                style={{ color: setTierColor(userTier) }}
              >
                <SiPowerapps
                  size={20}
                  color={setTierColor(userTier)}
                  className='mr-[7px]'
                />
                {userTier}
              </p>
              입니다.
            </span>
            <span className='text-[16px] font-PtdLight text-[#5A5A5A]'>
              다음 레벨업까지 {100 - userExp}exp 남았습니다.
            </span>
          </div>
        </div>
        <div className='w-full h-[70px] pb-[5px] outline-white flex flex-col justify-end items-stretch'>
          <div className='w-full h-[20px] flex flex-row justify-end items-center font-PtdRegular'>
            <span className='text-[15px] text-[#5A5A5A] mr-[5px]'>exp</span>
            <span className='text-[18px] text-[rgba(220,220,220,1)]'>
              {userExp}/100
            </span>
          </div>
          <div className='w-full h-[10px]  outline-red-300 flex flex-row justify-center items-center relative mt-[15px]'>
            <div className='w-full h-[10px] rounded-full bg-[#454545]' />
            <div
              className={`${
                fillExp ? `w-[${userExp}%]` : 'w-0'
              } h-[10px] transition-all duration-[1300ms] ease-in-out  absolute top-0 left-0 rounded-full`}
              style={{ backgroundColor: setTierColor(userTier) }}
            />
          </div>
        </div>
      </div>
    );
  };
  //////////////////////////////////////////////////

  //퀴즈 타입 (-1 : 닫힘, 0 : 전체, 1 : 나라별, 2 : 난이도별, 3 : 카테고리별)
  const [scrappedQuizTypeSelect, setScrappedQuizTypeSelet] =
    useState<number>(-1);
  //퀴즈 타입 버튼 인덱스 (-1 : 버튼 안 누른 상태, 0 : 전체 버튼, 1 : 나라별, 2 : 난이도별, 3: 카테고리별, 4 : 화살표)
  const [quizPopDownKeyState, setQuizPopDownKeyState] = useState<number>(-1);

  //선택된 타입의 string (전체, 나라별, 난이도별, 카테고리별)
  const [selectedType, setSelectedType] = useState<string>('');
  //세부 카테고리 선택 인덱스
  const [quizMenuSelected, setQuizMenuSelected] = useState<number>(0);
  //세부 카테고리 (한국,중국 ,... , 상,중,하, 시사,문화...)
  const [selectedValue, setSelectedValue] = useState<string>('');

  //스크랩 퀴즈 창 열기 / 닫기
  const [quizPopDownBoxState, setQuizPopDownBoxState] =
    useState<boolean>(false);

  //스크랩 퀴즈 선택 id
  const [selectedQuizId, setSelectedQuizId] = useState<number>(0);
  //스크랩 퀴즈 모달 열기 닫기
  const [quizModalState, setQuizModalState] = useState<boolean>(false);
  //받아오는 퀴즈 리스트
  const [axiosScrappedQuizList, setAxiosScrappedQuizList] = useState<
    ScrappedQuizType[]
  >([]);
  //선택 사항에 따른 분류된 퀴즈 리스트
  const [sortedScrapQuizList, setSortedScrapQuizList] = useState<
    ScrappedQuizType[]
  >([]);

  //퀴즈 타입 인덱스값 설정 (같은 버튼 누르면 닫기로 -1)
  const handleScrappedQuizTypeSelect = (input: number) => {
    if (quizPopDownBoxState) {
      //열려있는 상태면
      if (input === 4) {
        setScrappedQuizTypeSelet(-1);
      } else {
        setScrappedQuizTypeSelet(input === scrappedQuizTypeSelect ? -1 : input); //같은 버튼 눌렀으면 닫기
      }
    } else {
      if (input === 4) {
        setScrappedQuizTypeSelet(0);
      } else {
        setScrappedQuizTypeSelet(input); //같은 버튼 눌렀으면 닫기
      }
    }
  };
  //버튼 눌러서 퀴즈 타입 설정
  const clickQuizType = (input: number) => {
    handleQuizPopDownKeyState(input);
    if (input === 1) setSelectedType('나라별');
    else if (input === 2) setSelectedType('난이도별');
    else if (input === 3) setSelectedType('카테고리별');
    else if (input === 0 || input === 4) setSelectedType('전체');
    handleScrappedQuizTypeSelect(input);
  };
  //버튼 눌러서 스크랩 창 열기 닫기
  const handleQuizPopDownKeyState = (input: number) => {
    if (input === 4) {
      //화살표 눌렀을 때
      if (quizPopDownBoxState) {
        //열려있으면 버튼 인덱스 -1로 하고 닫기
        setQuizPopDownKeyState(-1); //
      } else {
        setQuizPopDownKeyState(0);
      }
    } else setQuizPopDownKeyState(quizPopDownKeyState === input ? -1 : input);
  };

  const handleQuizModal = (select: number) => {
    setSelectedQuizId(select);
    setTimeout(() => {
      setQuizModalState(true);
    }, 100);
  };

  const sortScrappedQuizByCategory = ({
    type,
    value,
  }: {
    type: string;
    value: string;
  }) => {
    console.log('const 5');
    const inputvalue =
      value === '상'
        ? '3'
        : value === '중'
        ? '2'
        : value === '하'
        ? '1'
        : value === '문화/역사'
        ? 'cul'
        : value === '시사'
        ? 'aff'
        : value === '기타'
        ? 'etc'
        : value;
    if (inputvalue === '없음') setSortedScrapQuizList([]);
    else if (inputvalue !== '전체') {
      //내부 선택이 있으면 타입 분류 및 카테고리 분류
      var tempList: ScrappedQuizType[] = [];
      console.log(`선택한 타입 : ${type} => 카테고리 : ${inputvalue}`);
      for (let i = 0; i < axiosScrappedQuizList.length; i++) {
        if (type === '나라별') {
          if (axiosScrappedQuizList[i].nationName === inputvalue)
            tempList.push(axiosScrappedQuizList[i]);
        } else if (type === '난이도별') {
          if (axiosScrappedQuizList[i].level === +inputvalue)
            tempList.push(axiosScrappedQuizList[i]);
        } else {
          if (axiosScrappedQuizList[i].category === inputvalue) {
            tempList.push(axiosScrappedQuizList[i]);
          }
        }
      }
      setSortedScrapQuizList(tempList);
    } else {
      //내부 선택 없으면 타입 분류만
      setSortedScrapQuizList(axiosScrappedQuizList);
    }
  };

  useEffect(() => {
    if (selectedType === '') return;
    setSelectedValue('전체');
    sortScrappedQuizByCategory({ type: selectedType, value: selectedValue });
  }, [selectedType]);

  useEffect(() => {
    if (selectedValue === '') return;
    sortScrappedQuizByCategory({ type: selectedType, value: selectedValue });
  }, [selectedValue]);

  useEffect(() => {
    setQuizMenuSelected(0); //세부 셀렉 0
    setQuizPopDownBoxState(quizPopDownKeyState === -1 ? false : true);
    if (quizPopDownKeyState !== -1) scrollToContent(quizScrapRef);
  }, [quizPopDownKeyState]); //퀴즈 타입 버튼 인덱스

  useEffect(() => {
    getScrappedQuizListAxios();
  }, []);

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
            onClick={() => {
              clickQuizType(0);
              setSelectedType('전체');
            }}
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
            onClick={() => {
              clickQuizType(1);
              setSelectedType('나라별');
            }}
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
            onClick={() => {
              clickQuizType(2);
              setSelectedType('난이도별');
            }}
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
            onClick={() => {
              clickQuizType(3);
              setSelectedType('카테고리별');
            }}
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
            {sortedScrapQuizList.map((item, key) =>
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

  const getScrappedQuizListAxios = async () => {
    console.log('Session에서의 가져오는 토큰', getLoginToken);
    try {
      const response = await CustomAxios({
        APIName: 'getScrappedQuiz',
        APIType: 'get',
        UrlQuery: `https://k8a507.p.ssafy.io/api/user/scrap/all`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      console.log('퀴즈 스크랩 받은 거 : ', response[0].quizId);
      setAxiosScrappedQuizList(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    //console.log('token이 무엇이냐 ', token);
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
        onClick={() => {
          setQuizMenuSelected(key);
          setSelectedValue(input);
        }}
      >
        <span className={`${key === 0 ? 'text-[22px]' : 'text-[16px]'} `}>
          {input}
        </span>
      </button>
    );
  };

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
        ? '문화/역사'
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

  ////////////////////////////////////////

  const setTierColor = (input: string): string => {
    if (input === 'Platinum') return '#86FFF8';
    else if (input === 'Gold') return '#C9B037';
    else if (input === 'Silver') return '#E1FBFF';
    else return '#6a3805';
  };
  const rankContent = (): JSX.Element => {
    return (
      <div className='w-full h-fit  outline-yellow-300'>
        <div
          className={`w-full h-fit  outline-red-300 flex flex-col justify-start items-start transition-all duration-1000 ease-in-out`}
        >
          <div className='text-[#6A6A6A] font-PtdRegular text-[17px] mx-[15px] '>
            <span>
              {userNickname}
              님의 랭킹 정보
            </span>
          </div>
          <div className='text-[#CBCBCB] font-PtdSemiBOld text-[20px] mx-[15px] mt-[5px]'>
            <span>전체 플레이어 중 </span>
            <span style={{ color: setTierColor(userTier) }}>
              {axiosRankInfoList?.myRank.rank}위, 상위{' '}
              {axiosRankInfoList?.myRank.percent}% 이내입니다.
            </span>
          </div>
          <div className='w-full h-[50px] flex flex-row justify-start items-start  text-white'></div>
          <div
            className={`w-full h-fit outline-white opacity-100 transition-all duration-1000  ease-in-out overflow-hidden flex flex-col justify-start items-center`}
          >
            <div>
              <div
                className={
                  'relative flex flex-row justify-between items-center mb-[7px] bg-[rgba(0,0,0,0)] px-[10px] rounded-md w-[490px] h-[45px] font-PtdExtraLight text-gray-300 text-[16px] '
                }
              >
                <div className='w-[50px] h-full mr-[10px] grid place-content-center '>
                  <span className='grid place-content-center '>Rank</span>
                </div>
                <div className='w-[180px] h-full mr-[10px] flex flex-row justify-center items-center '>
                  <span className=''>User</span>
                </div>
                <div className='flex-1' />
                <div className='w-[80px] h-full mr-[20px] grid place-content-center '>
                  <span className=''>Level</span>
                </div>
                <div className='w-[50px] h-full  grid place-content-center '>
                  <span className=''>Tier</span>
                </div>
              </div>
              {axiosRankInfoList?.rankTop10User.map((item, key) => (
                <div
                  key={key}
                  className={`rangking relative flex flex-row justify-between items-center mb-[7px] bg-[rgba(0,0,0,0)] hover:bg-[rgba(180,180,180,0.3)] px-[10px] rounded-md ${
                    item.nickName === userNickname
                      ? 'glowmyrank z-10  w-[500px] h-[50px] my-[15px] -translate-x-[5px]'
                      : 'w-[490px] h-[45px]'
                  }`}
                >
                  <div className='w-[50px] h-[50px] mr-[20px] grid place-content-center'>
                    <span className='font-PtdLight text-[20px] text-gray-300'>
                      {key + 1}
                    </span>
                  </div>
                  <div className='flex-1 h-fit  outline-white flex justify-between items-center'>
                    <div className='w-[25px] h-[25px]  outline-[rgba(220,220,220,0.3)] rounded-full overflow-hidden grid place-content-center  mr-[20px]'>
                      <img src={item.profileImg} alt='프로필 이미지' />
                    </div>
                    <div className='w-[150px] h-fit  outline-red-300 flex flex-row justify-start items-center '>
                      <span className='font-PtdRegular text-white text-[17px] truncate '>
                        {item.nickName}
                      </span>
                    </div>
                    <div className='w-[30px] flex-1 flex-row flex justify-start items-center '>
                      <RiVipCrownFill
                        className={`${
                          key === 0
                            ? 'text-[#D1C68F]'
                            : key === 1
                            ? 'text-[#a4a4a4]'
                            : key === 2
                            ? 'text-[#837D63]'
                            : 'opacity-0'
                        }
                        shadow-lg
                        w-[15px] h-[15px]
                        `}
                      />
                    </div>
                  </div>
                  <div className='flex flex-row  outline-white justify-between items-center w-[120px] h-fit'>
                    <div className='w-[30px] flex-2 grid place-ontent-right mr-[20px]'>
                      <span className='font-PtdLight text-[18px] text-[#B2B2B2]'>
                        lv.{item.level}
                      </span>
                    </div>
                    <div className='w-fit h-2/3  outline-white bg-[rgba(62,62,62,0.7)] rounded-[100px] flex flex-row justify-center items-center px-[10px]'>
                      <SiPowerapps size={22} color={setTierColor(item.tier)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full h-fit grid place-content-center'>
              <BsThreeDotsVertical
                size={20}
                color={'rgba(255,255,255,0.3)'}
                className='my-[10px]'
              />
            </div>
            {axiosRankInfoList && axiosRankInfoList?.myRank.rank > 10 && (
              <div
                className={`rangking relative flex flex-row justify-between items-center mb-[10px] bg-[rgba(0,0,0,0)] hover:bg-[rgba(180,180,180,0.3)] px-[10px] rounded-md glowmyrank z-10  w-[500px] h-[50px] my-[15px] -translate-x-[5px]`}
              >
                <div className='w-[50px] h-[50px] mr-[20px] grid place-content-center'>
                  <span className='font-PtdLight text-[20px] text-gray-300'>
                    {userRank}
                  </span>
                </div>
                <div className='flex-1 h-fit  outline-white flex justify-between items-center'>
                  <div className='w-[25px] h-[25px]  outline-[rgba(220,220,220,0.3)] rounded-full overflow-hidden grid place-content-center  mr-[20px]'>
                    <img src={userProfileImg} alt='프로필 이미지' />
                  </div>
                  <div className='w-[150px] h-fit  outline-red-300 flex flex-row justify-start items-center '>
                    <span className='font-PtdRegular text-white text-[17px] truncate '>
                      {userNickname}
                    </span>
                  </div>
                  <div className='w-[30px] flex-1 flex-row flex justify-start items-center '></div>
                </div>
                <div className='flex flex-row  outline-white justify-between items-center w-[120px] h-fit'>
                  <div className='w-[30px] flex-2 grid place-ontent-right mr-[20px]'>
                    <span className='font-PtdLight text-[18px] text-[#B2B2B2]'>
                      lv.{userLevel}
                    </span>
                  </div>
                  <div className='w-fit h-2/3  outline-white bg-[rgba(62,62,62,0.7)] rounded-[100px] flex flex-row justify-center items-center px-[10px]'>
                    <SiPowerapps size={22} color={setTierColor(userTier)} />
                  </div>
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
              input={axiosScrappedQuizList[selectedQuizId]}
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

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import pathBG from '../assets/images/MyPageBackground.png';
import { BsFillPersonLinesFill, BsBookmarksFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoIosLogOut, IoLogoGameControllerB } from 'react-icons/io';
import { FiArrowUpRight } from 'react-icons/fi';
import { RiQuestionAnswerFill, RiSave3Fill } from 'react-icons/ri';
import { MdAccessTimeFilled, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import moment from 'moment';

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

export default function MyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const accountInfoRef = useRef<HTMLDivElement>(null);
  const quizScrabRef = useRef<HTMLDivElement>(null);
  const gameLogRef = useRef<HTMLDivElement>(null);
  const QARef = useRef<HTMLDivElement>(null);
  const loginRecordRef = useRef<HTMLDivElement>(null);
  const logoutRef = useRef<HTMLDivElement>(null);

  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current && ref.current) {
      const container = containerRef.current;
      const contentPosition = ref.current.offsetTop - container.offsetTop;
      container.scrollTo({ top: contentPosition, behavior: 'smooth' });
    }
  };

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
      onMove: () => scrollToContent(quizScrabRef),
      move: false,
    },
    {
      icon: <IoLogoGameControllerB size={26} />,
      title: '전적',
      onMove: () => scrollToContent(gameLogRef),
      move: false,
    },
    {
      icon: <RiQuestionAnswerFill />,
      title: 'Q&A',
      onMove: () => scrollToContent(QARef),
      move: true,
    },
    {
      icon: <MdAccessTimeFilled />,
      title: '로그인 기록',
      onMove: () => scrollToContent(loginRecordRef),
      move: false,
    },
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
      <div className=' w-[95%] min-h-[300px] h-fit flex flex-row justify-stretch items-start bg-[rgb(39,32,32)]'>
        <div
          className=' w-2/5 min-h-[300px] h-full p-[50px] flex flex-col justify-start items-start
        '
        >
          <span className='text-white font-PtdBold text-[40px] mb-[.5em]'>
            {input.title}
          </span>
          <span className='text-white font-PtdLight text-[16px] leading-[22px]'>
            {input.contentInfo}
          </span>
        </div>
        <div className=' w-3/5 min-h-[300px] p-[50px] bg-[rgb(49,47,45)]'>
          {input.content}
        </div>
      </div>
    );
  };

  const date = moment().format('YYYY-MM-DD');

  const accountInfoContentComponent = () => {
    return (
      <div className=' min-h-300px h-fit'>
        <div className='w-full h-full mb-[15px]'>
          {contentBoxComponent({ title: '이름', content: '김설희' })}
        </div>
        <div className='w-full h-full mb-[15px]'>
          {contentBoxComponent({ title: '닉네임', content: 'SeolHEEHEE' })}
        </div>
        <div className='w-full h-full'>
          {contentBoxComponent({ title: '가입 날짜', content: date })}
        </div>
      </div>
    );
  };

  const quizScrabContentComponent = () => {
    return (
      <div className='outline outline-white w-full  h-fit flex flex-col justify-start items-center'>
        <div className='w-full h-1/3 mb-[20px]'>
          <button
            className='w-full h-[80px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex justify-center items-center rounded-lg p-[10px]'
            onClick={() => handleQuizPopDownKeyState(0)}
          >
            <span className='text-white text-[30px] font-PtdSemiBOld'>
              전체
            </span>
          </button>
        </div>
        <div className='w-full h-1/3 flex flex-row justify-between items-center mb-[20px]'>
          <button
            className='w-[30%] h-[80px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex justify-center items-center rounded-lg p-[10px]'
            onClick={() => handleQuizPopDownKeyState(1)}
          >
            <span className='text-white text-[25px] font-PtdSemiBOld'>
              나라별
            </span>
          </button>
          <button
            className='w-[30%] h-[80px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex justify-center items-center rounded-lg p-[10px]'
            onClick={() => handleQuizPopDownKeyState(2)}
          >
            <span className='text-white text-[25px] font-PtdSemiBOld'>
              난이도별
            </span>
          </button>

          <button
            className='w-[30%] h-[80px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex justify-center items-center rounded-lg p-[10px]'
            onClick={() => handleQuizPopDownKeyState(3)}
          >
            <span className='text-white text-[25px] font-PtdSemiBOld'>
              카테고리별
            </span>
          </button>
        </div>
        <button
          className='w-full h-[30px] outline outline-white flex justify-center items-center text-white'
          onClick={() => handleQuizPopDownKeyState(0)}
        >
          <div>
            <MdKeyboardDoubleArrowRight
              size={30}
              className={`
              transition-all duration-1000
              ${quizPopDownBoxState ? 'rotate-[90deg]' : '-rotate-[90deg]'}`}
            />
          </div>
        </button>
        <div
          className={`outline-red-600 w-full transition-all duration-1000 ${
            quizPopDownBoxState ? 'h-[400px]  py-[15px]' : 'h-0'
          } px-[10px]`}
        >
          <div className='w-full h-full outline outline-white overflow-y-scroll'></div>
        </div>
      </div>
    );
  };

  const [quizPopDownKeyState, setQuizPopDownKeyState] = useState<number>(-1);

  const handleQuizPopDownKeyState = (input: number) => {
    setQuizPopDownKeyState(quizPopDownKeyState === input ? -1 : input);
  };

  const [quizPopDownBoxState, setQuizPopDownBoxState] = useState<boolean>(true);

  useEffect(() => {
    setQuizPopDownBoxState(quizPopDownKeyState === -1 ? false : true);
    scrollToContent(quizScrabRef);
  }, [quizPopDownKeyState]);

  const contentBoxComponent = ({
    title,
    content,
  }: {
    title: string;
    content: string;
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

  return (
    <div
      className='w-full h-full flex flex-row justify-center items-center overflow-y-clip'
      style={{ backgroundImage: `url(${pathBG})`, backgroundSize: '100%' }}
    >
      <div className='w-[80%] h-full  flex flex-row justify-stretch items-center'>
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
          <div className=' w-full h-fit pt-[20px]' ref={quizScrabRef}>
            {MyPageContentComponent({
              title: '퀴즈 스크랩',
              contentInfo:
                '지난 세계 탐험 여행에서 만난 다양한 퀴즈 중, 플레이어가 따로 저장해둔 퀴즈들을 모아 볼 수 있습니다.',
              content: quizScrabContentComponent(),
            })}
          </div>
          <div className=' w-full h-fit pt-[20px]' ref={gameLogRef}>
            {MyPageContentComponent({
              title: '전적',
              contentInfo:
                '플레이어가 겪어온 모든 모노폴리 게임 전적에 대해 적어놨습니다. 이제껏 어떤 여행을 겪어오셨는지 한 번 볼까요?',
              content: undefined,
            })}
          </div>
          <div className=' w-full h-fit pt-[20px]' ref={QARef}>
            {MyPageContentComponent({
              title: 'Q&A',
              contentInfo: null,
              content: undefined,
            })}
          </div>
          <div className=' w-full h-fit pt-[20px]' ref={loginRecordRef}>
            {MyPageContentComponent({
              title: '로그인 기록',
              contentInfo:
                '지금까지 WORLDY SOFT에 접속한 기록입니다. 로그인 기록을 확인하여 외부 로그인에 대한 위험을 방지할 수 있습니다.',
              content: undefined,
            })}
          </div>
          <div className=' w-full h-fit pt-[20px]' ref={logoutRef}>
            {MyPageContentComponent({
              title: '로그아웃',
              contentInfo: null,
              content: undefined,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

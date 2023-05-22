import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import SHLoader from '../components/Loaders/SHLoader';

import sample from '../assets/images/QuizOpenAPiExample.png';

type OpenAPIMenuType = {
  title: string;
  onMove: () => void;
};

type OpenAPIContentType = {
  title: string;
  contentInfo: string | null;
  content?: JSX.Element;
};

export default function OpenAPI() {
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadedAll(true);
    }, 1000);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const quizOpenAPIRef = useRef<HTMLDivElement>(null);
  const quizInfoGetRef = useRef<HTMLDivElement>(null);
  const quizRequestRef = useRef<HTMLDivElement>(null);
  const quizTestRef = useRef<HTMLDivElement>(null);

  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current && ref.current) {
      const container = containerRef.current;
      const contentPosition = ref.current.offsetTop - container.offsetTop;
      container.scrollTo({ top: contentPosition, behavior: 'smooth' });
    }
  };

  const OpenAPIMenuItems: OpenAPIMenuType[] = [
    {
      title: 'Quiz Open API',
      onMove: () => scrollToContent(quizOpenAPIRef),
    },
    // {
    //   title: '문서 소개',
    //   onMove: () => scrollToContent(quizScrapRef),
    // },
    {
      title: '퀴즈 정보 가져오기',
      onMove: () => scrollToContent(quizInfoGetRef),
    },
    {
      title: '퀴즈 요청하기',
      onMove: () => scrollToContent(quizRequestRef),
    },
    {
      title: '테스트하기',
      onMove: () => scrollToContent(quizTestRef),
    },
    // {
    //   title: '저작권',
    //   onMove: () => scrollToContent(logoutRef),
    // },
  ];

  const [openAPIMenuHoverState, setOpenAPIMenuHoverState] =
    useState<number>(-1);

  const handleOpenAPIMenuHoverState = (input: number) => {
    setOpenAPIMenuHoverState(input);
  };

  const OpenAPIMenuComponent = ({
    input,
    key,
  }: {
    input: OpenAPIMenuType;
    key: number;
  }) => {
    return (
      <button
        key={key}
        onMouseEnter={() => handleOpenAPIMenuHoverState(key)}
        onMouseLeave={() => handleOpenAPIMenuHoverState(-1)}
        className='w-full h-[2em] flex flex-row justify-start items-center mb-[1em]  pl-[15px]'
        onClick={input.onMove}
      >
        <span
          className={`w-full ml-[.5em] text-[1.2em] text-white font-PtdMedium flex flex-row justify-start items-center`}
        >
          {input.title}
        </span>
      </button>
    );
  };

  const OpenAPIContentComponent = (input: OpenAPIContentType) => {
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
  const QuizOpenAPIContent = () => {
    return (
      <div className=' w-[95%] min-h-[100px] h-fit outline-white flex flex-row justify-stretch items-start bg-[rgb(39,32,32)]'>
        <div
          className=' w-2/5  h-full p-[50px] flex flex-col justify-start items-start
        '
        >
          <span className='text-white font-PtdBold text-[40px] mb-[.5em]'>
            Quiz Open API
          </span>
          <span className='text-white font-PtdLight text-[16px] leading-[22px]'>
            Worldy Games에서 제공하는 퀴즈 모듈은 OpenAI와 Selenium 동적 크롤링
            도구와 BeautifulSoup 정적 크롤링을 활용하여 생성되었습니다.
          </span>
        </div>
        <div className=' w-3/5 h-fit py-[20px] bg-[rgb(49,47,45)] flex flex-row justify-between '>
          <div className='w-[150px] h-full flex flex-col justify-start items-center'>
            <button className='rounded-[4px] w-[80px] h-[34px] bg-blue-500 text-white font-PtdRegular text-[16px] cursor-default'>
              활용 예시
            </button>
          </div>
          <img
            src={sample}
            alt='Quiz Open API Sample'
            className='w-[250px] my-[10px] mx-[20px] mr-[150px]'
          />
        </div>
      </div>
    );
  };

  const QuizInfoGetContent = () => {
    return (
      <div className=' w-[95%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[rgb(49,47,45)]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[30px] px-[50px]'>
          <div className='w-full h-fit flex flex-row justify-start items-center border-0 border-b-[2px] border-b-[#4E4E4E] border-solid pb-[30px]'>
            <span className='text-white font-PtdMedium text-[35px] mr-[30px]'>
              퀴즈 정보 가져오기
            </span>
            <button className='rounded-[4px] outline outline-[1px] w-[68px] h-[30px] outline-[#25CABB] bg-none font-PtdRegular text-[#25CABB] text-[16px]'>
              GET
            </button>
          </div>
          <span className='text-white font-PtdLight text-[20px] leading-[26px] py-[20px]'>
            퀴즈 정보를 불러옵니다. 각 나라는 고유의 ID값을 가지고 있습니다.
            요청 URL뒤에 파라미터 값을 추가하면 해당 국가에 관련된 퀴즈 정보를
            응답 받을 수 있습니다.{' '}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full h-full flex flex-row justify-center items-center overflow-y-clip bg-[#020C16]'>
      {loadedAll ? (
        <>
          <div
            className={`w-[80%] h-full  flex flex-row justify-stretch items-center  `}
          >
            <div
              className='flex-1 h-full pt-[60px]  overflow-y-scroll pb-[30em]'
              ref={containerRef}
            >
              <div
                className=' w-full h-fit pt-[20px] text-white'
                ref={quizOpenAPIRef}
              >
                {QuizOpenAPIContent()}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={quizInfoGetRef}>
                {QuizInfoGetContent()}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={quizRequestRef}>
                {OpenAPIContentComponent({
                  title: '퀴즈 요청하기',
                  contentInfo: null,
                  // content: qnaLinkContent(),
                })}
              </div>
              <div className=' w-full h-fit pt-[20px]' ref={quizTestRef}>
                {OpenAPIContentComponent({
                  title: '테스트하기',
                  contentInfo: null,
                  // content: logoutContent(),
                })}
              </div>
            </div>
            <div className='w-[25%] h-full pt-[5em]'>
              <div className='w-[90%] h-fit  flex flex-col items-start'>
                <div className='flex flex-row justify-start pl-[15px]'>
                  <span className='text-white font-PtdBold text-[3em]'>
                    Developers
                  </span>
                </div>
                <div className='w-full h-fit my-[3em] '>
                  {OpenAPIMenuItems.map((item, index) =>
                    OpenAPIMenuComponent({ input: item, key: index })
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-full bg-white'>
          <SHLoader text='코드 긁어모으는 중...' />
        </div>
      )}
    </div>
  );
}

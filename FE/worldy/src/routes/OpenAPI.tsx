import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import SHLoader from '../components/Loaders/SHLoader';

import sampleQuiz from '../assets/images/QuizOpenAPiExample.png';
import sampleDiff from '../assets/images/DiffOpenAPIExample.png';
import { RiFileCopyLine } from 'react-icons/ri';
import CustomAxios from '../API/CustomAxios';
import { FiRotateCcw } from 'react-icons/fi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import pathBg from '../assets/images/OpenAPIBg.png';

type OpenAPIMenuType = {
  title: string;
  onMove: () => void;
};

export default function OpenAPI() {
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadedAll(true);
    }, 1000);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);
  const fourthRef = useRef<HTMLDivElement>(null);

  const scrollToContent = (ref: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current && ref.current) {
      const container = containerRef.current;
      const contentPosition = ref.current.offsetTop - container.offsetTop;
      container.scrollTo({ top: contentPosition, behavior: 'smooth' });
    }
  };

  const [changeAPIState, setChangeAPIState] = useState<boolean>(false);

  const QuizAPIMenuItems: OpenAPIMenuType[] = [
    {
      title: '퀴즈 Open API',
      onMove: () => {
        setChangeAPIState(false);
        scrollToContent(firstRef);
      },
    },
    {
      title: '퀴즈 정보 가져오기',
      onMove: () => {
        setChangeAPIState(false);
        scrollToContent(secondRef);
      },
    },
    {
      title: '퀴즈 요청하기',
      onMove: () => {
        setChangeAPIState(false);
        scrollToContent(thirdRef);
      },
    },
    {
      title: '퀴즈 응답 확인',
      onMove: () => {
        setChangeAPIState(false);
        scrollToContent(fourthRef);
      },
    },
  ];
  const DiffImagesAPIMenuItems: OpenAPIMenuType[] = [
    {
      title: '틀린 그림 찾기 Open API',
      onMove: () => {
        setChangeAPIState(true);
        scrollToContent(firstRef);
      },
    },
    {
      title: '틀린 그림 정보 가져오기',
      onMove: () => {
        setChangeAPIState(true);
        scrollToContent(secondRef);
      },
    },
    {
      title: '틀린 그림 요청하기',
      onMove: () => {
        setChangeAPIState(true);
        scrollToContent(thirdRef);
      },
    },
    {
      title: '틀린 그림 응답 확인',
      onMove: () => {
        setChangeAPIState(true);
        scrollToContent(fourthRef);
      },
    },
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
        className='w-full h-[2em] flex flex-row justify-stretch items-center mb-[1em] pl-[15px]'
        onClick={input.onMove}
      >
        <span
          className={`w-full ml-[.5em] text-[1.2em] font-PtdMedium flex flex-row justify-end items-center
          ${openAPIMenuHoverState === key ? 'text-[#2942ca]' : 'text-white'}
          `}
        >
          {input.title}
        </span>
      </button>
    );
  };

  const StartOpenAPI = () => {
    return (
      <div className=' w-[95%] h-full outline-white flex flex-row justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-[50px] h-full bg-[#371fa1]' />
        <div className='py-[30px] px-[50px] h-full flex-1 flex flex-col justify-between items-start'>
          <span className='text-white font-PtdBold text-[40px]'>
            Open API 시작하기
          </span>
          <span className='text-white font-PtdLight text-[20px]'>
            Worldy Games에서 제공하는 퀴즈 API를 무료로 사용해보세요.
          </span>
          <div className='w-full pr-[300px] h-[40px] outline-white mt-[20px] flex flex-row justify-between items-center'>
            <button
              className='bg-gray-100 rounded-sm grid place-content-center w-[48%] h-full'
              onClick={() => scrollToContent(secondRef)}
            >
              더 알아보기
            </button>
            <button className='bg-[#25CABB] rounded-sm text-white grid place-content-center w-[48%] h-full'>
              이용 약관 확인
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuizOpenAPIContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-row justify-stretch items-start bg-[#0a0a26]'>
        <div
          className=' w-2/5  h-full p-[50px] flex flex-col justify-start items-start
        '
        >
          <span className='text-white font-PtdBold text-[40px] mb-[.5em]'>
            퀴즈 Open API
          </span>
          <span className='text-white font-PtdLight text-[16px] leading-[22px]'>
            Worldy Games에서 제공하는 퀴즈 모듈은 OpenAI와 Selenium 동적 크롤링
            도구와 BeautifulSoup 정적 크롤링을 활용하여 생성되었습니다.
          </span>
        </div>
        <div className=' w-3/5 h-[500px] py-[20px] bg-[#1e1c2f] flex flex-row justify-between '>
          <div className='w-[150px] h-full flex flex-col justify-start items-center'>
            <button className='rounded-[4px] w-[80px] h-[34px] bg-blue-500 text-white font-PtdRegular text-[16px] cursor-default'>
              활용 예시
            </button>
          </div>
          <div className='flex-1 h-full grid place-content-center pl-[80px]'>
            <img
              src={sampleQuiz}
              alt='Quiz Open API Sample'
              className='w-2/3'
            />
          </div>
        </div>
      </div>
    );
  };
  const DiffImagesOpenAPIContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-row justify-stretch items-start bg-[#0a0a26]'>
        <div
          className=' w-2/5  h-full p-[50px] flex flex-col justify-start items-start
        '
        >
          <span className='text-white font-PtdBold text-[40px] mb-[.5em]'>
            틀린 그림 찾기
            <br />
            Open API
          </span>
          <span className='text-white font-PtdLight text-[16px] leading-[22px]'>
            Worldy Games에서 제공하는 틀린 그림 찾기 모듈은 OpenCV와 이미지 복원
            모델(PCONV)를 활용하여 생성되었습니다.
          </span>
        </div>
        <div className=' w-3/5 h-[500px] py-[20px] bg-[#1e1c2f] flex flex-row justify-between '>
          <div className='w-[150px] h-full flex flex-col justify-start items-center'>
            <button className='rounded-[4px] w-[80px] h-[34px] bg-blue-500 text-white font-PtdRegular text-[16px] cursor-default'>
              활용 예시
            </button>
          </div>
          <div className='flex-1 h-full grid place-content-center pr-[40px]'>
            <img src={sampleDiff} alt='Quiz Open API Sample' />
          </div>
        </div>
      </div>
    );
  };

  const QuizInfoGetContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-row justify-start items-center border-0 border-b-[1.5px] border-b-[#4E4E4E] border-solid pb-[30px]'>
            <span className='text-white font-PtdMedium text-[35px] mr-[30px]'>
              퀴즈 정보 가져오기
            </span>
            <button className='rounded-[4px] outline outline-[1px] w-[68px] h-[30px] outline-[#25CABB] bg-none font-PtdRegular text-[#25CABB] text-[16px] cursor-default'>
              GET
            </button>
          </div>
          <span className='text-white font-PtdLight text-[20px] leading-[26px] py-[20px]'>
            퀴즈 정보를 불러옵니다. 각 나라는 고유의 ID값을 가지고 있습니다.
            요청 URL뒤에 파라미터 값을 추가하면 해당 국가에 관련된 퀴즈 정보를
            응답 받을 수 있습니다.
          </span>
        </div>
      </div>
    );
  };
  const DiffImagesInfoGetContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-row justify-start items-center border-0 border-b-[1.5px] border-b-[#4E4E4E] border-solid pb-[30px]'>
            <span className='text-white font-PtdMedium text-[35px] mr-[30px]'>
              이미지 데이터 가져오기
            </span>
            <button className='rounded-[4px] outline outline-[1px] w-[68px] h-[30px] outline-[#25CABB] bg-none font-PtdRegular text-[#25CABB] text-[16px] cursor-default'>
              GET
            </button>
          </div>
          <span className='text-white font-PtdLight text-[20px] leading-[26px] py-[20px]'>
            각 나라별 랜드마크 원본 사진을 이용하여, 이미지 복원 모델을 거쳐
            AI가 만들어낸 편집된 이미지와 생성된 틀린 지점의 정답 좌표를 응답
            받을 수 있습니다.
          </span>
        </div>
      </div>
    );
  };

  //https://k8a507.p.ssafy.io/api/get/quiz?nationId=9&quizType=blank&category=etc

  const [inputNationID, setInputNationID] = useState<string>('');
  const [inputQuizType, setInputQuizType] = useState<string>('');
  const [inputCategory, setInputCategory] = useState<string>('');

  const handleInputNationID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNationID(e.target.value);
  };
  const handleInputQuizType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuizType(e.target.value);
  };
  const handleInputCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCategory(e.target.value);
  };

  const openAPIQuizAxios = async () => {
    const DOMAIN = process.env.REACT_APP_BASE_URL;
    const getLoginToken = sessionStorage.getItem('token');
    try {
      const response = await CustomAxios({
        APIName: 'openAPIQuizAxios',
        APIType: 'get',
        UrlQuery:
          DOMAIN +
          `/get/quiz?nationId=${inputNationID}&quizType=${inputQuizType}&category=${inputCategory}`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      //console.log('랭크 리스트 받은 거: ', response);
      setResponseData(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('openAPI Quiz Axios Error:', error);
      setResponseData('응답 데이터가 존재하지 않는 Params 설정입니다.');
    }
    //console.log('token이 무엇이냐 ', token);
  };

  const [nationCodeState, setNationCodeState] = useState<boolean>(false);

  const nationCode: string[] = [
    '태국',
    '싱가포르',
    '보물상자',
    '인도',
    '특수지역',
    '사우디',
    '중국',
    '일본',
    '대한민국',
    '무인도',
    '헝가리',
    '스페인',
    '보물상자',
    '이탈리아',
    '특수지역',
    '스위스',
    '독일',
    '프랑스',
    '영국',
    '정거장',
    '가나',
    '소말리아',
    '보물상자',
    '모로코',
    '특수지역',
    '남아공',
    '이집트',
    '호주',
    '뉴질랜드',
    '올림픽',
    '칠레',
    '페루',
    '보물상자',
    '브라질',
    '특수지역',
    '멕시코',
    '국세청',
    '캐나다',
    '미국',
  ];

  const QuizRequestContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-col justify-start items-start border-0 border-b-[1.5px] border-b-[#4E4E4E] border-solid pb-[20px]'>
            <div className='flex flex-row justify-start items-center text-[18px]  font-PtdRegular'>
              <span className='text-[#5d5d5d]'>Worldy/UserAPI/</span>
              <span className='text-white'>getQuiz</span>
            </div>
            <div className='w-full h-[50px] my-[20px] flex flex-row justify-between items-center'>
              <div className='flex-1 flex flex-row h-full justify-between bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848]'>
                <div className='flex flex-row h-full'>
                  <div className='w-[100px] h-full pl-[20px] border-0 border-r-[1px] border-solid border-[#484848] text-white font-PtdRegular flex flex-row justify-start items-center'>
                    GET
                  </div>
                  <div className='pl-[20px] flex-1 flex flex-row justify-start items-center text-[14px] text-white font-PtdLight'>
                    https://k8a507.p.ssafy.io/api/get/quiz?nationID=
                    <span
                      className={`${inputNationID === '' && 'text-[#6a6a6a]'}`}
                    >
                      {inputNationID === '' ? '(nation_ID값)' : inputNationID}
                    </span>
                    &quizType=
                    <span
                      className={`${inputQuizType === '' && 'text-[#6a6a6a]'}`}
                    >
                      {inputQuizType === '' ? '(quizType값)' : inputQuizType}
                    </span>
                    &category=
                    <span
                      className={`${inputCategory === '' && 'text-[#6a6a6a]'}`}
                    >
                      {inputCategory === '' ? '(category값)' : inputCategory}
                    </span>
                  </div>
                </div>
                <button
                  className='mr-[15px] text-white'
                  onClick={() => {
                    setInputCategory('');
                    setInputNationID('');
                    setInputQuizType('');
                  }}
                >
                  <FiRotateCcw />
                </button>
              </div>
              <button
                className='w-[80px] mx-[10px] rounded-md h-full ml-[10px] bg-[#097BED] font-PtdRegular text-white text-[15px]'
                onClick={openAPIQuizAxios}
              >
                Send
              </button>
            </div>
            <div className='w-[43%] h-[20px] flex flex-row justify-between items-center cursor-default'>
              <span className='text-[15px] text-white font-PtdRegular ml-[10px] border-0 border-b-[1.5px] border-solid border-[#FF4D45] pb-[5px] px-[2px]'>
                Params
              </span>
              <span className='text-[15px] flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Authorization
                <div className='ml-[8px] w-[6px] h-[6px] rounded-full bg-[#25CABB]' />
              </span>
              <span className='text-[15px] flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Headers <span className='text-[#25CABB]'>(8)</span>
              </span>
              <span className='text-[15px] text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Body
              </span>
            </div>
            <span className='text-[15px] text-white font-PtdRegular ml-[10px] mt-[20px]'>
              Query String
            </span>
          </div>
          <div className='w-full h-[220px] px-[10px] py-[20px] outline-white flex flex-col justify-between items-stretch '>
            <div className='w-full h-[50px] flex flex-row justify-between items-center'>
              <div className='font-PtdRegular relative flex-1 flex flex-row justify-between items-center text-white mr-[20px]'>
                Nation_ID
                <AiOutlineQuestionCircle
                  className='cursor-pointer'
                  color={nationCodeState ? 'white' : '#5d5d5d'}
                  size={23}
                  onMouseEnter={() => setNationCodeState(true)}
                  onMouseLeave={() => setNationCodeState(false)}
                />
              </div>
              <input
                className='w-[87%] h-full px-[20px] flex flex-row justify-start items-center bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight placeholder-[#606060]'
                placeholder='국가별 코드 숫자'
                onChange={(e) => handleInputNationID(e)}
                value={inputNationID}
              />
            </div>
            <div className='w-full h-[50px] flex flex-row justify-between items-center'>
              <span className='font-PtdRegular text-white mr-[15px]'>
                quizType
              </span>
              <input
                className='w-[87%] h-full px-[20px] flex flex-row justify-start items-center bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight placeholder-[#606060]'
                placeholder="객관식:'multi' / OX:'ox' / 빈칸채우기:'blank'"
                onChange={(e) => handleInputQuizType(e)}
                value={inputQuizType}
              />
            </div>
            <div className='w-full h-[50px] flex flex-row justify-between items-center'>
              <span className='font-PtdRegular text-white mr-[15px]'>
                Category
              </span>
              <input
                className='w-[87%] h-full px-[20px] flex flex-row justify-start items-center bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight placeholder-[#606060]'
                placeholder="문화,역사:'cul' / 시사,상식:'aff' / 기타:'etc'"
                onChange={(e) => handleInputCategory(e)}
                value={inputCategory}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [inputDiffNationID, setInputDiffNationID] = useState<string>('');
  const handleInputDiffNationID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDiffNationID(e.target.value);
  };
  const openAPIDiffImagesAxios = async () => {
    const DOMAIN = process.env.REACT_APP_BASE_URL;
    const getLoginToken = sessionStorage.getItem('token');
    try {
      const response = await CustomAxios({
        APIName: 'openAPIDiffImagesAxios',
        APIType: 'get',
        UrlQuery: DOMAIN + `/quiz/hidden/${inputDiffNationID}`,
        Token: getLoginToken,
      });
      //console.log('닉네임 중복 체크 성공');
      //console.log('랭크 리스트 받은 거: ', response);
      setResponseDiffData(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('openAPI Quiz Axios Error:', error);
      setResponseDiffData('응답 데이터가 존재하지 않는 Params 설정입니다.');
    }
    //console.log('token이 무엇이냐 ', token);
  };

  const DiffImagesRequestContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-col justify-start items-start border-0 border-b-[1.5px] border-b-[#4E4E4E] border-solid pb-[20px]'>
            <div className='flex flex-row justify-start items-center text-[18px]  font-PtdRegular'>
              <span className='text-[#5d5d5d]'>Worldy/UserAPI/</span>
              <span className='text-white'>getDiffImages</span>
            </div>
            <div className='w-full h-[50px] my-[20px] flex flex-row justify-between items-center'>
              <div className='flex-1 flex flex-row h-full justify-between bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848]'>
                <div className='flex flex-row h-full'>
                  <div className='w-[100px] h-full pl-[20px] border-0 border-r-[1px] border-solid border-[#484848] text-white font-PtdRegular flex flex-row justify-start items-center'>
                    GET
                  </div>
                  <div className='pl-[20px] flex-1 flex flex-row justify-start items-center text-[14px] text-white font-PtdLight'>
                    https://k8a507.p.ssafy.io/api/quiz/hidden/
                    <span
                      className={`${
                        inputDiffNationID === '' && 'text-[#6a6a6a]'
                      }`}
                    >
                      {inputDiffNationID === ''
                        ? '(nation_ID값)'
                        : inputDiffNationID}
                    </span>
                  </div>
                </div>
                <button
                  className='mr-[15px] text-white'
                  onClick={() => {
                    setInputDiffNationID('');
                  }}
                >
                  <FiRotateCcw />
                </button>
              </div>
              <button
                className='w-[80px] mx-[10px] rounded-md h-full ml-[10px] bg-[#097BED] font-PtdRegular text-white text-[15px]'
                onClick={openAPIDiffImagesAxios}
              >
                Send
              </button>
            </div>
            <div className='w-[43%] h-[20px] flex flex-row justify-between items-center cursor-default'>
              <span className='text-[15px] text-white font-PtdRegular ml-[10px] border-0 border-b-[1.5px] border-solid border-[#FF4D45] pb-[5px] px-[2px]'>
                Params
              </span>
              <span className='text-[15px] flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Authorization
                <div className='ml-[8px] w-[6px] h-[6px] rounded-full bg-[#25CABB]' />
              </span>
              <span className='text-[15px] flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Headers <span className='text-[#25CABB]'>(8)</span>
              </span>
              <span className='text-[15px] text-[#5d5d5d] font-PtdRegular ml-[10px] pb-[5px] px-[2px]'>
                Body
              </span>
            </div>
            <span className='text-[15px] text-white font-PtdRegular ml-[10px] mt-[20px]'>
              Query String
            </span>
          </div>
          <div className='w-full h-fit px-[10px] py-[20px] outline-white flex flex-col justify-between items-stretch '>
            <div className='w-full h-[50px] flex flex-row justify-between items-center'>
              <div className='font-PtdRegular relative flex-1 flex flex-row justify-between items-center text-white mr-[20px]'>
                Nation_ID
                <AiOutlineQuestionCircle
                  className='cursor-pointer'
                  color={nationCodeState ? 'white' : '#5d5d5d'}
                  size={23}
                  onMouseEnter={() => setNationCodeState(true)}
                  onMouseLeave={() => setNationCodeState(false)}
                />
              </div>
              <input
                className='w-[87%] h-full px-[20px] flex flex-row justify-start items-center bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight placeholder-[#606060]'
                placeholder='국가별 코드 숫자'
                onChange={(e) => handleInputDiffNationID(e)}
                value={inputDiffNationID}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [responseData, setResponseData] = useState<string>(
    'waiting for Response Data...'
  );
  const [responseDiffData, setResponseDiffData] = useState<string>(
    'waiting for Response Data...'
  );

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const QuizTestContent = () => {
    return (
      <div className=' w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-col justify-start items-start'>
            <span className='flex flex-row justify-start items-center text-[18px]  font-PtdRegular text-white'>
              Response
            </span>
            <div className='w-[140px] h-[20px] text-[14px] flex flex-row justify-between items-center mt-[25px]'>
              <span className=' text-white font-PtdRegular border-0 border-b-[1.5px] border-solid border-[#FF4D45] pb-[5px] px-[2px]'>
                Body
              </span>
              <span className='flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular pb-[5px] px-[2px]'>
                Header(8)
              </span>
            </div>
            <div className='w-full min-h-[200px] h-fit flex flex-col justify-start items-start my-[20px] bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight p-[10px]'>
              <div className='w-full h-[30px] flex flex-row justify-between items-center'>
                <button className='w-[60px] h-[30px] text-[12px] font-PtdLight rounded-md bg-[#0b0b0b]'>
                  JSON
                </button>
                <button
                  onClick={() => {
                    handleCopyClipBoard(responseData);
                  }}
                >
                  <RiFileCopyLine size={27} />
                </button>
              </div>
              <div className='w-full h-fit text-white font-PtdLight leading-[18px] text-[14px] mt-[15px] mb-[20px] px-[5px] whitespace-pre-wrap '>
                <pre className='whitespace-pre-wrap'>{responseData}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const DiffImagesTestContent = () => {
    return (
      <div className=' -translate-y-[130px] w-[100%] min-h-[100px] h-fit outline-white flex flex-col justify-stretch items-start bg-[#0a0a26]'>
        <div className='w-full h-fit outline-white flex flex-col justify-start items-start py-[50px] px-[50px]'>
          <div className='w-full h-fit flex flex-col justify-start items-start'>
            <span className='flex flex-row justify-start items-center text-[18px]  font-PtdRegular text-white'>
              Response
            </span>
            <div className='w-[140px] h-[20px] text-[14px] flex flex-row justify-between items-center mt-[25px]'>
              <span className=' text-white font-PtdRegular border-0 border-b-[1.5px] border-solid border-[#FF4D45] pb-[5px] px-[2px]'>
                Body
              </span>
              <span className='flex flex-row justify-start items-center text-[#5d5d5d] font-PtdRegular pb-[5px] px-[2px]'>
                Header(8)
              </span>
            </div>
            <div className='w-full min-h-[200px] h-fit flex flex-col justify-start items-start my-[20px] bg-[#2c2c2cb7] rounded-md outline outline-[1px] outline-[#484848] text-white font-PtdLight p-[10px]'>
              <div className='w-full h-[30px] flex flex-row justify-between items-center'>
                <button className='w-[60px] h-[30px] text-[12px] font-PtdLight rounded-md bg-[#0b0b0b]'>
                  JSON
                </button>
                <button
                  onClick={() => {
                    handleCopyClipBoard(responseDiffData);
                  }}
                >
                  <RiFileCopyLine size={27} />
                </button>
              </div>
              <div className='w-full h-fit text-white font-PtdLight leading-[18px] text-[14px] mt-[15px] mb-[20px] px-[5px] whitespace-pre-wrap '>
                <pre className='whitespace-pre-wrap'>{responseDiffData}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className='w-full h-full flex flex-row justify-center items-center overflow-y-clip bg-[#02020e]'
      style={{ backgroundImage: `url(${pathBg})`, backgroundSize: '100%' }}
    >
      {loadedAll ? (
        <>
          <div
            className={`relative w-[80%] h-full  flex flex-row justify-stretch items-center  `}
          >
            {nationCodeState && (
              <div className='absolute z-40 top-[20px] -left-[160px] w-[150px] h-fit  bg-[rgba(100,100,100,0.3)] outline outline-[1.5px] outline-white rounded-md flex flex-col justify-start items-start p-[8px] text-white font-PtdRegular'>
                {nationCode.map(
                  (item, key) =>
                    item !== '보물상자' &&
                    item !== '특수지역' &&
                    item !== '무인도' &&
                    item !== '정거장' &&
                    item !== '올림픽' &&
                    item !== '국세청' && (
                      <div
                        key={key}
                        className='py-[6px] w-full flex flex-row justify-between items-center'
                        style={
                          key !== 0
                            ? { borderTop: '1px dashed rgba(255,255,255,0.3)' }
                            : {}
                        }
                      >
                        <span>{item}</span>
                        <span>{key + 1}</span>
                      </div>
                    )
                )}
              </div>
            )}
            <div
              className='flex-1 h-full pt-[60px]  overflow-y-scroll pb-[30em]'
              ref={containerRef}
            >
              <div className='w-full h-[250px] pt-[20px]'>{StartOpenAPI()}</div>
              <div
                className={`w-[190%]  outline-red-300 overflow-hidden h-fit pt-[20px] flex flex-row text-white transition-all duration-[800ms] ease-out ${
                  changeAPIState ? '-translate-x-1/2' : 'translate-x-0'
                }`}
                ref={firstRef}
              >
                <div
                  className={`w-1/2 ${
                    changeAPIState ? 'opacity-0' : 'opacity-100'
                  }
                  transition-all duration-[800ms] ease-out`}
                >
                  {QuizOpenAPIContent()}
                </div>
                <div
                  className={`w-1/2 ${
                    !changeAPIState ? 'opacity-0' : 'opacity-100'
                  } transition-all duration-[800ms] ease-out`}
                >
                  {DiffImagesOpenAPIContent()}
                </div>
              </div>
              <div
                className={`w-[190%]  outline-red-300 overflow-hidden h-fit pt-[20px] flex flex-row text-white transition-all duration-[800ms] ease-out ${
                  changeAPIState ? '-translate-x-1/2' : 'translate-x-0'
                }`}
                ref={secondRef}
              >
                <div
                  className={`w-1/2 ${
                    changeAPIState ? 'opacity-0' : 'opacity-100'
                  }
                  transition-all duration-[800ms] ease-out`}
                >
                  {QuizInfoGetContent()}
                </div>
                <div
                  className={`w-1/2 ${
                    !changeAPIState ? 'opacity-0' : 'opacity-100'
                  } transition-all duration-[800ms] ease-out`}
                >
                  {DiffImagesInfoGetContent()}
                </div>
              </div>
              <div
                className={`w-[190%]  outline-red-300 overflow-hidden h-fit pt-[20px] flex flex-row text-white transition-all duration-[800ms] ease-out ${
                  changeAPIState ? '-translate-x-1/2' : 'translate-x-0'
                }`}
                ref={thirdRef}
              >
                <div
                  className={`w-1/2 ${
                    changeAPIState ? 'opacity-0' : 'opacity-100'
                  }
                  transition-all duration-[800ms] ease-out`}
                >
                  {QuizRequestContent()}
                </div>
                <div
                  className={`w-1/2 ${
                    !changeAPIState ? 'opacity-0' : 'opacity-100'
                  } transition-all duration-[800ms] ease-out`}
                >
                  {DiffImagesRequestContent()}
                </div>
              </div>
              <div
                className={`w-[190%]  outline-red-300  h-fit pt-[20px] flex flex-row text-white transition-all duration-[800ms] ease-out ${
                  changeAPIState ? '-translate-x-1/2' : 'translate-x-0'
                }
                `}
                ref={fourthRef}
              >
                <div
                  className={`w-1/2 ${
                    changeAPIState ? 'opacity-0' : 'opacity-100'
                  }
                  transition-all duration-[800ms] ease-out`}
                >
                  {QuizTestContent()}
                </div>
                <div
                  className={`w-1/2 ${
                    !changeAPIState ? 'opacity-0' : 'opacity-100'
                  } transition-all duration-[800ms] ease-out`}
                >
                  {DiffImagesTestContent()}
                </div>
              </div>
            </div>
            <div className='w-[25%] h-full pt-[5em]'>
              <div className='w-[90%] h-fit  flex flex-col items-end'>
                <div className='flex flex-row justify-end '>
                  <span className='text-white font-PtdBold text-[3em]'>
                    Developers
                  </span>
                </div>
                <div className='w-full h-fit my-[3em] pl-[20px]  outline-white'>
                  {QuizAPIMenuItems.map((item, index) =>
                    OpenAPIMenuComponent({ input: item, key: index })
                  )}
                  <div className='h-[20px]' />
                  {DiffImagesAPIMenuItems.map((item, index) =>
                    OpenAPIMenuComponent({ input: item, key: index + 4 })
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

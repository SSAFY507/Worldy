import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBg from '../assets/images/SupportBackground.png';

import '../styles/SupportStyles.css';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import SupportModal from '../components/SupportModal';
import LoaderBlueCircle from '../components/Loaders/LoaderBlueCircle';
import CustomAxios from '../API/CustomAxios';
import axios from 'axios';
import SHLoader from '../components/Loaders/SHLoader';

type SupportItemType = {
  content: string;
  date: string;
  category?: string;
  response?: string;
};

type getHelpItemType = {
  helpId?: number;
  category: string;
  content: string;
  answer: string | null;
};

export default function Support({
  qnaModalNumber,
}: {
  qnaModalNumber: number;
}) {
  const myImageList = {
    pathBgpath: pathBg,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);
  const getToken = sessionStorage.getItem('token') || '';

  const [getHelpAllResult, setGetHelpAllResult] = useState<getHelpItemType[]>(
    []
  );

  const [sortedHelpResult, setSortedHelpResult] = useState<getHelpItemType[][]>(
    [[]]
  );
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalType, setModalType] = useState<boolean>(false);
  const sortingHelpResult = () => {
    const list1: getHelpItemType[] = [];
    const list2: getHelpItemType[] = [];
    const list3: getHelpItemType[] = [];
    if (getHelpAllResult.length !== 0) {
      for (let i = 0; i < getHelpAllResult.length; i++) {
        const item = getHelpAllResult[i];
        if (item.category === '계정/보안') list1.push(item);
        else if (item.category === '게임문의') list2.push(item);
        else if (item.category === '기타문의') list3.push(item);
      }
    }
    setSortedHelpResult([list1, list2, list3]);
  };
  useEffect(() => {
    sortingHelpResult();
  }, [getHelpAllResult]);

  const getAllHelpCustomAxios = async () => {
    //console.log('getAllHelp 커스터엄 토큰 : ', getToken);
    try {
      const response = await CustomAxios({
        APIName: 'getAllHelp',
        APIType: 'get',
        UrlQuery: 'https://k8a507.p.ssafy.io/api/help/all',
        Token: getToken,
      });
      setGetHelpAllResult(response);
      //console.log('get All Help모든 데이터 : ' + response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllHelpCustomAxios();
  }, []);

  useEffect(() => {
    //console.log(modalOn);
    getAllHelpCustomAxios();
  }, [modalOn]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
        //console.log(loadedImages);
      }, 1000);
    }
  }, [isLoaded]);

  const [searchText, setSearchText] = useState<string>('');

  async function searchElasticBasic(input: string) {
    //console.log('베이직 엑시오스');
    //console.log('현재 검색어', input);

    try {
      const response = await axios.post(
        'https://k8a507.p.ssafy.io/es/_search',
        // 요청 바디 데이터를 객체 형식으로 전달합니다.
        {
          query: {
            match: {
              'content.nori': input,
            },
          },
        }
        // { category: askTypeList[askType].name, content: contentText },
      );
      //console.log('엘라스틱 결과 : ', response.data.hits.hits);
      // console.log(
      //   '엘라스틱 결과 :??? ',
      //   response.data.hits.hits[0]
      //     ? response.data.hits.hits[0]._source.category
      //     : '없음'
      // );
      spreadElasticSearch(response.data.hits.hits);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const handleSearchText = (input: string) => {
    //console.log('인풋 input TExt', input);
    setSearchText(input);
    // searchElastic(input);
    searchElasticBasic(input);
    setSubjectIndex(5);
  };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleSubmitSearch();
  //   }
  // };

  // const handleSubmitSearch = () => {
  //   console.log(searchText);
  // };

  const spreadElasticSearch = (input: any) => {
    let tempList: getHelpItemType[] = [];
    for (let i = 0; i < input.length; i++) {
      const content = input[i]._source.content;
      const category = input[i]._source.category;
      tempList.push({
        content: content,
        category: category,
        answer: '담당자가 검토 중인 글입니다...',
      });
    }
    setSearchResults(tempList);
  };

  const [subjectIndex, setSubjectIndex] = useState<number>(0);
  useEffect(() => {
    subjectIndex !== 5 && setSearchText('');
  }, [subjectIndex]);

  const handleSubjectIndex = (index: number) => {
    setSubjectIndex(index);
    setResState(-1);
  };
  const [searchResults, setSearchResults] = useState<getHelpItemType[]>([]);

  const subjectList: getHelpItemType[][] = [
    [
      {
        category: '자주 묻는 질문',
        content: '따로 계정을 생성할 수는 없나요?',
        answer:
          '카카오톡 계정을 이용하여 로그인하는 서비스로, 카카오톡을 가입하셔야합니다.',
      },
      {
        category: '자주 묻는 질문',
        content: '여러 계정을 사용하고싶은데, 방법이 없을까요?',
        answer:
          '개인정보 보호 및 악성 플레이 사전 방지를 위해 1명당 1개의 계정 사용을 권고드립니다.',
      },
      {
        category: '자주 묻는 질문',
        content:
          '국내 전화번호 계정을 해외 전화번호 계정으로 변경하려 합니다. 해외 전화번호 변경 후 현재 플레이 중인 아이디를 계속 이용할 수 있나요?',
        answer:
          '아니요, 이용할 수 없습니다. 해외 전화번호 계정으로 이전 시 데이터는 모두 삭제되며, 복구할 수 없습니다.',
      },
      {
        category: '자주 묻는 질문',
        content:
          '현재 사용중인 계정의 명의와 다른 명의로 된 전화번호를 사용하고 있습니다. 해당 전화번호로 계정 변경이 가능한가요?',
        answer: '아니요, 동일한 명의를 가진 전화번호로만 변경이 가능합니다. ',
      },
    ],
    getHelpAllResult,
    sortedHelpResult[0],
    sortedHelpResult[1],
    sortedHelpResult[2],
    searchResults,
  ];

  const [resState, setResState] = useState<number>(-1);

  const openResponse = (index: number) => {
    index === resState ? setResState(-1) : setResState(index);
    //console.log('index', index);
    //console.log('resState', resState);
  };

  const ItemBox = (item: getHelpItemType, index: number) => {
    return (
      <div
      // className={`${
      //   resState !== index
      //     ? ''
      //     : ' outline outline-[1px] outline-[rgb(175,175,175)]'
      // }`}
      // className={` outline outline-white ${
      //   subjectList[subjectIndex].length === index + 1 ? 'mb-[50px]' : ''
      // }}`}
      >
        <button
          className={`w-full h-fit flex flex-row justify-between items-center px-[15px] py-[10px] 
          ${
            resState !== index
              ? 'bg-[rgba(90,90,90,0.6)]'
              : 'bg-[rgba(120,120,120,0.6)]'
          }
          `}
          onClick={() => openResponse(index)}
        >
          <div className=' w-[95%] h-fit min-h-[60px] flex flex-col justify-between items-start '>
            <div className='flex flex-row my-[5px] justify-start items-center text-white text-[20px] p-[10px] min-h-1/2 w-full h-fit leading-6 text-start'>
              <span className='text-[26px]'>Q. &nbsp;</span>
              {item.content}
            </div>
            <div className='min-h-1/2 w-1/5 my-[5px]  flex flex-row justify-start items-center text-gray-400 text-[16px] font-PtdLight'>
              <div className='px-[10px] '>{item.category}</div>
            </div>
          </div>
          <div
            className={`w-[3%] h-[50px] flex justify-center items-center transition-transform 2s ease-in-out
          ${resState === index ? 'rotate-90' : 'rotate-[270deg]'}
          `}
          >
            <svg
              stroke=''
              fill='rgba(164,164,164,0.8)'
              strokeWidth='0'
              viewBox='0 0 16 16'
              height='1.5em'
              width='1.5em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </button>
        <div
          className={` ${
            resState !== index
              ? 'w-0 h-0 opacity-0'
              : 'w-full h-fit opacity-100 mt-[0px]  flex flex-col justify-between items-center px-[15px] py-[10px] bg-[rgba(60,60,60,0.5)]'
          }
          `}
        >
          <div className='flex flex-row my-[5px] justify-start items-center text-white text-[20px] p-[10px] min-h-1/2 w-full h-fit leading-6 text-start transit'>
            <span className='text-[26px]'>A. &nbsp;</span>{' '}
            {resState === index
              ? item.answer
                ? item.answer
                : '담당자가 검토 중인 글입니다...'
              : null}
          </div>
          <div className='w-full h-[50px] flex flex-row justify-end items-center'>
            <span className='text-white mx-[20px] text-[15px] flex flex-row justify-center items-center font-PtdLight'>
              추가적으로 궁금한 게 있으신가요?
            </span>
            <button
              onClick={() => handleSupportModal(true)}
              className=' rounded-full w-[80px] h-[70%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'
            >
              문의하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSupportModal = (type: boolean) => {
    setModalOn(!modalOn);
    setModalType(type);
  };

  useEffect(() => {
    if (qnaModalNumber === 1) {
      setModalOn(true);
      setModalType(true);
    } else if (qnaModalNumber === 2) {
      setModalOn(true);
      setModalType(false);
    }
  }, []);

  return (
    <div
      className={`hide-scrollbar w-full h-full min-h-full ${
        !loadedAll ? '' : 'pt-[20px]'
      } flex justify-center items-start overflow-y-clip relative`}
      style={{ backgroundImage: `url(${pathBg})`, backgroundSize: '100%' }}
    >
      {loadedAll ? (
        <>
          {modalOn && (
            <SupportModal
              type={modalType}
              handleCloseModal={() => setModalOn(false)}
            />
          )}
          <div
            className={`${
              modalOn ? 'blur-sm' : ''
            } w-full h-fit flex flex-col justify-stretch items-center`}
          >
            <div className='w-full h-[300px]   flex flex-col justify-start items-center'>
              <div className='w-[100%] h-full   flex justify-start flex-col items-center px-[10px]'>
                <div className='my-[10px]  w-[100%] h-[17%] flex flex-row justify-end items-center px-[100px]'>
                  <div className='  w-[15%] h-full mr-[180px] flex flex-row justify-between items-center'>
                    <button
                      onClick={() => handleSupportModal(true)}
                      className=' rounded-full w-[120px] h-[90%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'
                    >
                      문의하기
                    </button>
                    <button
                      onClick={() => handleSupportModal(false)}
                      className='rounded-full w-[120px] h-[90%] outline outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'
                    >
                      신고하기
                    </button>
                  </div>
                </div>
                <div className='my-[10px]  w-[50%] h-[25%] grid justify-center items-center text-[40px] font-PtdExtraBold text-white'>
                  고객 지원
                </div>
                <div className='my-[10px]  outline-red-500 w-[35%] h-[25%] flex flex-row justify-stretch items-center'>
                  <button className='w-[60px] h-[60px] bg-white grid justify-center items-center rounded-l-[4px]'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 1024 1024'
                      height='1.5em'
                      width='1.5em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z'></path>
                    </svg>
                  </button>
                  <input
                    className='bg-white h-[60px] w-full px-[0px] text-[20px] rounded-r-[4px]'
                    type='text'
                    value={searchText}
                    onChange={(e) => {
                      handleSearchText(e.target.value);
                    }}
                    placeholder='검색'
                    // onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
            </div>
            <div className='h-[80px] w-full  outline-yellow-400 flex justify-center items-stretch  border-b-[1px] border-0 border-b-[rgba(164,163,163,0.5)] border-solid'>
              <div className='w-[70%] h-full flex justify-start'>
                <button
                  className={`flex flex-row justify-between items-center w-[220px] h-full  outline-red-500 text-[22px] ${
                    subjectIndex === 0
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(0)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-between items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px] border-dotted'>
                    <svg
                      width='22'
                      height='23'
                      viewBox='0 0 16 17'
                      xmlns='http://www.w3.org/2000/svg'
                      fill={
                        subjectIndex === 0 ? '#ff4d45' : 'rgba(147,147,147,0.7)'
                      }
                      opacity='1'
                    >
                      <path
                        d='M14.412 0C15.294 0 16 .68 16 1.529V11.55c0 .529-.275 1.02-.745 1.303l-6.392 3.906c-.53.321-1.177.321-1.706 0L.745 12.853A1.514 1.514 0 0 1 0 11.55V1.53C0 .679.706 0 1.588 0zM7.748 2.485C5.582 2.485 4.11 3.9 4.11 6.407c0 2.156 1.088 3.562 2.774 3.922.576 1.221 1.78 2.094 3.509 2.094.63 0 1.141-.103 1.44-.257l-.33-1.334-.155.046a2.882 2.882 0 0 1-.742.097c-.64 0-1.354-.195-1.717-.718 1.525-.442 2.496-1.818 2.496-3.85 0-2.495-1.472-3.922-3.637-3.922zm0 1.57c1.045 0 1.696.873 1.696 2.352 0 1.591-.651 2.505-1.696 2.505-1.046 0-1.686-.914-1.686-2.505 0-1.479.64-2.352 1.686-2.352z'
                        fill='current'
                        fillRule='evenodd'
                      ></path>
                    </svg>
                    자주 묻는 질문
                  </div>
                </button>
                <button
                  className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                    subjectIndex === 1
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(1)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px]  border-solid'>
                    전체
                  </div>
                </button>
                <button
                  className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                    subjectIndex === 2
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(2)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px] border-solid'>
                    계정/보안
                  </div>
                </button>
                <button
                  className={`flex justify-center items-center w-fit h-full  text-[20px]  ${
                    subjectIndex === 3
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(3)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px]  border-solid'>
                    게임문의
                  </div>
                </button>
                <button
                  className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                    subjectIndex === 4
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(4)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center border-r-[rgba(164,163,163,0.5)] border-r-[2px]  border-solid'>
                    기타문의
                  </div>
                </button>
                <button
                  className={`flex justify-center items-center w-fit h-full   text-[20px]  ${
                    subjectIndex === 5
                      ? 'text-[#ff4d45] font-PtdMedium  border-0 border-b-[2px] border-b-[#ff4d45] border-solid'
                      : 'text-[rgba(147,147,147,0.7)] font-PtdLight'
                  }`}
                  onClick={() => handleSubjectIndex(5)}
                >
                  <div className=' px-[30px] py-[5px] w-full h-fit flex flex-row justify-center items-center'>
                    검색 결과
                  </div>
                </button>
              </div>
            </div>
            <div className='on-scrollbar-support w-[70%] h-[450px] pt-[20px] px-[15px] pb-0 mb-0 flex flex-col justify-start items-center overflow-y-scroll '>
              {subjectList[subjectIndex].map((item, index) => (
                <div
                  key={index}
                  className=' outline-white  my-[10px] w-full h-fit '
                >
                  {item.category !== '-' && ItemBox(item, index)}
                </div>
              ))}
              <div className=' h-[50px]'></div>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-full bg-white pt-20'>
          <SHLoader text='무엇을 도와드릴까요?' />
        </div>
      )}
    </div>
  );
}

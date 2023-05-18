import { AiOutlineClose, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';

import CustomAxios from '../../API/CustomAxios';
import { IoIosPhotos } from 'react-icons/io';
import QuizBlueText from '../../assets/images/QuizBlueText.png';
import { QuizDataType } from './CountryQuizFrame';
import ResultBlueText from '../../assets/images/ResultBlueText.png';
import tempImage1 from '../../assets/images/thumb2.png';
import Swal from "sweetalert2";

interface Props {
  selectAsset: string,
  axiosGetQuizData: QuizDataType[] | undefined,
  GetRegameFlag: (num:number) => void
};

interface RequestBodyType {
  [key:string]: number | boolean | string
}

const DOMAIN = process.env.REACT_APP_BASE_URL

const CountryQuizDetailModal = ({selectAsset, axiosGetQuizData, GetRegameFlag}:Props) => {
  const userNickName: string | null = sessionStorage.getItem('nickname');
  const getLoginToken: string | null = sessionStorage.getItem('token');


  const input = axiosGetQuizData![0]
  const multiList = axiosGetQuizData![0].multiAnswerList!
  const size: number = 200;
  const textSize: number = 200 / (input.content.length / 20);
  const blankBoxSize: number = 400 / input.answer.length;
  
  const [submitAnswer, setSubmitAnswer] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [hintState, setHintState] = useState<boolean>(false);
  const [blankInputAnswer, setBlankInputAnswer] = useState<string[]>(
    new Array(input.answer.length).fill('')
    );
  const [scrapped, setScrapped] = useState<boolean>(true);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [correctState, setCorrectState] = useState<boolean | null>(null);
  const [hintImageState, setHintImageState] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);
  const [showBack, setShowBack] = useState<boolean>(false);

  // "userId" : "유저 아이디", - Long
  // "quizId" : "퀴즈 아이디", - Long
  // "success" : "성공 여부", - boolean
  // "userAnswer" : "유저가 쓴 답" - String
  // "scrap" : "스크랩 여부" - boolean

  /** 데이터 보내는 함수 */
  const postDatasList = async (result:any) => {
    console.log("userNickName", userNickName)
    console.log("input.quizId", input.quizId )
    console.log("result", result )
    console.log("submitAnswer", submitAnswer )
    console.log("scrapped", scrapped )
    try {
      const requestBody = new Map([
        ["userNickName", userNickName],
        ["quizId", Number(input.quizId)],
        ["success", result],
        ["userAnswer", submitAnswer],
        ["scrap", scrapped]
      ])

      const response = await CustomAxios({
        APIName: 'postDatasList',
        APIType: 'post',
        UrlQuery: DOMAIN + '/quiz/record',
        Body: requestBody,
        Token: getLoginToken,
      });
      GetRegameFlag(-2);
      console.log(response);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const handleComposition = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    console.log('composition');
    if (event.type === 'compositionend') {
      const target = event.target as HTMLInputElement;
      const index = inputRefs.current.indexOf(target);
      if (
        index !== -1 &&
        index < blankBoxSize - 1 &&
        target.value.length === 1
      ) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const index = inputRefs.current.indexOf(target);
    console.log('input');
    if (
      index !== -1 &&
      index < blankBoxSize - 1 &&
      target.value.length === 1 &&
      !target.value.match(/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/)
    ) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleBlankAnswer = ({
    e,
    i,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    i: number;
  }) => {
    const tempStringList: string[] = [...blankInputAnswer];
    tempStringList[i] = e.target.value;
    setBlankInputAnswer(tempStringList);
    console.log('tempStringList', tempStringList);
    if (tempStringList.length === input.answer.length) {
      var tempString = '';
      for (let i = 0; i < tempStringList.length; i++) {
        tempString += tempStringList[i];
      }
      setSubmitAnswer(tempString);
    }
  };

  const handleSubmitAnswer = (input: string) => {
    if (submitAnswer === input) setSubmitAnswer('');
    else setSubmitAnswer(input);
  };

  const handleSubmitMultiAnswer = (input: number) => {
    const submitted = input.toString();
    if (submitAnswer === submitted) setSubmitAnswer('');
    else setSubmitAnswer(submitted);
  };

  const handleHint = () => {
    setHintState(!hintState);
    console.log('잉');
    console.log('input.hint', input.hint);
  };

  const blankBoxComponent = () => {
    const tempCompList: JSX.Element[] = [];
    for (let i = 0; i < input.answer.length; i++) {
      tempCompList.push(
        <input
          key={i}
          style={{
            width: `${blankBoxSize}px`,
            height: `${blankBoxSize}px`,
            fontSize: `${blankBoxSize * (2 / 3)}px`,
          }}
          className={`rounded-xl ${
            blankInputAnswer[i] === ''
              ? 'bg-[#cecece] outline outline-[#f1f1f1]'
              : 'bg-[#66ded0] shadow-lg'
          }  text-white text-center`}
          maxLength={1}
          ref={(element) => (inputRefs.current[i] = element)}
          onInput={handleInput}
          onCompositionEnd={handleComposition}
          value={blankInputAnswer[i]}
          onChange={(e) => handleBlankAnswer({ e, i })}
          placeholder={hintState ? `${input.hint.charAt(i)}` : ''}
        />
      );
    }
    return tempCompList;
  };

  const contentOX = (): JSX.Element => {
    return (
      <>
        <div
          className={`w-full h-full flex flex-col justify-center items-center p-[30px] text-black transition-all duration-3000 ease-in`}
        >
          {hintState ? (
            <>
              <div className='w-[200px] h-[50px] flex flex-row justify-center items-center mb-[10px]'>
                <AiOutlineExclamationCircle size={35} color={'#96B9BB'} />
                <span className='ml-[15px] text-[25px] text-[#ACACAC]'>
                  힌트
                </span>
              </div>
              <div className='w-full h-[150px] px-[50px] text-center'>
                <span className='text-gray-700 font-PtdSemiBOld text-[25px] leading-[32px]'>
                  {input.hint}
                </span>
              </div>
            </>
          ) : (
            <div className='outline-black flex flex-row justify-between items-center'>
              <button
                className={`${
                  submitAnswer === 'o' ? 'clickedOXBlue' : 'bg-[#F2F2F2]'
                } beforeOXBlue w-[200px] h-[120px] mr-[20px] rounded-md shadow-md flex flex-row justify-center items-center`}
                onClick={() => handleSubmitAnswer('o')}
              >
                <span className='text-[24px] font-PtdMedium'>O</span>
              </button>
              <button
                className={`${
                  submitAnswer === 'x' ? 'clickedOXRed' : 'bg-[#F2F2F2]'
                } beforeOXRed w-[200px] h-[120px] ml-[20px]  rounded-md shadow-md flex flex-row justify-center items-center`}
                onClick={() => handleSubmitAnswer('x')}
              >
                <span className='text-[24px] font-PtdMedium'>X</span>
              </button>
            </div>
          )}
        </div>
      </>
    );
  };
  
  const contentMulti = (): JSX.Element => {
    const firstA = multiList[0].answer ? multiList[0].answer : '';
    const secondA = multiList[1].answer ? multiList[1].answer : '';
    const thirdA = multiList[2].answer ? multiList[2].answer : '';
    const fourthA = multiList[3].answer ? multiList[3].answer : '';

    const firstASize = 200 / firstA.length;
    const secondASize = 200 / secondA.length;
    const thirdASize = 200 / thirdA.length;
    const fourthASize = 200 / fourthA.length;

    type prevInputType = {
      multiAnswerText: string;
      multiAnswerTextSize: number;
    };

    const prevInputList: prevInputType[] = [
      {
        multiAnswerText: multiList[0].answer ? multiList[0].answer : '',
        multiAnswerTextSize: firstASize,
      },
      {
        multiAnswerText: multiList[1].answer ? multiList[1].answer : '',
        multiAnswerTextSize: secondASize,
      },
      {
        multiAnswerText: multiList[2].answer ? multiList[2].answer : '',
        multiAnswerTextSize: thirdASize,
      },
      {
        multiAnswerText: multiList[3].answer ? multiList[3].answer : '',
        multiAnswerTextSize: fourthASize,
      },
    ];

    const multiPrevContent = ({
      prevInput,
      key,
    }: {
      prevInput: prevInputType;
      key: number;
    }): JSX.Element => {
      return (
        <div key={key}>
          <button
            className={`${
              submitAnswer === prevInput.multiAnswerText ? 'clickedmulti' : ''
            } beforemulti w-[200px] h-[80px] mx-[10px] rounded-md shadow-md bg-[#F2F2F2] flex flex-row justify-center items-center`}
            onClick={() => handleSubmitMultiAnswer(key + 1)}
          >
            <span
              className='w-full h-full flex flex-row justify-center items-center'
              style={{
                fontSize: `${
                  prevInput.multiAnswerTextSize > 30
                    ? 30
                    : prevInput.multiAnswerTextSize < 20
                    ? 20
                    : prevInput.multiAnswerTextSize
                }px`,
              }}
            >
              {prevInput.multiAnswerText}
            </span>
          </button>
        </div>
      );
    };

    return (
      <>
        <div
          className={`w-full h-full flex flex-col justify-center items-center p-[30px] text-black transition-all duration-3000 ease-in`}
        >
          {hintState ? (
            <>
              <div className='w-[200px] h-[50px] flex flex-row justify-center items-center mb-[10px]'>
                <AiOutlineExclamationCircle size={35} color={'#96B9BB'} />
                <span className='ml-[15px] text-[25px] text-[#ACACAC]'>
                  힌트
                </span>
              </div>
              <div className='w-full h-[150px] px-[50px] text-center'>
                <span className='text-gray-700 font-PtdSemiBOld text-[25px] leading-[32px]'>
                  {input.hint}
                </span>
              </div>
            </>
          ) : (
            <div className='outline-black w-full h-full flex flex-row justify-between items-center flex-wrap px-[30px]'>
              {prevInputList.map((item, key) =>
                multiPrevContent({ prevInput: item, key: key })
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  const contentBlank = (): JSX.Element => {
    return (
      <div className='relative w-full h-full flex flex-col justify-start items-center'>
        <div className='w-full h-[70px]  outline-black flex flex-row justify-center items-center'>
          {hintState && (
            <div className='w-[200px] h-[50px] flex flex-row justify-center items-center'>
              <AiOutlineExclamationCircle size={35} color={'#96B9BB'} />
              <span className='ml-[15px] text-[25px] text-[#ACACAC]'>힌트</span>
            </div>
          )}
        </div>
        <div className='w-[500px] h-[150px]  outline-green-300 flex flex-row justify-between items-center'>
          {blankBoxComponent()}
        </div>
      </div>
    );
  };

  const quizContent = (): JSX.Element => {
    if (input.quizType === 'ox') return contentOX();
    else if (input.quizType === 'multi') return contentMulti();
    else return contentBlank();
  };

  const quizHintContent = (): JSX.Element => {
    return (
      <div className='flex flex-row justify-center items-center'>
        {input.hintType ? (
          <>
            <label className='uiverse-switch'>
              <input type='checkbox' onClick={handleHint} />
              <span className='uiverse-slider '></span>
            </label>
            <span className='ml-[10px] text-[#ACACAC] font-PtdLight'>
              힌트 보기
            </span>
          </>
        ) : (
          <>
            <span className='ml-[10px] text-[#ACACAC] font-PtdLight'>
              힌트가 없는 문제입니다.
            </span>
          </>
        )}
      </div>
    );
  };

  const scrapThisQuiz = () => {
    setScrapped(!scrapped);

  };

  const quizScrap = (): JSX.Element => {
    return (
      <div className='flex flex-row justify-center items-center'>
        <button onClick={scrapThisQuiz}>
          {scrapped ? (
            <BsBookmarkFill size={18} color={'#ACACAC'} />
          ) : (
            <BsBookmark size={18} color={'#ACACAC'} />
          )}
        </button>
        <span className='ml-[10px] text-[#ACACAC]'>스크랩</span>
      </div>
    );
  };

  const quizInfoContent = (): JSX.Element => {
    // const level = input.level === 1 ? '상' : input.level === 2 ? '중' : '하';
    const category =
      input.category === 'aff'
        ? '시사'
        : input.category === 'cul'
        ? '문화/역사'
        : '기타';
    return (
      <div className='w-fit h-full flex flex-row justify-end items-center text-[#ACACAC] font-PtdLight'>
        <span className='w-fit h-[40%] px-[10px] flex flex-row justify-center items-center border-0 border-r-[2px] border-[#ACACAC] border-solid'>
          {input.nation.nationName}
        </span>
        <span className='w-fit h-[40%] px-[10px] flex flex-row justify-center items-center border-0 border-r-[2px] border-[#ACACAC] border-solid'>
          LV. {input.level}
        </span>
        <span className='w-fit h-[40%] px-[10px] flex flex-row justify-center items-center'>
          {category}
        </span>
      </div>
    );
  };

  const submitAndFlip = () => {
    if (submitCheck) {
      setFlipped(true);
      setCorrectState(submitAnswer === input.answer);
    } else {
      setSubmitCheck(true);
    }
  };

  const submitButton = (): JSX.Element => {
    return (
      <button
        className={`w-[500px] h-[60px] rounded-md font-PtdLight text-[25px] ${
          submitAnswer
            ? submitCheck
              ? 'bg-[#61C7BB] text-white'
              : 'bg-white text-black'
            : 'bg-[#D4D4D4] text-[#9F9F9F]'
        }`}
        disabled={!submitAnswer}
        onClick={submitAndFlip}
      >
        {submitCheck ? '제출하기' : '선택 완료'}
      </button>
    );
  };

  /** 확인 누르면 모달 닫기 */
  const closeButton = (): JSX.Element => {
    return (
      <button
        className='w-[500px] h-[60px] rounded-md font-PtdLight text-[25px] bg-white text-black'
        onClick={() => {
          // alert("다른 문제 풀러 이동합니다.")
          Swal.fire("다른 문제 풀러 이동합니다.")
            .then(function(){
              postDatasList(correctState)
            });
          // postDatasList(correctState)
        }
      }>
        확인
      </button>
    );
  };

  const explanationContent = (): JSX.Element => {
    return (
      <div
        className='w-full h-full outline-black
        px-[60px] py-[30px] flex flex-col justify-start items-center
      '
      >
        <span className='w-full h-[35px] font-PtdBold text-[30px] mb-[15px] text-[#6a6a6a] text-start'>
          해설
        </span>
        <div className='w-full h-fit flex flex-col justify-start items-center text-center overflow-y-scroll on-scrollbar-quizmodal'>
          <span className='text-[20px] leading-[26px] font-PtdRegular text-start text-[#767676]'>
            {input.commentary}
          </span>
        </div>
      </div>
    );
  };

  const frontContainer = (): JSX.Element => {
    return (
      <div
        className={`frontcontainer transition-all duration-[500ms] ease-in-out ${
          flipped ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='h-[70px] w-full flex flex-col-reverse justify-start items-center rounded-t-xl bg-[#61C7BB]  outline-red-500'>
          <div className='w-full h-[55px] bg-[#F5F5F5] rounded-t-xl outline-red-300 flex flex-col jutsify-stretch items-center'>
            <div className='w-full h-[20px] outline-yellow-500 flex flex-row justify-center items-end'>
              <img
                src={QuizBlueText}
                alt='QuizblueText'
                className='w-fit h-[60px]'
              />
            </div>
            <div className='w-full h-fit flex flex-row justify-between items-center px-[30px]'>
              <div className=' w-fit w-min-[5px] h-full outline-balck flex flex-row justify-start items-center pt-[5px] pl-[5px]'>
                {input.image === '' && (
                  <div className={`relative  `}>
                    {/* {hintImageState && ( */}
                    <div
                      className={`absolute -z-10 top-0 flex flex-row justify-start outline-white w-[400px] h-fit bg-[#F5F5F5] rounded-xl overflow-hidden transition-all duration-500 ease-in-out  ${
                        hintImageState ? 'left-[-450px]' : 'left-[0px]'
                      }`}
                    >
                      <img
                        src={tempImage1}
                        alt='힌트 이미지'
                        className='w-[90%] h-fit max-h-[500px] '
                      />
                      <div className='m-[10px]'>
                        <IoIosPhotos color={'lightgray'} size={20} />
                      </div>
                    </div>
                    {/* )} */}
                    <span
                      className='text-[#BFBFBF] mx-[10px] font-PtdLight mt-[3px] hover:text-[#61C7BB] cursor-default'
                      onMouseEnter={() => setHintImageState(true)}
                      onMouseLeave={() => setHintImageState(false)}
                    >
                      이미지 보기
                    </span>
                  </div>
                )}
              </div>
              <div className='w-fit h-fit  outline-yellow-500 grid place-content-center text-gray-800 hover:cursor-pointer'>
                <AiOutlineClose
                  size={25}
                  color='#BFBFBF'
                  onClick={() => {
                    // alert("다른 문제 풀러 이동합니다.")
                    Swal.fire("다른 문제 풀러 이동합니다.")
                      .then(function(){
                        GetRegameFlag(-2)
                      });
                    // GetRegameFlag(-2)
                  }}
                  className='cursor-pointer'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[200px] bg-[#F5F5F5]  outline-red-500 flex flex-row justify-center items-center pt-[10px] pb-[20px] px-[50px] overflow-y-scroll on-scrollbar-quizmodal'>
          <span
            className='font-PtdRegular text-center text-gray-700'
            style={{
              fontSize: `${
                textSize > 30 ? 30 : textSize < 20 ? 20 : textSize
              }px`,
              lineHeight: `${textSize > 30 ? 39 : textSize + 9}px`,
            }}
          >
            Q. {input.content}
          </span>
        </div>
        <div className='w-full h-[10px] bg-[#E0E0E0]'></div>
        <div className='relative bg-[#E0E0E0] w-full h-[300px]  outline-blue-500'>
          {quizContent()}
        </div>
        <div className='w-full h-fit bg-[#E0E0E0]  outline-red-300 flex flex-col justify-stretch items-center rounded-b-xl overflow-hidden'>
          <div className='w-full h-[40px]  outline-black flex flex-row justify-between items-center px-[50px]'>
            {quizHintContent()}
            {quizInfoContent()}
          </div>
          <div className='w-full h-fit bg-[#E0E0E0] flex flex-row justify-center items-center pt-[30px] pb-[50px]'>
            {submitButton()}
          </div>
        </div>
      </div>
    );
  };

  const backContainer = (): JSX.Element => {
    return (
      <div
        className={`backcontainer transition-all duration-[1000ms] ease-in-out ${
          !showBack ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='h-[70px] w-full flex flex-col-reverse justify-start items-center rounded-t-xl bg-[#61C7BB]  outline-red-500'>
          <div className='w-full h-[55px] bg-[#eaeaea] rounded-t-xl  outline-red-300 flex flex-col jutsify-stretch items-center'>
            <div className='w-full h-[20px] outline-yellow-500 flex flex-row justify-center items-end'>
              <img
                src={ResultBlueText}
                alt='ResultBlueText'
                className='w-fit h-[52px]'
              />
            </div>
            <div className='w-full h-fit flex flex-row justify-end items-center'>
              <div className='w-[50px] h-fit  outline-yellow-500 grid place-content-center text-gray-800'>
                <AiOutlineClose
                  size={30}
                  color='gray'
                  onClick={() => {
                    // alert("다른 문제 풀러 이동합니다.")
                    Swal.fire("다른 문제 풀러 이동합니다.")
                      .then(function(){
                        GetRegameFlag(-2)
                      });
                    // GetRegameFlag(-2)
                  }}
                  className='cursor-pointer'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[200px] bg-[#eaeaea]  outline-red-500 flex flex-col justify-start items-start pt-[5px] px-[50px]'>
          <div className='w-full flex flex-row justify-between'>
            <span
              className={`w-full flex flex-row justify-start items-center text-[18px] font-PtdBold mb-[10px] ${
                correctState ? 'text-[#009B3E]' : 'text-[#E81C1C]'
              }`}
            >
              {correctState === true
                ? '정답입니다'
                : correctState === false
                ? '오답입니다'
                : 'null결과'}
            </span>
            <span 
              className='w-full flex flex-row justify-end items-center text-[18px] font-PtdBold mb-[10px] opacity-40' >
              {correctState === true
                ? 'exp +20'
                : correctState === false
                ? 'exp + 0'
                : 'null결과'}
            </span>
          </div>
          <div className='w-full h-[70px] flex flex-row justify-start items-center outline-yellow-500 overflow-y-scroll on-scrollbar-quizmodal'>
            <span
              className='font-PtdSemiBOld text-center py-[15px] h-fit max-h-full'
              style={{
                fontSize: `${
                  textSize > 18 ? 18 : textSize < 12 ? 12 : textSize
                }px`,
                lineHeight: `${textSize > 20 ? 25 : textSize + 5}px`,
              }}
            >
              Q. {input.content}
            </span>
          </div>
          <div
            className={` w-full h-[50px] mt-[10px] rounded-[10px] overflow-hidden ${
              correctState === true
                ? 'bg-[#26aaa5]'
                : correctState === false
                ? 'bg-[#4f4f4f]'
                : ''
            }`}
          >
            <div
              className={`${
                correctState === true
                  ? 'correctanswer text-[#80ffe6]'
                  : correctState === false
                  ? 'incorrectanswer'
                  : ''
              } w-full h-full grid place-content-center font-PtdBold text-[20px] `}
            >
              A. {input.answer}
            </div>
          </div>
          <div className='w-full flex-1 outline-black flex flex-row justify-start items-center font-PtdRegular text-[#ACACAC]'>
            <span>'{userNickName}'님이 입력한 답은 "{submitAnswer}"</span>
          </div>
        </div>
        <div className='relative bg-[#F5F5F5] w-full h-[300px]  outline-blue-500'>
          {explanationContent()}
        </div>
        <div className='w-full h-fit bg-[#F5F5F5]  outline-red-300 flex flex-col justify-stretch items-center rounded-b-xl overflow-hidden'>
          <div className='w-full h-[40px]  outline-black flex flex-row justify-between items-center px-[50px]'>
            {quizScrap()}
            {quizInfoContent()}
          </div>
          <div className='w-full h-fit bg-[#F5F5F5] flex flex-row justify-center items-center pt-[30px] pb-[50px]'>
            {closeButton()}
          </div>
        </div>
      </div>
    );
  };


  useEffect(() => {
    if (input.quizType === 'blank') {
      blankBoxComponent();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowBack(true);
      console.log('보기');
    }, 1700);
  }, [flipped]);


  return (
    <div
      className={` z-50 absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 outline-white
      flex flex-col justify-start items-center
      ${!flipped ? 'cardcontainer' : 'cardcontainer-flipped'}
     `}
      style={{ width: `${size * 3}px`, height: 'fit' }}
    >
      <div className='cardcontainer-inner w-full h-full'>
        {frontContainer()}
        {backContainer()}
      </div>
    </div>  
  )
}

export default CountryQuizDetailModal;
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import QuizBlueText from '../assets/images/QuizBlueText.png';
import ResultBlueText from '../assets/images/ResultBlueText.png';
import { JsxElement } from 'typescript';
import '../styles/QuizModalStyles.css';

import { BsBookmark, BsBookmarkFill, BsBoxArrowUpRight } from 'react-icons/bs';

import tempImage1 from '../assets/images/thumb2.png';

import { IoIosPhotos } from 'react-icons/io';

type ScrappedQuizType = {
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

export default function GameQuizModal({
  input,
  closeModal,
}: {
  input: ScrappedQuizType;
  closeModal: () => void;
}) {
  const userName: string | null = sessionStorage.getItem('nickname');

  const size: number = 200;

  const textSize: number = 200 / (input.content.length / 20);
  //몇줄?

  const [submitAnswer, setSubmitAnswer] = useState<string>('');

  const blankBoxSize: number =
    400 / input.answer.length > 200 ? 200 : 400 / input.answer.length;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleComposition = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    //console.log('composition');
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
    //console.log('input');
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

  const [blankInputAnswer, setBlankInputAnswer] = useState<string[]>(
    new Array(input.answer.length).fill('')
  );

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
    //console.log('tempStringList', tempStringList);
    if (tempStringList.length === input.answer.length) {
      var tempString = '';
      for (let i = 0; i < tempStringList.length; i++) {
        tempString += tempStringList[i];
      }
      setSubmitAnswer(tempString);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitAndFlip();
    }
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
          onKeyDown={(e) => {
            i === input.answer.length - 1 && handleEnter(e);
          }}
        />
      );
    }
    return tempCompList;
  };

  useEffect(() => {
    if (input.quizType === 'blank') {
      blankBoxComponent();
    }
  }, []);

  const handleSubmitAnswer = (input: string) => {
    if (submitAnswer === input) setSubmitAnswer('');
    else setSubmitAnswer(input);
  };

  const handleSubmitMultiAnswer = (input: string) => {
    if (submitAnswer === input) setSubmitAnswer('');
    else setSubmitAnswer(input);
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
                  submitAnswer === 'o' ? 'gameclickedOXBlue' : 'bg-[#F2F2F2]'
                } beforeOXBlue w-[200px] h-[120px] mr-[20px] rounded-md shadow-md flex flex-row justify-center items-center`}
                onClick={() => handleSubmitAnswer('o')}
              >
                <span className='text-[24px] font-PtdMedium'>O</span>
              </button>
              <button
                className={`${
                  submitAnswer === 'x' ? 'gameclickedOXRed' : 'bg-[#F2F2F2]'
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
    const firstA = input.multiFirst ? input.multiFirst : '';
    const secondA = input.multiSecond ? input.multiSecond : '';
    const thirdA = input.multiThird ? input.multiThird : '';
    const fourthA = input.multiFourth ? input.multiFourth : '';

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
        multiAnswerText: input.multiFirst ? input.multiFirst : '',
        multiAnswerTextSize: firstASize,
      },
      {
        multiAnswerText: input.multiSecond ? input.multiSecond : '',
        multiAnswerTextSize: secondASize,
      },
      {
        multiAnswerText: input.multiThird ? input.multiThird : '',
        multiAnswerTextSize: thirdASize,
      },
      {
        multiAnswerText: input.multiFourth ? input.multiFourth : '',
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
              submitAnswer === prevInput.multiAnswerText
                ? 'gameclickedmulti'
                : 'bg-[#F2F2F2]'
            } beforemulti w-[200px] h-[80px] mx-[10px] rounded-md shadow-md  flex flex-row justify-center items-center`}
            onClick={() => handleSubmitMultiAnswer((key + 1).toString())}
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
        {/* <div className='w-[500px] h-[150px]  outline-green-300 flex flex-row justify-between items-center'> */}
        <div
          className={`w-[500px] h-[150px]  outline-green-300 flex flex-row ${
            input.answer.length === 1 ? 'justify-center' : 'justify-between'
          } items-center`}
        >
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

  const [hintState, setHintState] = useState<boolean>(false);
  const handleHint = () => {
    setHintState(!hintState);
    //console.log('잉');
    //console.log('input.hint', input.hint);
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

  const [scrapped, setScrapped] = useState<boolean>(true);

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
          {input.nationName}
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

  const [flipped, setFlipped] = useState<boolean>(false);
  const [correctState, setCorrectState] = useState<boolean | null>(null);
  const submitAndFlip = () => {
    if (submitCheck) {
      setFlipped(true);
      setCorrectState(submitAnswer === input.answer);
    } else {
      setSubmitCheck(true);
    }
  };

  const [beforeSubmitAnswer, setBeforeSubmitAnswer] = useState<string>('');

  useEffect(() => {
    if (submitAnswer === '' || submitAnswer !== beforeSubmitAnswer)
      setSubmitCheck(true);
    setBeforeSubmitAnswer(submitAnswer);
  }, [submitAnswer]);

  const submitButton = (): JSX.Element => {
    return (
      <button
        className={`w-[500px] h-[60px] rounded-md font-PtdLight text-[25px] ${
          submitAnswer
            ? 'bg-[#61C7BB] text-white'
            : 'bg-[#D4D4D4] text-[#9F9F9F]'
        }`}
        disabled={!submitAnswer}
        onClick={submitAndFlip}
      >
        {submitCheck ? '제출하기' : '선택 완료'}
      </button>
    );
  };
  const closeButton = (): JSX.Element => {
    return (
      <button
        className='w-[500px] h-[60px] rounded-md font-PtdLight text-[25px] bg-[#61C7BB] text-white'
        onClick={closeModal}
      >
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

  const [hintImageState, setHintImageState] = useState<boolean>(false);

  const [submitCheck, setSubmitCheck] = useState<boolean>(false);

  const [showBack, setShowBack] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBack(true);
      //console.log('보기');
    }, 1500);
  }, [flipped]);

  const limitTime = 16;
  const [timecount, setTimecount] = useState<number>(0);
  const [timerOut, setTimerOut] = useState<boolean>(false);
  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTimecount((prevTime) => {
        const newTime = prevTime + 0.01;
        if (newTime > limitTime) {
          clearInterval(intervalId);
          setTimerOut(true);
        }
        return newTime;
      });
    }, 10);

    // Cleanup function to clear the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timerOut) {
      //console.log('setFlipped')
      setFlipped(true);
    }
  }, [timerOut]);

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
        <div className='w-full h-[10px] bg-[#61C7BB] relative flex flex-row justify-end items-center'>
          <div
            className='absolute top-0 left-0 h-[10px] max-w-full bg-[#E0E0E0]'
            style={{ width: `${(timecount * 100) / limitTime}%` }}
          ></div>
        </div>
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
        className={`backcontainer transition-all duration-[2000ms] ease-in-out ${
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
          </div>
        </div>
        <div className='w-full h-[200px] bg-[#eaeaea]  outline-red-500 flex flex-col justify-start items-start pt-[5px] px-[50px]'>
          <span
            className={`w-full flex flex-row justify-start items-center text-[18px] font-PtdBold mb-[10px] ${
              correctState ? 'text-[#009B3E]' : 'text-[#E81C1C]'
            }`}
          >
            {correctState === true
              ? '정답입니다.'
              : correctState === false
              ? '오답입니다.'
              : '시간 초과입니다.'}
          </span>
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
            className={` w-full h-[50px] mt-[10px] rounded-[10px] overflow-hidden                                            ${
              correctState === true ? '' : correctState === false ? '' : ''
            }`}
          >
            <div
              className={`${
                correctState === true
                  ? 'gamecorrectanswer'
                  : correctState === false
                  ? 'gameincorrectanswer '
                  : ''
              } w-full h-full grid place-content-center font-PtdBold text-[20px] `}
            >
              A. {input.answer}
            </div>
          </div>
          <div className='w-full flex-1 outline-black flex flex-row justify-start items-center font-PtdRegular text-[#ACACAC]'>
            <span>
              "{userName}"님이 입력한 답은 "{submitAnswer}"
            </span>
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
  );
}

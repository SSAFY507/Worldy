import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineBulb, AiOutlineCloseCircle } from 'react-icons/ai';
import QuizBlueText from '../assets/images/QuizBlueText.png';
import { JsxElement } from 'typescript';

import '../styles/QuizModalStyles.css';
import { TbCategory2, TbWorld } from 'react-icons/tb';

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
  hint: boolean; //힌트
  commentary: string; //힌트 유형
  userAnswer: string | null; //유저가 적은 정답(맞았으면 null)
  success: boolean; //맞춘 문제인가
};

export default function QuizModal({
  input,
  closeModal,
}: {
  input: ScrappedQuizType;
  closeModal: () => void;
}) {
  const size: number = 200;

  const textSize: number = 300 / (input.content.length / 20);
  //몇줄?

  const [submitAnswer, setSubmitAnswer] = useState<string>('');

  const multiFirstTextSize: number = input.multiFirst
    ? 250 / input.multiFirst.length
    : 0;
  const multiSecondTextSize: number = input.multiSecond
    ? 250 / input.multiSecond.length
    : 0;
  const multiThirdTextSize: number = input.multiThird
    ? 250 / input.multiThird.length
    : 0;
  const multiFourthTextSize: number = input.multiFourth
    ? 250 / input.multiFourth.length
    : 0;

  const blankBoxSize: number = 400 / input.answer.length;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
    console.log('tempStringList', tempStringList);
    if (tempStringList.length === input.answer.length) {
      var tempString = '';
      for (let i = 0; i < tempStringList.length; i++) {
        tempString += tempStringList[i];
      }
      setSubmitAnswer(tempString);
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
          className={`rounded-xl bg-slate-500 text-white text-center`}
          maxLength={1}
          ref={(element) => (inputRefs.current[i] = element)}
          onInput={handleInput}
          onCompositionEnd={handleComposition}
          value={blankInputAnswer[i]}
          onChange={(e) => handleBlankAnswer({ e, i })}
          placeholder={hintState ? `${input.commentary.charAt(i)}` : ''}
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

  const contentOX = (): JSX.Element => {
    return (
      <>
        {hintState && (
          <div className='absolute top-0 left-0 z-50 w-full h-full bg-[rgba(180,180,180,0.8)] p-[20px]'>
            <span className='text-gray-700 font-PtdMedium text-[25px] overflow-y-scroll leading-[30px]'>
              {input.commentary}
            </span>
          </div>
        )}
        <div
          className={`w-full h-full flex flex-row justify-between items-center p-[30px] ${
            hintState ? 'blur-sm' : ''
          }`}
        >
          <button className='outline outline-black w-[220px] h-2/3 hover:text-white hover:bg-[#6ad0ff] text-gray-100 bg-gray-400 rounded-3xl flex flex-row justify-center items-center'>
            <span className='text-[100px] font-PtdBold'>O</span>
          </button>
          <button className='outline outline-black w-[220px] h-2/3 hover:text-white hover:bg-[#ff6a6a] text-gray-100 bg-gray-400 rounded-3xl flex flex-row justify-center items-center'>
            <span className='text-[100px] font-PtdBold'>X</span>
          </button>
        </div>
      </>
    );
  };
  const contentMulti = (): JSX.Element => {
    return (
      <>
        {hintState && (
          <div className='absolute top-0 left-0 z-50 w-full h-full bg-[rgba(180,180,180,0.8)] p-[20px]'>
            <span className='text-gray-700 font-PtdMedium text-[25px] overflow-y-scroll leading-[30px]'>
              {input.commentary}
            </span>
          </div>
        )}
        <div
          className={`multi-prevs w-full h-full px-[25px] py-[20px] flex-wrap flex flex-row justify-between items-center ${
            hintState ? 'blur-[3px]' : ''
          }`}
        >
          <button
            className='w-[250px] h-2/5 outline outline-gray-300 flex flex-row justify-center items-center p-[10px]
          text-gray-100 bg-gray-400
        hover:bg-[rgba(200,200,200,1)] 
        '
          >
            <span
              className='w-full h-full flex flex-row justify-center items-center'
              style={{
                fontSize: `${
                  multiFirstTextSize > 30
                    ? 30
                    : multiFirstTextSize < 20
                    ? 20
                    : multiFirstTextSize
                }px`,
              }}
            >
              {input.multiFirst}
            </span>
          </button>
          <button
            className='w-[250px] h-2/5 outline outline-gray-300 flex flex-row justify-center items-center p-[10px]
          text-gray-100 bg-gray-400
        hover:bg-[rgba(200,200,200,1)] 
        '
          >
            <span
              className='w-full h-full flex flex-row justify-center items-center'
              style={{
                fontSize: `${
                  multiSecondTextSize > 30
                    ? 30
                    : multiSecondTextSize < 20
                    ? 20
                    : multiSecondTextSize
                }px`,
              }}
            >
              {input.multiSecond}
            </span>
          </button>
          <button
            className='w-[250px] h-2/5 outline outline-gray-300 flex flex-row justify-center items-center p-[10px]
          text-gray-100 bg-gray-400
        hover:bg-[rgba(200,200,200,1)] 
        '
          >
            <span
              className='w-full h-full flex flex-row justify-center items-center'
              style={{
                fontSize: `${
                  multiThirdTextSize > 30
                    ? 30
                    : multiThirdTextSize < 20
                    ? 20
                    : multiThirdTextSize
                }px`,
              }}
            >
              {input.multiThird}
            </span>
          </button>
          <button
            className='w-[250px] h-2/5 outline outline-gray-300 flex flex-row justify-center items-center p-[10px]
          text-gray-100 bg-gray-400
        hover:bg-[rgba(200,200,200,1)] 
        '
          >
            <span
              className='w-full h-full flex flex-row justify-center items-center'
              style={{
                fontSize: `${
                  multiFourthTextSize > 30
                    ? 30
                    : multiFourthTextSize < 20
                    ? 20
                    : multiFourthTextSize
                }px`,
              }}
            >
              {input.multiFourth}
            </span>
          </button>
        </div>
      </>
    );
  };
  const contentBlank = (): JSX.Element => {
    return (
      <div className='relative w-full h-full flex flex-col justify-center items-center'>
        <div className='w-[500px] h-[150px] outline outline-green-300 flex flex-row justify-between items-center'>
          {blankBoxComponent()}
        </div>
      </div>
    );
  };

  const quizContent = (): JSX.Element => {
    if (input.quizType === 'OX') return contentOX();
    else if (input.quizType === 'multi') return contentMulti();
    else return contentBlank();
  };

  const [hintState, setHintState] = useState<boolean>(false);
  const handleHint = () => {
    setHintState(!hintState);
    console.log('잉');
    console.log('input.commentary', input.commentary);
  };

  const quizHintContent = (): JSX.Element => {
    return (
      <button
        className={`w-[100px] h-4/5 bg-slate-500 rounded-xl text-white ${
          input.hint ? 'hover:bg-slate-400' : ''
        }`}
        onClick={handleHint}
      >
        {input.hint ? 'Hint' : 'Hint 없음'}
      </button>
    );
  };
  const quizInfoContent = (): JSX.Element => {
    const level = input.level === 1 ? '상' : input.level === 2 ? '중' : '하';
    const category =
      input.category === 'aff'
        ? '시사'
        : input.category === 'cul'
        ? '문화/역사'
        : '기타';
    return (
      <div className='w-fit h-full flex flex-row justify-end items-center bg-yellow-200 font-PtdMedium'>
        <span className='w-fit h-[60%] px-[10px] flex flex-row justify-center items-center border-0 border-r-[2px] border-r-gray-400 border-dashed'>
          <TbWorld size={20} className='mr-[10px] ' /> {input.nationName}
        </span>
        <span className='w-fit h-[60%] px-[10px] flex flex-row justify-center items-center border-0 border-r-[2px] border-r-gray-400 border-dashed'>
          <AiOutlineBulb size={20} className='mr-[10px]' /> LV.{level}
        </span>
        <span className='w-fit h-[60%] px-[10px] flex flex-row justify-center items-center'>
          <TbCategory2 size={20} className='mr-[10px]' /> {category}
        </span>
      </div>
    );
  };

  const submitButton = (): JSX.Element => {
    return (
      <button className='w-[300px] h-[60px] outline outline-white rounded-xl font-PtdMedium bg-[rgba(200,200,200,1)] text-[30px]'>
        제출하기
      </button>
    );
  };

  return (
    <div
      className={`mt-[30px] z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-white
      flex flex-col justify-between items-center
     `}
      style={{ width: `${size * 3}px`, height: `${size * 4}px` }}
    >
      <div className='z-10 w-full h-[50px] bg-none flex flex-col justify-start items-center overflow-visible'>
        <div className='w-[280px] h-fit'>
          <img src={QuizBlueText} alt='QUIZ Blue' />
        </div>
      </div>
      <div className='w-full h-[50px] bg-[rgba(200,200,200,1)] rounded-t-2xl outline-red-300 flex flex-row jutsify-stretch items-center'>
        <div className='w-[50px] h-full   outline-yellow-500'></div>
        <div className='flex-1 h-full'></div>
        <div className='w-[50px] h-full  outline-yellow-500 grid place-content-center text-gray-800'>
          <AiOutlineCloseCircle
            size={40}
            onClick={() => closeModal()}
            className='cursor-pointer'
          />
        </div>
      </div>
      <div className='w-full flex-1 bg-white outline outline-red-300 flex flex-col justify-stretch items-center'>
        <div className='w-full h-[300px] outline outline-red-500 my-[10px] py-[15px] px-[30px] overflow-y-scroll on-scrollbar-quizmodal'>
          <span
            className='font-PtdMedium'
            style={{
              fontSize: `${
                textSize > 30 ? 30 : textSize < 20 ? 20 : textSize
              }px`,
              lineHeight: `${textSize > 30 ? 39 : textSize + 9}px`,
            }}
          >
            {input.content}
          </span>
        </div>
        <div className='relative w-full flex-1 outline outline-blue-500'>
          {quizContent()}
        </div>
      </div>
      <div className='w-full h-[150px] bg-white outline outline-red-300 flex flex-col justify-stretch items-center'>
        <div className='w-full h-[40px] outline outline-black flex flex-row justify-between items-center px-[20px]'>
          {quizHintContent()}
          {quizInfoContent()}
        </div>
        <div className='w-full flex-1 bg-red-300 flex flex-row justify-center items-center'>
          {submitButton()}
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import QuizBlueText from '../assets/images/QuizBlueText.png';
import { JsxElement } from 'typescript';

import '../styles/QuizModalStyles.css';

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

  const shortBoxSize: number = 400 / input.answer.length;
  const [shortBoxCompList, setShortBoxCompList] = useState<JSX.Element[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [shortInputAnswer, setShortInputAnswer] = useState<string[]>([]);

  const handleComposition = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    console.log('composition');
    if (event.type === 'compositionend') {
      const target = event.target as HTMLInputElement;
      const index = inputRefs.current.indexOf(target);
      if (
        index !== -1 &&
        index < shortBoxSize - 1 &&
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
      index < shortBoxSize - 1 &&
      target.value.length === 1 &&
      !target.value.match(/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/)
    ) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleShortAnswer = ({
    e,
    i,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    i: number;
  }) => {
    const tempStringList: string[] = [...shortInputAnswer];
    tempStringList[i] = e.target.value;
    setShortInputAnswer(tempStringList);
    console.log('tempStringList', tempStringList);
  };

  const shortBoxComponent = () => {
    const tempCompList: JSX.Element[] = [];
    for (let i = 0; i < input.answer.length; i++) {
      tempCompList.push(
        <input
          key={i}
          style={{
            width: `${shortBoxSize}px`,
            height: `${shortBoxSize}px`,
            fontSize: `${shortBoxSize * (2 / 3)}px`,
          }}
          className={`rounded-xl bg-slate-500 text-white text-center`}
          maxLength={1}
          ref={(element) => (inputRefs.current[i] = element)}
          onInput={handleInput}
          onCompositionEnd={handleComposition}
          value={shortInputAnswer[i]}
          onChange={(e) => handleShortAnswer({ e, i })}
        />
      );
    }
    setShortBoxCompList(tempCompList);
  };

  useEffect(() => {
    console.log('shortInputAnswer', shortInputAnswer);
  }, [shortInputAnswer]);

  useEffect(() => {
    if (input.quizType === 'short') {
      shortBoxComponent();
    }
  }, []);

  const contentOX = (): JSX.Element => {
    return (
      <div className='w-full h-full flex flex-row justify-between items-center p-[30px]'>
        <div className='outline outline-black w-[220px] h-2/3 hover:text-white hover:bg-[#6ad0ff] text-gray-300 bg-[#61b6dd] rounded-3xl flex flex-row justify-center items-center'>
          <span className='text-[100px] font-PtdBold'>O</span>
        </div>
        <div className='outline outline-black w-[220px] h-2/3 hover:text-white hover:bg-[#ff6a6a] text-gray-300 bg-[#dd7461] rounded-3xl flex flex-row justify-center items-center'>
          <span className='text-[100px] font-PtdBold'>X</span>
        </div>
      </div>
    );
  };
  const contentMulti = (): JSX.Element => {
    return (
      <div className='multi-prevs w-full h-full px-[25px] py-[20px] flex-wrap flex flex-row justify-between items-center'>
        <button
          className='w-[250px] h-2/5 outline outline-gray-300 flex flex-row justify-center items-center p-[10px]
        bg-[rgba(180,180,180,1)] text-white
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
        bg-[rgba(180,180,180,1)] text-white
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
        bg-[rgba(180,180,180,1)] text-white
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
        bg-[rgba(180,180,180,1)] text-white
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
    );
  };
  const contentShort = (): JSX.Element => {
    return (
      <div className='relative w-full h-full flex flex-col justify-center items-center'>
        <div className='w-[500px] h-[150px] outline outline-green-300 flex flex-row justify-between items-center'>
          {shortBoxCompList}
        </div>
      </div>
    );
  };

  const quizContent = (): JSX.Element => {
    if (input.quizType === 'OX') return contentOX();
    else if (input.quizType === 'multi') return contentMulti();
    else return contentShort();
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
          <AiOutlineCloseCircle size={40} onClick={() => closeModal()} />
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
        <div className='w-full flex-1 outline outline-blue-500'>
          {quizContent()}
        </div>
      </div>
      <div className='w-full h-[150px] bg-white outline outline-red-300'></div>
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

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

type quizModalInput = {
  data: ScrappedQuizType;
};

export default function QuizModal(input: quizModalInput) {
  const size: number = 200;

  const textSize: number = 450 / (input.data.content.length / 20);

  return (
    <div
      className={`mt-[30px] z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-white
      rounded-2xl 
      bg-gradient-to-br from-[#ffffff]  via-[#63fff2] to-[#00eaff99] p-[5px]
     `}
      style={{ width: `${size * 3}px`, height: `${size * 4}px` }}
    >
      <div className='w-full h-full bg-[rgba(0,0,0,0.6)] rounded-2xl flex flex-col justify-between items-center'>
        <div className='h-[40px] w-full outline-white flex flex-row justify-end items-center px-[5px] text-gray-300 hover:text-white'>
          <IoIosCloseCircleOutline size={35} />
        </div>
        <div className='w-full h-[70%] outline outline-white'>
          <div className='w-full h-[60%] outline outline-blue-400 p-[10px]'>
            <span
              className={`font-PtdMedium text-white`}
              style={{
                fontSize: `${textSize > 30 ? 30 : textSize}px`,
                lineHeight: `${textSize > 30 ? 34 : textSize + 4}px`,
              }}
            >
              {input.data.content}
            </span>
          </div>
        </div>
        <div className='flex-1 w-full outline outline-red-500'></div>
      </div>
    </div>
  );
}

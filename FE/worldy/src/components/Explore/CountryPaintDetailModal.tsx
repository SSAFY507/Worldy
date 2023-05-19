import React, { useEffect, useState } from 'react';

import CountryPaintAfter from './CountryPaintAfter';
import CountryPaintBefore from './CountryPaintBefore';
import { PaintDataType } from './CountryQuizFrame';
import QuizTextP from '../../assets/images/QuizPurple.png';
import ResultTextP from '../../assets/images/ResultPurple.png';

interface Props {
  selectAsset: string;
  axiosGetPaintData: PaintDataType | undefined;
  GetRegameFlag: (num: number) => void;
}

export interface AnswerType {
  img: string | undefined;
  title: string | undefined;
  subTitle: string | undefined;
  description: string | undefined;
}

export interface ProblemType {
  collectImg: string | undefined;
  quizImg: string | undefined;
  answerPointList: string[][] | undefined;
}

const CountryPaintDetailModal = ({
  selectAsset,
  axiosGetPaintData,
  GetRegameFlag,
}: Props) => {
  const [solvedFlag, setSolvedFlag] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(true);

  const problem: ProblemType = {
    collectImg: axiosGetPaintData?.originalUrl,
    quizImg: axiosGetPaintData?.diffUrl,
    answerPointList: axiosGetPaintData?.answerPointList,
  };

  const answer: AnswerType = {
    img: axiosGetPaintData?.originalUrl,
    title: axiosGetPaintData?.imgTitle,
    subTitle: axiosGetPaintData?.imgSubTitle,
    description: axiosGetPaintData?.imgContent,
  };

  const GetSolvedFlag = (flag: boolean, sol: boolean) => {
    setSolvedFlag(flag);
    setResult(sol);
    if (!flag) {
      GetRegameFlag(-2);
    }
  };

  return (
    <div className='z-[10] h-[500px] w-3/5 outline-black flex flex-col justify-start items-center'>
      <div className='z-[11] h-[40px] w-full rounded-t-xl bg-[#EACFFF] flex flex-col justify-end items-center pb-[10px]'>
        {solvedFlag ? (
          <img src={ResultTextP} alt='quizP' className='w-[250px]' />
        ) : (
          <img src={QuizTextP} alt='quizP' className='w-[200px]' />
        )}
      </div>
      {/* <div className='h-[5px] bg-gray-400 translate-y-[-900%]' /> */}
      <div className='z-[12] h-full w-full flex flex-col justify-center items-center  rounded-b-xl bg-white '>
        {solvedFlag ? (
          <CountryPaintAfter
            answer={answer}
            result={result}
            GetSolvedFlag={GetSolvedFlag}
          />
        ) : (
          <CountryPaintBefore problem={problem} GetSolvedFlag={GetSolvedFlag} />
        )}
      </div>
    </div>
  );
};

export default CountryPaintDetailModal;

import React, { useEffect, useState } from 'react'

import CountryPaintAfter from './CountryPaintAfter';
import CountryPaintBefore from './CountryPaintBefore';
import { PaintDataType } from './CountryQuizFrame';
import { ReactComponent as PaintTitleIcon } from "../../assets/images/painttitle.svg"

interface Props {
  selectAsset: string,
  axiosGetPaintData: PaintDataType | undefined,
  GetRegameFlag: (num:number) => void
};

export interface AnswerType {
  img: string | undefined,
  title: string | undefined,
  subTitle: string | undefined,
  description: string | undefined
};

export interface ProblemType {
  collectImg: string | undefined,
  quizImg: string | undefined,
  answerPointList: string[][]| undefined,

};

const CountryPaintDetailModal = ({selectAsset, axiosGetPaintData, GetRegameFlag}:Props) => {
  const [solvedFlag, setSolvedFlag] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(true);

  const problem:ProblemType = {
    collectImg: axiosGetPaintData?.originalUrl,
    quizImg: axiosGetPaintData?.diffUrl,
    answerPointList: axiosGetPaintData?.answerPointList,
  } 

  const answer:AnswerType = {
    img: axiosGetPaintData?.originalUrl,
    title: axiosGetPaintData?.imgTitle,
    subTitle: axiosGetPaintData?.imgSubTitle,
    description: axiosGetPaintData?.imgContent
  }

  const GetSolvedFlag = (flag:boolean, sol:boolean) => {
    setSolvedFlag(flag);
    setResult(sol);
    if (!flag) {
      GetRegameFlag(-2)
    }
  }

  return (
    <div className='z-50 h-1/2 w-3/5'>
      <div className='z-60 h-1/6 w-full rounded-xl bg-[#EACFFF]' />
      <div className='h-[5px] bg-gray-400 translate-y-[-900%]'/>
      <div className='z-70 h-full w-full flex flex-col justify-center items-center translate-y-[-10%] rounded-b-xl bg-white '>
        <PaintTitleIcon className='absolute translate-y-[-260%]'/>
        {(solvedFlag)
          ?
          <CountryPaintAfter answer={answer} result={result} GetSolvedFlag={GetSolvedFlag}/>
          :
          <CountryPaintBefore problem={problem} GetSolvedFlag={GetSolvedFlag}/>
        }
      </div>
    </div>
  )
}

export default CountryPaintDetailModal;
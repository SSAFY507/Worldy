import React, { useEffect, useState } from 'react'

import CountryPaintAfter from './CountryPaintAfter';
import CountryPaintBefore from './CountryPaintBefore';
import { ReactComponent as Info } from '../../assets/images/Info.svg';
import { ReactComponent as PaintTitleIcon } from "../../assets/images/painttitle.svg"
import { ScrappedQuizType } from '../../routes/MyPage';
import answerImg from '../../assets/images/eiffelTower.png'

export interface AnswerType {
  img: string,
  title: string,
  result: boolean,
  subTitle: string,
  description: string
};

export interface ProblemType {
  collectImg: string,
  quizImg: string
};

const CountryPaintDetailModal = ({input,closeModal}: {input: ScrappedQuizType; closeModal: () => void}) => {
  const [solvedFlag, setSolvedFlag] = useState<boolean>(false)

  const problem:ProblemType = {
    collectImg: answerImg,
    quizImg: answerImg
  } 

  const answer:AnswerType = {
    img: answerImg,
    title: "에펠탑",
    result: false,
    subTitle: "Eiffel Tower",
    description: "에펠탑(프랑스어: Tour Eiffel, [tuʁ ɛfɛl], 영어: Eiffel Tower)은 프랑스 파리의 상징적 건축물로, 1889년에 프랑스 혁명 100주년을 맞이하여 파리 만국 박람회를 개최하였는데 이 박람회를 상징할만한 기념물로 에펠 탑을 건축하였다.[1] 박람회가 열린 마르스 광장에 출입 관문에 위치해있다. 프랑스의 대표 건축물인 이 탑은 격자 구조로 이루어져 파리에서 가장 높은 건축물이며, 매년 수백만 명이 방문할 정도로 파리에서 빼놓을 수 없는 세계적으로 유명한 관광명소이다. 이 탑은 공모전을 통해 선정된 프랑스 공학자 귀스타브 에펠의 작품으로 이를 디자인한 그의 이름을 따서 명명했다."
  }
  return (
    <div className='z-50 h-1/2 w-3/5'>
      <div className='z-60 h-1/6 w-full rounded-xl bg-[#EACFFF]' />
      <div className='h-[5px] bg-gray-400 translate-y-[-900%]'/>
      <div className='z-70 h-full w-full flex flex-col justify-center items-center translate-y-[-10%] rounded-b-xl bg-white '>
        <PaintTitleIcon className='absolute translate-y-[-260%]'/>
        {(solvedFlag)
          ?
          <CountryPaintAfter answer={answer}/>
          :
          <CountryPaintBefore problem={problem} />
        }
      </div>
    </div>
  )
}

export default CountryPaintDetailModal;
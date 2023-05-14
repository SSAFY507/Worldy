import { AnswerType } from './CountryPaintDetailModal';
import { ReactComponent as Exp } from '../../assets/images/exp.svg';
import React from 'react'
import collectImg from '../../assets/images/eiffelTower.png'

interface Props {
  answer: AnswerType,
}

// 확인을 누르면 다른 문제를 받아와야 하는 지? 
//아니면 밖으로 내보내야 하는지 논의 필요

const CountryPaintAfter = ({answer}:Props) => {

  return (
    <div className=' h-[408px] w-full flex flex-col items-center justify-between'>
      <div className=' h-[48px] w-[780px] flex felx-row justify-between '>
        <div className='h-full w-1/3 flex flex-row justify-between item py-4'>
          <div className={`h-full text-center py-1 text-sm opacity-40 font-PtdRegular  ${(answer.result) ? "text-[#24901A]" : "text-[#9A0000]"}`}>{(answer.result) ? "틀린 그림 찾기에 성공했습니다." : "틀린 그림 찾기에 실패했습니다." }</div> 
        </div>
        <div className='h-full w-[100px] flex flex-row justify-end items-center'>
          <Exp className='h-full w-[10px] font-PtdRegular'/>
          <div className='h-full w-2/5 text-sm text-center text-gray-400 font-PtdRegular pl-2 pr-2.5 py-[13px]'>exp</div>
          <div className='h-full w-2/5 text-sm text-center text-gray-500 font-PtdRegular py-3.5'>{(answer.result) ? "+20" : "+0"}</div>
        </div>
      </div>
      <div className='h-[276px] w-[780px] flex flex-row justify-between rounded-2xl shadow-lg border-solid border-2 border-gray-200'>
        <div className='h-full w-1/2 rounded-l-2xl bg-cover bg-center' style={{ backgroundImage: `url(${answer.img})` }} />
        <div className='h-full w-1/2 flex flex-col justify-center items-center rounded-r-2xl bg-white'>
          <div className='h-1/3 w-full flex flex-col justify-center items-center'>
            <div className='h-2/5 w-full text-center text-3xl opacity-50 font-PtdExtraBold'>{answer.title}</div>
            <div className='h-1/5 w-full text-center text-xs opacity-50 font-PtdRegular'>{answer.subTitle}</div>
          </div>
          <div className='h-2/3 w-full px-10 pt-2 pb-5 text-xs inline-block'>{answer.description}</div>
        </div>
      </div>
      <div className=' h-12 w-[780px] text-sm text-center font-PtdLight opacity-40 py-3 rounded-xl shadow-lg border-solid border-2 border-gray-200 cursor-pointer'>
        확인
      </div>
    </div>

  )
}

export default CountryPaintAfter
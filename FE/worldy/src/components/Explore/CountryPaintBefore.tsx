import { ReactComponent as Info } from '../../assets/images/Info.svg';
import React from 'react'

function CountryPaintBefore() {
  return (
    <div className=' h-[372px] w-full flex flex-col justify-center items-center'>
      <div className='h-[276px] w-[780px] flex flex-row justify-between'>
        <div className='h-full w-[388px] rounded-2xl bg-gray-500'></div>
        <div className='h-full w-[388px] rounded-2xl bg-gray-500'></div>
      </div>
      <div className=' h-[48px] w-[780px] flex felx-row justify-between py-3'>
        <div className='h-full w-[100px] flex flex-row justify-between'>
          <div className='h-full w-1/4 bg-gray-200 text-center font-PtdMedium text-white py-1 rounded'>1</div>
          <div className='h-full w-1/4 bg-gray-200 text-center font-PtdMedium text-white py-1 rounded'>2</div>
          <div className='h-full w-1/4 bg-gray-200 text-center font-PtdMedium text-white py-1 rounded'>3</div>
        </div>
        <div  className='h-full w-1/3 flex flex-row justify-between'>
          <Info/>
          <div className='h-full text-center py-1 text-xs opacity-40 font-PtdMedium'> 주어진 시간 안에 3개의 틀린 그림을 찾아주세요.</div> 
        </div>
      </div>
      <div className=' h-12 w-[780px] text-sm text-center font-PtdLight opacity-40 py-3 rounded-xl shadow-lg border-solid border-2 border-gray-200'>포기하기</div>
    </div>

  )
}

export default CountryPaintBefore
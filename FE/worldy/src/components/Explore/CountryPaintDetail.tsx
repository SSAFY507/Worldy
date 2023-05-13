import React, { useEffect, useState } from 'react'

import { ReactComponent as One } from "../../assets/images/p1.svg"
import { ReactComponent as PaintTitleIcon } from '../../assets/images/painttitle.svg'
import { ReactComponent as Start } from "../../assets/images/pSTART.svg"
import { ReactComponent as Three } from "../../assets/images/p3.svg"
import { ReactComponent as Two } from "../../assets/images/p2.svg"

const CountryPaintDetail = () => {
  const [counting, setCounting] = useState<number>(-2)
  const [paintModalState, setPaintModalState] = useState<boolean>(false);
  const [selectedPaint, setSelectedPaint] = useState<number>(0);

  useEffect(() => {
    if (counting > -1) {
      setTimeout(() => {
        setCounting((i) => i-1)
        console.log(counting)
      }, 1000);
    }
  },[counting])

  return (
    <div className="h-full w-1/3 mt-20 flex ">
      {(counting > -2)
        ?
          <div className="h-full w-full flex items-center justify-center ">
            {(counting === 3) ? <div className="absolute"><Three /></div> :null}
            {(counting === 2) ? <div className="absolute"><Two /></div> :null}
            {(counting === 1) ? <div className="absolute"><One /></div> :null}
            {(counting === 0) ? <div className="absolute"><Start /></div> :null}
          </div>
        :
          <div className="h-full w-full flex items-center justify-center" >
            <div className="absolute translate-y-[-120%]">
              <PaintTitleIcon/>
            </div>
            <div className="h-1/4 w-full flex flex-col shadow-xl ">
              <div className="h-1/6 w-full bg-[#C5ACE5] rounded-t-xl shadow-3xl" />
              <div className="h-5/6 w-full flex flex-col rounded-b-xl bg-white shadow-xl">
                <div className="h-1/2 w-full flex flex-col justify-center items-center pt-10">
                  <button
                    className='h-[50px] w-[300px] flex justify-center items-center border-solid border-[1px] bordedr-[#C5ACE5] rounded-3xl shadow-lg text-xl text-[#C5ACE5]'
                    onClick={() => {
                      setCounting(3)
                    }}
                    >
                    START
                  </button>
                </div>
                <div className="h-1/3 w-full text-xs opacity-60 font-PtdLight text-center text-[#C5ACE5] pt-5">
                  버튼을 누르면 3초 후 문제가 공개됩니다.
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default CountryPaintDetail;


// {(counting === -1) 
//   ?         
//   <div className="absolute h-[1100px]" >
//     <QuizModal
//       input={tempScrappedQuizList[selectedQuizId]}
//       closeModal={() => setQuizModalState(false)}
//     />
//   </div>    
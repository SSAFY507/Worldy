import React, { useEffect, useState } from 'react'

import { ScrappedQuizType } from '../../routes/MyPage';

const CountryPaintDetailModal = ({input,closeModal,}: {input: ScrappedQuizType; closeModal: () => void}) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [correctState, setCorrectState] = useState<boolean | null>(null);
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);

  const size: number = 200;

  const submitAndFlip = () => {
    if (submitCheck) {
      setFlipped(true);
      // setCorrectState(submitAnswer === input.answer);
    } else {
      setSubmitCheck(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      // setShowBack(true);
      console.log('보기');
    }, 1700);
  }, [flipped]);

  // useEffect(() => {
  //   if (submitAnswer === '' || submitAnswer !== beforeSubmitAnswer)
  //     setSubmitCheck(false);
  //   setBeforeSubmitAnswer(submitAnswer);
  // }, [submitAnswer]);

  // const submitButton = (): JSX.Element => {
  //   return (
  //     <button
  //       className={`w-[500px] h-[60px] rounded-md font-PtdLight text-[25px] ${
  //         submitAnswer
  //           ? submitCheck
  //             ? 'bg-[#61C7BB] text-white'
  //             : 'bg-white text-black'
  //           : 'bg-[#D4D4D4] text-[#9F9F9F]'
  //       }`}
  //       disabled={!submitAnswer}
  //       onClick={submitAndFlip}
  //     >
  //       {submitCheck ? '제출하기' : '선택 완료'}
  //     </button>
  //   );
  // };
  return (
    <div className='z-50 h-full w-full bg-red-100'>

    </div>
  )
}

export default CountryPaintDetailModal
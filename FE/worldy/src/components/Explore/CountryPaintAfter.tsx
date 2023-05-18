import { AnswerType } from './CountryPaintDetailModal';
import { ReactComponent as Exp } from '../../assets/images/exp.svg';
import Swal from "sweetalert2";

interface Props {
  answer: AnswerType,
  result: boolean,
  GetSolvedFlag: (flag:boolean,sol:boolean) => void,
};

// 확인을 누르면 다른 문제를 받아와야 하는 지? 

const CountryPaintAfter = ({answer, result, GetSolvedFlag}:Props) => {

  return (
    <div className=' h-[408px] w-full flex flex-col items-center justify-between'>
      <div className=' h-[40px] w-[780px] flex felx-row justify-between'>
        <div className='h-full w-1/3 flex flex-col justify-center'>
          <div className={`text-sm opacity-40 font-PtdRegular  ${(result) ? "text-[#24901A]" : "text-[#9A0000]"}`}>{(result) ? "틀린 그림 찾기에 성공했습니다." : "틀린 그림 찾기에 실패했습니다." }</div> 
        </div>
        <div className='h-full w-[100px] flex flex-row justify-end items-center'>
          <Exp className='w-[10px] font-PtdRegular translate-y-0.5'/>
          <div className='w-2/5 text-sm text-center text-gray-400 font-PtdRegular '>exp</div>
          <div className='w-2/5 text-sm text-center text-gray-500 font-PtdRegular'>{(result) ? "+20" : "+0"}</div>
        </div>
      </div>
      <div className='h-[276px] w-[780px] flex flex-row justify-between rounded-2xl shadow-lg border-solid border-2 border-gray-200'>
        <div className='h-full w-1/2 rounded-l-2xl bg-cover bg-center' style={{ backgroundImage: `url(${answer.img})` }} />
        <div className='h-full w-1/2 flex flex-col justify-center items-center rounded-r-2xl bg-white'>
          <div className='h-1/3 w-full flex flex-col justify-center items-center'>
            <div className='h-2/5 w-full text-center text-3xl opacity-50 font-PtdExtraBold'>{answer.title}</div>
            <div className='h-1/5 w-full text-center text-xs opacity-50 font-PtdRegular'>{answer.subTitle}</div>
          </div>
          <div className='h-2/3 w-full px-10 pb-5 text-xs inline-block font-PtdLight overflow-auto'>{answer.description}</div>
        </div>
      </div>
      <div className=' h-12 w-[780px] text-sm text-center font-PtdLight opacity-40 py-3 rounded-xl shadow-lg border-solid border-2 border-gray-200 cursor-pointer'
        onClick={() =>{
          // alert("다른 문제 풀러 이동합니다.");
          Swal.fire("다른 문제 풀러 이동합니다.")
          .then(function(){
            GetSolvedFlag(false, true)
          });
          // GetSolvedFlag(false, true)
        }}>
        한 문제 더 풀기!
      </div>
    </div>

  )
}

export default CountryPaintAfter
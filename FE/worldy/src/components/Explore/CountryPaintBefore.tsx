import { useEffect, useState } from 'react';

import { ReactComponent as Info } from '../../assets/images/Info.svg';
import { ProblemType } from './CountryPaintDetailModal';

interface Props {
  problem: ProblemType,
  GetSolvedFlag: (flag:boolean, sol:boolean) => void,
}

const CountryPaintBefore = ({problem, GetSolvedFlag}: Props) => {
  const [first, setFirst] = useState<boolean>(false);
  const [second, setSecond] = useState<boolean>(false);
  const [third, setThird] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<boolean[]>([])
  useEffect(() => {
    console.log(111111111111)
    if(checkList.length === 0) {
      let tmpList:boolean[] = []
      for (let i=0; i < problem.answerPointList!.length; i++) {
        tmpList.push(false)
      };
      setCheckList(tmpList)
    }
  },[checkList])

  const clickArea = (input:number) => {
    let tmpList = checkList;
    tmpList[input] = true;
    setCheckList(tmpList)
  };

  return (
    <div className=' h-[372px] w-full flex flex-col justify-center items-center'>
      <div className='h-[276px] w-[780px] flex flex-row justify-between'>
        <img className='h-full w-[388px] rounded-2xl bg-gray-500 bg-cover bg-center'
          src={problem.collectImg}
          alt='original'
        />
        <img className='h-full w-[388px] rounded-2xl bg-gray-500 bg-cover bg-center' 
          src={problem.quizImg}
          alt='different'
          useMap='#image-map'
        />
        <div>
          <map name="image-map" id='image-map'>
            {
              problem.answerPointList!.map((e, idx) => {
                return (
                  <>
                    <div
                      className=''
                      style={{
                        outline: '5px solid red',
                        width: `${String(Number(e[2]) - Number(e[0]))}px`,
                        height: `${String(Number(e[3]) - Number(e[1]))}px`,
                        zIndex: 90,
                        position: 'absolute',
                        left: String(Number(e[0])) +"px",
                        top: String(Number(e[1])) +"px",
                        borderRadius: '100%',
                        visibility: checkList[idx] ? 'visible' : 'hidden',
                      }}
                    />
                    <area 
                      alt="틀린 영역"
                      href="" 
                      key={idx} 
                      shape="rect" 
                      coords={`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`}
                      style={{cursor: 'default'}}
                      onClick={(e) => {
                        e.preventDefault();
                        clickArea(idx);
                        let count = 0
                        checkList.map((e, idx) => {
                          if(e) {
                            count += 1
                          }
                        })
                        switch (count) {
                          case 1:
                            setFirst(true)
                            break
                          case 2:
                            setSecond(true)
                            break
                          case 3:
                            setThird(true)
                            alert("틀린 그림 맞추기 성공! 😲  (exp: + 20)");
                            GetSolvedFlag(true, true)
                            break
                          default:
                            break
                        }
                      }} 
                    />  
                  </>
                )
              })
            }
          </map>
        </div>
      </div>
      <div className=' h-[48px] w-[780px] flex felx-row justify-between py-3'>
        <div className='h-full w-[100px] flex flex-row justify-between'>
          <div className={`${(first ? " bg-green-400" : "bg-gray-200")} h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}>1</div>
          <div className={`${(second ? "bg-green-400" : "bg-gray-200")} h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}>2</div>
          <div className={`${(third ? "bg-green-400" : "bg-gray-200")} h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}>3</div>
        </div>        
        <div  className='h-full w-1/3 flex flex-row justify-between'>
          <Info/>
          <div className='h-full text-center py-1 text-xs opacity-40 font-PtdMedium'> 주어진 시간 안에 3개의 틀린 그림을 찾아주세요.</div> 
        </div>
      </div>
      <div className=' h-12 w-[780px] text-sm text-center font-PtdLight opacity-40 py-3 rounded-xl shadow-lg border-solid border-2 border-gray-200 cursor-pointer'
        onClick={() => {
          alert("틀린 그림 맞추기 실패! 😢");
          GetSolvedFlag(true, false)
        }}
      >포기하기</div>
    </div>

  )
}

export default CountryPaintBefore
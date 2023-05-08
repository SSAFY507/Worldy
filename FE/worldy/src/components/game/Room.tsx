import React, { useState } from 'react'
import './dice.css'
import Dice from './Dice';

// 주사위 던지는 함수
const rollDice = () => {
  console.log('주사위 함수 실행');
  const dice1 = Math.floor(Math.random() * 6 + 1);
  const dice2 = Math.floor(Math.random() * 6 + 1);
  showDice(dice1, dice2);
}


// 주사위 흔드는 함수
function showDice(dice1: number, dice2: number): void {

  const dicesElement1 = document.querySelectorAll(".dice");
  const dicesElement2 = document.querySelectorAll(".dice2");

  dicesElement1.forEach(function (dice) {
    dice.classList.remove("active");
    animateDice(dice1, dice);

  });

  dicesElement2.forEach(function (dice) {
    dice.classList.remove("active");
    animateDice(dice2, dice);
  });


}

function animateDice(randomNumber: number, dice: any) {
  if (dice.id === `dice-${randomNumber}`) {

    setTimeout(function () {
      dice.classList.add("active");
    });
  }

}







export default function Room(props: any) {

  const p1 = props.p[0];
  const p2 = props.p[1];
  const p3 = props.p[2];
  const p4 = props.p[3];
  const setP1 = props.setP[0];
  const setP2 = props.setP[1];
  const setP3 = props.setP[2];
  const setP4 = props.setP[3];
  const worldMap = props.worldMap;
  const setWorldMap = props.setWorldMap;



  const pList = [p1, p2, p3];

  return (<>
    <div className='w-full h-full bg-[#FFFDF4] flex justify-center items-center'>
      {/* 왼쪽영역 */}
      <div className='w-[20%] h-full flex flex-col justify-center items-center'>
        <div className='mt-[30px] mb-[30px] h-[40px] text-[20px]'>턴 : { }</div>
        <div className='w-[320px] h-[840px] mb-[50px] outline outline-1 flex flex-col justify-around items-center'>
          {pList.map((i, index) => {
            return <div key={index}>
              <div className='w-[300px] h-[260px] bg-[#F4F2EC] rounded-[8px] flex flex-col justify-center items-center'>
                <div className='w-[250px] h-[210px] bg-[#F4F2EC]'>
                  <div className='flex justify-between'>
                    <div className=''>플레이어{i.playerNum}</div>
                    <div className=''>현재 위치</div>
                  </div>
                  <div className='flex justify-between h-[34px] mt-[10px] mb-[10px] border-solid border-gray-400 border-b-[1px]'>
                    <div className='text-[22px]'>{i.name}</div>
                    <div className='text-[22px]'>[{i.game.location}]</div>
                  </div>
                  <div className='flex flex-col w-full h-[60px] items-between'>
                    <div className=''>보유자산</div>
                    <div className='flex mt-[10px]'>
                      <div className='text-[20px]'>{i.game.balance} 만원</div>
                    </div>
                  </div>
                  <div className='flex flex-col w-full h-[60px] items-between'>
                    <div className=''>소유국가</div>
                    <div className='flex mt-[10px]'>
                      <div className='text-[20px]'>[{i.game.own}]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>



      {/* 가운데 영역 */}
      <div className='w-[60%] h-full bg-white flex justify-center items-center'>
        <div className='w-[1030px] h-[1030px] bg-[#F4F2EC] rounded-[20px] mb-[50px] flex justify-center items-center relative left-[180px]'>
          <div className='w-[990px] h-[990px] bg-green-100 rounded-[14px] flex justify-center items-center'>

            {/* 0~ 10 */}
            <div className='w-[990px] h-[90px] rounded-[10px] z-[1] flex relative top-[-450px] left-[496px]'>
              {worldMap.map((i: Spot, index: number) => {
                return <div key={index}>
                  {
                    i.type === 'nation' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'start' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-center items-center font-PtdExtraBold bg-white text-[20px]'>START</div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                </div>
              })}
            </div>

            {/* 10~ 20 */}
            <div className='w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-col relative top-[-450px] left-[496px]'>
              {worldMap.map((i: Spot, index: number) => {
                return <div key={index}>
                  {
                    i.type === 'nation' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'desert' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-center items-center font-PtdExtraBold bg-white text-[20px]'>무인도</div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                </div>
              })}
            </div>

            {/* 20~ 30 */}
            <div className='w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-row-reverse relative top-[450px] left-[-404px]'>
              {worldMap.map((i: Spot, index: number) => {
                return <div key={index}>
                  {
                    i.type === 'nation' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'port' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-center items-center font-PtdExtraBold bg-white text-[20px]'>정거장</div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                </div>
              })}
            </div>

            {/* 30~ 40 */}
            <div className='w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-col-reverse relative top-[450px] left-[-1394px]'>
              {worldMap.map((i: Spot, index: number) => {
                return <div key={index}>
                  {
                    i.type === 'nation' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                  {
                    i.type === 'olympic' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-center items-center font-PtdExtraBold bg-white text-[20px]'>올림픽</div>
                    </div>
                  }
                  {
                    i.type === 'tax' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-center items-center font-PtdExtraBold bg-white text-[20px]'>국세청</div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'></div>
                    </div>
                  }
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='w-[700px] h-[780px] flex flex-col justify-start items-center relative top-[-20px] left-[-490px]'>
          <div className='w-[340px] h-[280px] rounded-[8px] bg-white mt-[20px] shadow-lg relative'>
            {/* 주사위 영역 */}
            <Dice></Dice>
            <div className='shbutton w-[340px] h-[60px] rounded-[4px] bg-red-500 flex justify-center items-center text-white text-[20px]'
              onClick={() => {
                rollDice();
              }}
            >주사위 던지기</div>

            {/* 콘솔창 영역 */}
            <div className='w-[340px] h-[300px] bg-white rounded-[8px] mt-[140px] shadow-lg relative'></div>
          </div>
        </div>
      </div>









      {/* 오른쪽 영역 */}
      <div className='w-[20%] h-full flex flex-col justify-center items-center'>
        <div className='mt-[30px] mb-[30px] h-[40px] text-[20px]'>lap : { }</div>
        <div className='w-[320px] h-[840px] mb-[50px] outline outline-1 flex flex-col justify-around items-center'>
          <div className='w-[300px] h-[260px] bg-[#F4F2EC] rounded-[8px] flex flex-col justify-center items-center'>
            <div className='w-[250px] h-[210px] bg-[#F4F2EC]'>
              <div className='flex justify-between'>
                <div className=''>플레이어{p4.playerNum}</div>
                <div className=''>현재 위치</div>
              </div>
              <div className='flex justify-between h-[34px] mt-[10px] mb-[10px] border-solid border-gray-400 border-b-[1px]'>
                <div className='text-[22px]'>{p4.name}</div>
                <div className='text-[22px]'>[{p4.game.location}]</div>
              </div>
              <div className='flex flex-col w-full h-[60px] items-between'>
                <div className=''>보유자산</div>
                <div className='flex mt-[10px]'>
                  <div className='text-[20px]'>{p4.game.balance} 만원</div>
                </div>
              </div>
              <div className='flex flex-col w-full h-[60px] items-between'>
                <div className=''>소유국가</div>
                <div className='flex mt-[10px]'>
                  <div className='text-[20px]'>[{p4.game.own}]</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[300px] h-[540px] bg-[#F4F2EC] rounded-[8px]'>
            <div></div>
          </div>
        </div>
      </div>






      {/* <div>{p1.name}</div>
      <div onClick={()=> {
        console.log('클릭');
        setP1((prevState:any) => ({
          ...prevState,
          name: '김성훈',
          game: {
            ...prevState.game,
            location: 2,
            desert: 3,
          }
        }))
      }}>데이터수정</div> 
       */}







    </div>
  </>
  )
}


import React, { useEffect, useState } from 'react'
import './dice.css'
import Dice from './Dice';
import GameQuizModal from '../GameQuizModal';


export default function Game2D(props: any) {

  const player = props.player;
  const setPlayer = props.setPlayer;

  const metaData = props.metaData;
  const setMetaData = props.setMetaData;

  const worldMap = props.worldMap;
  const setWorldMap = props.setWorldMap;

  const loginUser = props.loginUser;

  const ws = props.ws;

  const closeModal = props.closeModal;
  const quiz = props.quiz;
  const quizModalState = props.quizModalState;

  let pList: Player[] = [];
  let me: any = {};

  if (loginUser !== player.p1.playerId) {
    pList.push(player.p1)
  } else {
    me = player.p1
  }
  if (loginUser !== player.p2.playerId) {
    pList.push(player.p2)
  } else {
    me = player.p2
  }
  if (loginUser !== player.p3.playerId) {
    pList.push(player.p3)
  } else {
    me = player.p3
  }
  if (loginUser !== player.p4.playerId) {
    pList.push(player.p4)
  } else {
    me = player.p4
  }

  // console.log('pList>>>>');
  // console.log(pList);

  // console.log('me>>>>>')
  // console.log(me);

  useEffect(() => {
    if (metaData.turnOver && !metaData.isDouble) {
      // 턴이 true이고, 더블이  false;
      setMetaData((prevState: any) => ({
        ...prevState,
        turn: (prevState.turn + 1) % 4,
        turnOver: false,
      }))

    } else if (metaData.turnOver && metaData.isDouble) {
      setMetaData((prevState: any) => ({
        ...prevState,
        turnOver: false,
      }))
    }
  }, [metaData.turnOver])


  // 주사위 던지는 함수
  const rollDice = () => {
    console.log('주사위 함수 실행');
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1);
    const dice = dice1 + dice2;
    let isDouble = false;
    if (dice1 === dice2) {
      isDouble = true;
    }

    setMetaData((prevState: any) => ({
      ...prevState,
      dice1: dice1,
      dice2: dice2,
      isDouble: true,
    }))
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

  // 플레이어 턴 함수
  function playerTurn(turn: number) {
    console.log('플레이어 턴 실행');
    let p: any = null
    const setP = setPlayer;

    if (turn === 0) {
      p = player.p1
    } else if (turn === 1) {
      p = player.p2
    } else if (turn === 2) {
      p = player.p3
    } else if (turn === 3) {
      p = player.p4
    }

    console.log(p.name + '님 턴')
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1);
    const dice = dice1 + dice2;
    let isDouble = false;
    if (dice1 === dice2) {
      isDouble = true;
    }

    setMetaData((prevState: any) => ({
      ...prevState,
      dice1: dice1,
      dice2: dice2,
      isDouble: isDouble,
    }))
    showDice(dice1, dice2);

    // 이동위치 반환 함수
    const newLocation = move(p, dice);

    console.log('newLocation : ');
    console.log(newLocation);


    console.log('setPlayer 실행')
    // 이동 데이터 세팅
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            location: newLocation,
          }
        }
      }));
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            location: newLocation,
          }
        }
      }));
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            location: newLocation,
          }
        }
      }));
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            location: newLocation,
          }
        }
      }));
    }



  }

  function move(p: Player, dice: number) {
    let result = p.game.location + dice;
    if (result >= 40) {
      console.log(p.playerNum + '님 완주')
      console.log('한바퀴 완주 월급 + 50만원');
      result = (result % 40);
      if (p.playerNum === 1) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + 50,
            }
          }
        }))
      } else if (p.playerNum === 2) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + 50,
            }
          }
        }))
      } else if (p.playerNum === 3) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + 50,
            }
          }
        }))
      } else if (p.playerNum === 4) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + 50,
            }
          }
        }))
      }
    }
    setMetaData((prevState: any) => ({
      ...prevState,
      currentLocation: result,
    }))
    return result;
  }

  return (<>
    {quizModalState && (          
              <div
              className='shadow-md shadow-black w-fit h-fit'
              >

              <GameQuizModal
                input={quiz}
                closeModal={() => closeModal(false)}
              />
              </div>
    )}   
    <div className={`w-full h-full bg-[#FFFDF4] flex justify-center items-center ${quizModalState? 'blur-sm ' : ''}`}>
      {/* 왼쪽영역 */}
      <div className='w-[20%] h-full flex flex-col justify-center items-end'>

        {/* 메타 데이터 영역 */}
        <div className='mt-[30px] mb-[30px] w-[300px] h-[180px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200 text-[20px]'>
          <div>현재 턴 : {metaData.turn + 1}</div>
          <div>턴 오버 : {metaData.turnOver ? 'true' : 'false'}</div>
          <div>더 블 : {metaData.isDouble ? '더블' : '더블아님'}</div>
          <div>현재위치 : {metaData.currentLocation}</div>
          <div>주사위 : [{metaData.dice1}, {metaData.dice2}]</div>
        </div>
        <div className='w-[320px] h-[840px] mb-[50px]  flex flex-col justify-around items-center'>
          {pList.map((i, index) => {
            return <div key={index}>
              <div className='w-[300px] h-[260px] bg-[#F4F2EC] rounded-[8px] flex flex-col justify-center items-center'>
                <div className='w-[250px] h-[210px] bg-[#F4F2EC]'>
                  <div className='flex justify-between'>
                    <div className=''>플레이어[{i.playerNum}]</div>
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
      <div className='w-[60%] h-full flex justify-center items-center mb-[20px]'>
        <div className='w-[1010px] h-[1010px] bg-[#F4F2EC] rounded-[20px] mb-[50px] flex justify-center items-center relative left-[180px]'>
          <div className='w-[990px] h-[990px] bg-green-100 rounded-[14px] flex justify-center items-center'>

            {/* 0~ 10 */}
            <div className='w-[990px] h-[90px] rounded-[10px] z-[1] flex relative top-[-450px] left-[496px]'>
              {worldMap.map((i: Spot, index: number) => {
                return <div key={index}>
                  {
                    i.type === 'nation' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-around items-center bg-white flex-wrap'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'start' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]'>
                        <img src='/game/f0.png' className='w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]'></img>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 0 && i.location < 10) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-orange-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
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
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-green-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'desert' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]'>
                        <img src='/game/f10.png' className='w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]'></img>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 10 && i.location < 20) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-orange-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
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
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'port' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]'>
                        <img src='/game/f20.png' className='w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]'></img>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 20 && i.location < 30) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-orange-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
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
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-purple-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'city' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'olympic' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]'>
                        <img src='/game/f30.png' className='w-[82px] h-[82px] object-fill absolute z-[1] blur-[2px]'></img>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'tax' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500'>
                      <div className='w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]'>
                        <img src='/game/f37.png' className='w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]'></img>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                  {
                    i.type === 'item' && (i.location >= 30 && i.location < 40) &&
                    <div className='w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-orange-400'>
                      <div className='w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold '>{i.name}</div>
                      <div className='w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white'>
                        {i.location === player.p1.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]'>{player.p1.name}</div>}
                        {i.location === player.p2.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]'>{player.p2.name}</div>}
                        {i.location === player.p3.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]'>{player.p3.name}</div>}
                        {i.location === player.p4.game.location && <div className='w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]'>{player.p4.name}</div>}
                      </div>
                    </div>
                  }
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='w-[380px] h-[780px] flex flex-col justify-start items-center relative top-[-20px] left-[-510px]'>
          <div className='w-[380px] h-[280px] rounded-[8px] bg-white shadow-lg'>
            {/* 주사위 영역 */}
            <Dice></Dice>
            <div id='shbutton' className='w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px]'
              onClick={() => {
                rollDice();
              }}
            >주사위 던지기</div>

            <div id='shbutton' className='w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute top-[290px]'
              onClick={() => {
                playerTurn(metaData.turn);
              }}
            >다른 사람 주사위</div>

            <div id='shbutton' className='w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute top-[360px]'
              onClick={() => {
                setMetaData((prevState: any) => ({
                  ...prevState,
                  turnOver: true,
                }))
              }}
            >턴 종료</div>

            <div id='shbutton' className='w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute top-[360px]'
              onClick={()=> {
                const nationId = 11;
                const kakaoId = "2757389101";
                const roomId = "2386a4ee-355f-4f1d-9b77-118b2cbf99f9";
      
                ws.send(`/pub/game/quiz/${kakaoId}/${roomId}/${nationId}`, {}, JSON.stringify(null));
      
              }}
            >퀴즈 요청</div>

            


            {/* 콘솔창 영역 */}
            <div className='w-[380px] h-[340px] bg-white rounded-[8px] mt-[150px] shadow-lg relative flex justify-center items-center'>
              <div className='w-[320px] h-[300px] bg-red-200 flex flex-col items-center'>
                <div className='w-full h-[100px] bg-green-200 flex flex-col items-center'>
                  [{worldMap[metaData.currentLocation].name}]
                </div>
                <div className='w-full h-[200px] bg-yellow-200'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className='w-[20%] h-full flex flex-col justify-center items-start'>
        <div className='mt-[30px] mb-[30px] h-[40px] text-[20px] bg-red-400'></div>
        <div className='w-[320px] h-[840px] mb-[50px]  flex flex-col justify-around items-center'>
          <div className='w-[300px] h-[260px] bg-[#F4F2EC] rounded-[8px] flex flex-col justify-center items-center'>
            <div className='w-[250px] h-[210px] bg-[#F4F2EC]'>
              <div className='flex justify-between'>
                <div className=''>플레이어 [{me.playerNum}]</div>
                <div className=''>현재 위치</div>
              </div>
              <div className='flex justify-between h-[34px] mt-[10px] mb-[10px] border-solid border-gray-400 border-b-[1px]'>
                <div className='text-[22px]'>{me.name}</div>
                <div className='text-[22px]'>[{me.game.location}]</div>
              </div>
              <div className='flex flex-col w-full h-[60px] items-between'>
                <div className=''>보유자산</div>
                <div className='flex mt-[10px]'>
                  <div className='text-[20px]'>{me.game.balance} 만원</div>
                </div>
              </div>
              <div className='flex flex-col w-full h-[60px] items-between'>
                <div className=''>소유국가</div>
                <div className='flex mt-[10px]'>
                  <div className='text-[20px]'>[{me.game.own}]</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[300px] h-[540px] bg-[#F4F2EC] rounded-[8px]'>
            <div></div>
          </div>
        </div>
      </div>
    </div >
  </>
  )
}


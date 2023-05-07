import React, { useEffect, useState } from 'react'
import CreateGame from './CreateGame';
import { Route } from 'react-router';
import Room from './Room';


export default function Test() {
  
  const [contents, setContents] = useState<String>('');
  const [mode, setMode] = useState<string>('');
  // 백으로부터 응답 받은 데이터
  let res = {};




  // 플레이어 데이터 세팅
  const [p1, setP1] = useState<Player>({
    roomId: '',
    type: 'player',
    playerId: '',
    playerNum: 1,
    name: '성훈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: true,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })
  const [p2, setP2] = useState<Player>({
    roomId: '',
    type: 'player',
    playerId: '',
    playerNum: 2,
    name: '한빈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p3, setP3] = useState<Player>({
    roomId: '',
    type: 'player',
    playerId: '',
    playerNum: 3,
    name: '정훈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p4, setP4] = useState<Player>({
    roomId: '',
    type: 'player',
    playerId: '',
    playerNum: 4,
    name: '원규',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const p = [p1, p2, p3, p4]
  const setP = [setP1, setP2, setP3, setP4]


  return (<>
    <div className='w-full h-full z-[600] bg-red-500 flex flex-col justify-center items-center'>

    { mode === '' && <CreateGame mode={mode} setMode={setMode}></CreateGame>}
    { mode === '게임' && <Room p={p} setP={setP}></Room> }
    
      
      
      
      
      
      
      
      
      {/* <div>소켓 테스트용</div>
      <div className='flex flex-col'>
        <button className='w-[120px] h-[50px] mt-[20px]' onClick={sendMsg}>소켓 데이터 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px]' onClick={sendEmoticon}>이모티콘 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px]'onClick={requestQuiz}>퀴즈 요청</button>
      </div> */}

    </div>
  </>
  )
}


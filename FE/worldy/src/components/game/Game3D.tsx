import Game3DItem from './game3D/Game3DItem'
import React from 'react'

export interface PlayerInfoType {
  playerIndex: number,
  currentIndex: number,
  turn: number
}

export default function Game3D(props: any) {
  const playerInfo:PlayerInfoType = {
    playerIndex: 1,
    currentIndex: 0,
    turn: 0
  }

  return (
  <div className='w-screen h-screen  bg-[#FFFDF4] flex flex-col justify-center items-center'>
    {/* <div className='text-[80px] font-PtdExtraBold'>3D 모드 개발중...</div> */}
    <Game3DItem playerInfo={playerInfo} />
  </div>
  )
}

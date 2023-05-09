import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Waiting() {

  const navigate = useNavigate();

  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>친구와 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

    }}>카카오톡 공유하기</button>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
      navigate('/game')
    }}>방 입장하기</button>

  </div>
  )
}

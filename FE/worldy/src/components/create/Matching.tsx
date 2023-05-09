import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Matching() {

  const navigate = useNavigate();

  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>랜덤 매칭 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
      navigate('/game')
    }}>방 입장하기</button>
  </div>
  )
}

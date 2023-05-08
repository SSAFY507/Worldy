import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { Navigate, Router } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';




export default function CreateGame(props: any) {
  const navigate = useNavigate();

  const randomMatching = () => {
    console.log('랜덤매칭 대기중으로 이동')
    navigate('/waiting');
  }

  return (<>
    <div className='w-full h-full bg-white flex flex-col justify-center items-center'>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

      }}>친구랑 같이하기</button>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
        randomMatching();
      }}>랜덤 매칭</button>
    </div>
  </>
  )
}


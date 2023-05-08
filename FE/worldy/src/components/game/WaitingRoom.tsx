import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';





export default function WaitingRoom(props: any) {


  return (<>
    <div className='w-full h-full bg-white flex flex-col justify-center items-center'>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

      }}>랜덤매칭 대기중...</button>
    </div>
  </>
  )
}


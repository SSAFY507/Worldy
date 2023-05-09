import React from 'react'
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Matching() {

  // const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  // const ws = Stomp.over(socket);

  // ws.connect({}, (frame: any) => {
  //   console.log("connected to Chat server:", frame);
  //   subscribe();
  // });

  // function subscribe() {


  //   ws.subscribe(`/sub/2386a4ee-355f-4f1d-9b77-118b2cbf99f9`, (event) => {
  //     const received = JSON.parse(event.body);
  //     console.log('응답받은 데이터 >>>>>');
  //     console.log(received);

  //   });
  // }


  const navigate = useNavigate();




  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>랜덤 매칭 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
      navigate('/game')
    }}>방 입장하기</button>
  </div>
  )
}

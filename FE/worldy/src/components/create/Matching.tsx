import React from 'react'
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Matching(props: any) {

  const matchingId = props.matchingId;
  let roomId = '';
  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzc3NTAxMX0.FGXDtMPT4TZdwoUDUc98lZNlYI7d4MK2YYu63b7nvQiJdzY2zItjIgmOAsM5_Y4hKIPv2eU5o9gOwdbgyRc8uQ  '
  let headers = { Authorization: `Bearer ${accessToken}` };

  ws.connect(headers, (frame: any) => {
    console.log("connected to Chat server:", frame);
    subscribe();
  });

  function subscribe() {


    ws.subscribe(`/sub/${matchingId}`, (event) => {
      const received = JSON.parse(event.body);
      console.log('응답받은 데이터 >>>>>');
      console.log(received);
      console.log('룸 아이디: ');
      console.log(received.roomId)
      roomId = received.roomId;

      roomId = '2386a4ee-355f-4f1d-9b77-118b2cbf99f9'

      // roomId 방으로 이동
      ws.disconnect();
      navigate(`/game/${roomId}`)


    });
  }


  const navigate = useNavigate();




  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>랜덤 매칭 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
      navigate('/game')
    }}>방 입장하기</button>
  </div>
  )
}

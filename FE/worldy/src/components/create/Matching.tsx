import React from 'react'
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react'


let socket: any;
let ws: any;

export default function Matching(props: any) {

  const matchingId = props.matchingId;
  let roomId = '기본';
  const accessToken = sessionStorage.getItem('token');
  let headers = { Authorization: `Bearer ${accessToken}` };
  const navigate = useNavigate();

  useEffect(() => {
    socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
    ws = Stomp.over(socket);
    ws.connect(headers, (frame: any) => {
      console.log("소켓연결", frame);
      subscribe();
    });

  }, [])





  function subscribe() {


    ws.subscribe(`/sub/${matchingId}`, (event: any) => {
      const received = JSON.parse(event.body);
      console.log('응답받은 데이터 >>>>>');
      console.log(received);
      roomId = '2386a4ee-355f-4f1d-9b77-118b2cbf99f9'


      let gameData =
      {
        "user1": {
          "kakaoId": "2757389101",
          "roomId": "waiting-2757389101",
          "mmr": 1587,
          "level": 0,
          "startWaitingTime": "2023-05-03 17:08:28:28"
        },
        "user2": {
          "kakaoId": "2756798359",
          "roomId": "waiting-2756798359",
          "mmr": 1314,
          "level": 0,
          "startWaitingTime": "2023-05-03 17:08:30:79"
        },
        "user3": {
          "kakaoId": "2762535269",
          "roomId": "waiting-2762535269",
          "mmr": 1185,
          "level": 0,
          "startWaitingTime": "2023-05-03 17:08:34:43"
        },
        "user4": {
          "kakaoId": "2772224261",
          "roomId": "waiting-2772224261",
          "mmr": 1464,
          "level": 0,
          "startWaitingTime": "2023-05-03 17:08:39:66"
        },
        "gameRoom": {
          "roomId": "82f2141c-f63f-4f53-bf3d-c20b3ef9adda"
        }
      }


      navigate(`/game/${roomId}`, { state: { value: gameData } })

      // roomId 방으로 이동
      // ws.disconnect();


    });
  }







  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>랜덤 매칭 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

    }}>방 입장하기</button>
  </div>
  )
}

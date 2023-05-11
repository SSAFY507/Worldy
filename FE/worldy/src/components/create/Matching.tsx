import React from 'react'
import { useNavigate } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react'

export default function Matching(props: any) {

  const matchingId = props.matchingId;
  let roomId = '기본';
  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzk0OTY2N30.zZsk4JnHTobz2XFd6KlNubhXgh7VHpW3xagW1R2oZko0zkAI4-UM0tzLUnPKUAPn7HvKC6ObLaz8n4KcRNbUDQ'
  let headers = { Authorization: `Bearer ${accessToken}` };
  const navigate = useNavigate();


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
      // console.log(received.gameRoom.roomId);
      //roomId = received.gameRoom.roomId;

      //console.log(roomId);
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

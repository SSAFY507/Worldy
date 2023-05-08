import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


/// <reference path="./game/gameType.d.ts" />


export default function CreateGame(props: any) {


  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);


  ws.connect({}, (frame: any) => {
    console.log("connected to Chat server:", frame);
    subscribe();
  });

  function subscribe() {


    ws.subscribe(`/sub/2386a4ee-355f-4f1d-9b77-118b2cbf99f9`, (event) => {
      const received = JSON.parse(event.body);
      console.log('받은 데이터 >>>>>');
      console.log(received);
    });
  }


  function playFriends() {
    console.log('친구랑 함께하기')
    console.log(props.mode);
    props.setMode('게임')
  }

  function randomMatch() {
    console.log('랜덤 매칭')
  }

  function requestQuiz() {

    console.log('퀴즈 요청 >>>')
    const data = {
      "emoticon": "happy",
      "roomId": "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "kakaoId": "wordy",
      "type": 'emoticon',
    }
    // ws.send("/pub/game/quiz/{kakaoId}/{gameRoomId}/{nationId}", {}, JSON.stringify(data));
    ws.send("/pub/game/quiz/sundaykidz/2386a4ee-355f-4f1d-9b77-118b2cbf99f9/2", {}, JSON.stringify(data));
  }

  function sendEmoticon() {
    const data = {
      "emoticon": "happy",
      "roomId": "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "kakaoId": "wordy",
      "type": 'emoticon',
    }
    console.log('이모티콘 전송 >>>')
    ws.send("/pub/game/emoticon", {}, JSON.stringify(data));
  }

  function sendMsg() {
    //websockt emit
    const data = {
      "roomId": "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "type": "player",
      "players": [
        {
          "playerId": "미희",
          "playerNum": 1,
          "name": "mihee",
          "game": {
            "location": 1,
            "balance": 1,
            "desert": 1,
            "state": 1,
            "dice1": 1,
            "dice2": 1,
            "dice": 2,
            "isDouble": 1,
            "own": [0],
            "lap": 1,
            "ranking": 1
          }
        },
        {
          "playerId": "원규",
          "playerNum": 2,
          "name": "mihee",
          "game": {
            "location": 1,
            "balance": 1,
            "desert": 1,
            "state": 1,
            "dice1": 1,
            "dice2": 1,
            "dice": 2,
            "isDouble": 1,
            "own": [0],
            "lap": 1,
            "ranking": 1
          }
        },
        {
          "playerId": "성훈",
          "playerNum": 3,
          "name": "mihee",
          "game": {
            "location": 1,
            "balance": 1,
            "desert": 1,
            "state": 1,
            "dice1": 1,
            "dice2": 1,
            "dice": 2,
            "isDouble": 1,
            "own": [0],
            "lap": 1,
            "ranking": 1
          }
        },
        {
          "playerId": "설희",
          "playerNum": 4,
          "name": "mihee",
          "game": {
            "location": 1,
            "balance": 1,
            "desert": 1,
            "state": 1,
            "dice1": 1,
            "dice2": 1,
            "dice": 2,
            "isDouble": 1,
            "own": [0],
            "lap": 1,
            "ranking": 1
          }
        },
      ]
    }
    console.log('데이터 전송 >>>')
    ws.send("/pub/game/player", {}, JSON.stringify(data));
  }



  return (<>
    <div className='w-full h-full bg-white flex flex-col justify-center items-center'>
      <h1>Create Game Mode</h1>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={playFriends}>친구랑 같이하기</button>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={randomMatch}>랜덤 매칭</button>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
        // window.Kakao.Link.sendDefault();
      }}>카카오 공유하기</button>








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


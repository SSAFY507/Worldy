import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function SocketTest() {
  // const accessToken = 'x9jFFbdWND410Nyb-lmKe32f7vz9NY3PncP3s4d9CisMpgAAAYflyz4_'
  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);


  // const [data, setData] = useState<('');

  ws.connect({}, (frame: any) => {
    console.log("connected to Chat server:", frame);
    subscribe();
  });

  function subscribe() {


    ws.subscribe(`/sub/2386a4ee-355f-4f1d-9b77-118b2cbf99f9`, (event) => {
      const received = JSON.parse(event.body);
      console.log('받은 데이터 >>>>>');
      console.log(received);
      let data = received;

    });


  }
  function requestQuiz() {

    console.log('퀴즈 요청 >>>')
    const data = {
      "emoticon" : "happy",
      "roomId" : "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "kakaoId" : "wordy",
      "type" : 'emoticon', 
    }
    // ws.send("/pub/game/quiz/{kakaoId}/{gameRoomId}/{nationId}", {}, JSON.stringify(data));
    ws.send("/pub/game/quiz/sundaykidz/2386a4ee-355f-4f1d-9b77-118b2cbf99f9/2", {},JSON.stringify(data));
  }

  function sendEmoticon() {
    const data = {
      "emoticon" : "happy",
      "roomId" : "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "kakaoId" : "wordy",
      "type" : 'emoticon', 
    }
    console.log('이모티콘 전송 >>>')
    ws.send("/pub/game/emoticon", {}, JSON.stringify(data));
  }

  function sendMsg() {
    //websockt emit
    const data = {
      "roomId" : "2386a4ee-355f-4f1d-9b77-118b2cbf99f9",
      "type" : "player",
      "players" : [
        {
          "type": "player",
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
            "own": [1, 2, 3],
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
            "own": [1, 2, 3],
            "lap": 1,
            "ranking": 1
          }
        },
        {
          "playerId": "설희",
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
            "own": [1, 2, 3],
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
            "own": [1, 2, 3],
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
    <div className='w-full h-full bg-white'>
      <div>소켓 테스트용</div>
      <div className='flex flex-col'>
        <button className='w-[120px] h-[50px] mt-[20px]' onClick={sendMsg}>소켓 데이터 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px]' onClick={sendEmoticon}>이모티콘 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px]'onClick={requestQuiz}>퀴즈 요청</button>
      </div>

    </div>
  </>
  )
}


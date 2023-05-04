import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function SocketTest() {
  // const accessToken = 'x9jFFbdWND410Nyb-lmKe32f7vz9NY3PncP3s4d9CisMpgAAAYflyz4_'
  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);

  ws.connect({}, (frame: any) => {
    console.log("connected to Chat server:", frame);
    subscribe();
  });

  function subscribe() {


    ws.subscribe(`/sub/2386a4ee-355f-4f1d-9b77-118b2cbf99f9`, (event) => {
      const received = JSON.parse(event.body);
      let data = {};

    });


  }

  function sendMsg() {
    //websockt emit
    const player = {
      "type": "player",
      "playerId": "미희",
      "playerNum": 1,
      "name": "mihee",
      "roomId": "0e2e573f-ceb9-4dd2-89d1-e34f91df3aab",
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
    }
    ws.send("/pub/game/player", {}, JSON.stringify(player));
  }

  return (<>
    <div className='w-full h-full bg-white'>
      <div>소켓 테스트용</div>
      <button onClick={sendMsg}>소켓 데이터 전송</button>

    </div>
  </>
  )
}


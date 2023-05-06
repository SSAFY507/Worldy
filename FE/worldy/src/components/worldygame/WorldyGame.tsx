import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function WorldyGame() {

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
      let data = received;

    });


  }


  return (<>
    <div className='w-full h-full bg-white'>

    </div>
  </>
  )
}


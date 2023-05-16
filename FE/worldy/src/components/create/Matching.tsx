import React from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import "../game/dice2.css";
import Dice from "../game/Dice";

let socket: any;
let ws: any;

export default function Matching(props: any) {
  const matchingId = props.matchingId;

  console.log("matching id check>>>>>>");
  console.log(matchingId);
  console.log("matching id check>>>>>>");
  let roomId;
  let gameData: any;
  const accessToken = sessionStorage.getItem("token");
  let headers = { Authorization: `Bearer ${accessToken}` };
  const navigate = useNavigate();

  useEffect(() => {
    if (matchingId) {
      socket = new SockJS("https://k8a507.p.ssafy.io/api/stomp/game");
      ws = Stomp.over(socket);
      ws.connect(headers, (frame: any) => {
        console.log("소켓연결", frame);
        subscribe(matchingId);
      });
    }
  }, [matchingId]);

  function subscribe(matchingId: string) {
    console.log("matching id : 구 독");
    console.log(matchingId);
    ws.subscribe(`/sub/${matchingId}`, (event: any) => {
      const received = JSON.parse(event.body);
      console.log("응답받은 데이터 >>>>>");
      console.log(received);

      // if (received.gameRoom.roomId) {
      //   roomId = received.gameRoom.roomId;

      //   navigate(`/game/${roomId}`);
      // }

      // roomId = "2386a4ee-355f-4f1d-9b77-118b2cbf99f9";
      // navigate(`/game/${roomId}`);

      // gameData = {
      //   user1: {
      //     kakaoId: "2757389101",
      //     roomId: "waiting-2757389101",
      //     mmr: 1587,
      //     level: 0,
      //     startWaitingTime: "2023-05-03 17:08:28:28",
      //   },
      //   user2: {
      //     kakaoId: "2756798359",
      //     roomId: "waiting-2756798359",
      //     mmr: 1314,
      //     level: 0,
      //     startWaitingTime: "2023-05-03 17:08:30:79",
      //   },
      //   user3: {
      //     kakaoId: "2762535269",
      //     roomId: "waiting-2762535269",
      //     mmr: 1185,
      //     level: 0,
      //     startWaitingTime: "2023-05-03 17:08:34:43",
      //   },
      //   user4: {
      //     kakaoId: "2772224261",
      //     roomId: "waiting-2772224261",
      //     mmr: 1464,
      //     level: 0,
      //     startWaitingTime: "2023-05-03 17:08:39:66",
      //   },
      //   gameRoom: {
      //     roomId: "82f2141c-f63f-4f53-bf3d-c20b3ef9adda",
      //   },
      // };

      // roomId 방으로 이동
      // ws.disconnect();
    });
  }

  // 플레이어 턴 함수
  function startDice() {
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1);

    showDice(dice1, dice2);
  }

  // 주사위 흔드는 함수
  function showDice(dice1: number, dice2: number): void {
    const dicesElement1 = document.querySelectorAll(".dice");
    const dicesElement2 = document.querySelectorAll(".dice2");

    dicesElement1.forEach(function (dice) {
      dice.classList.remove("active");
      animateDice(dice1, dice);
    });

    dicesElement2.forEach(function (dice) {
      dice.classList.remove("active");
      animateDice(dice2, dice);
    });
  }
  
  function animateDice(randomNumber: number, dice: any) {
    if (dice.id === `dice-${randomNumber}`) {
      setTimeout(function () {
        dice.classList.add("active");
      });
    }
  }
      
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover bg">     
      <div className="flex flex-col items-center h-[700px] mt-[-100px]" >
        <div className="font-PtdSemiBOld text-[40px] text-white">
          게임 찾는 중
        </div>
        <div className="font-PtdExtraLight text-[15px] text-white mt-[20px]">
          예상 대기 시간
        </div>
        <div >
          <img
              className='mt-[10px] w-[125px] object-cover'
              src={'/game/loading.gif'}
              alt='WORLDY GAME'
          />
          <div className="w-[40px] h-[30px] text-white relative top-[-70px] left-[50px]">100</div>
        </div>

      <div className="w-[380px] h-[320px] rounded-[8px] bg-white/50 shadow-lg mt-[50px]">
        {/* 주사위 영역 */}
        <Dice></Dice>
        <div
        className={`w-[380px] h-[60px] mt-[40px] rounded-[4px] flex justify-center items-center text-white text-[20px] bg-red-500 hover:cursor-pointer hover:bg-red-600`}
        onClick={() => {
          startDice()
        }}
        >
        주사위 던지기
        </div>
      </div>

        
      </div>
    
      </div>
    </>
  );
}

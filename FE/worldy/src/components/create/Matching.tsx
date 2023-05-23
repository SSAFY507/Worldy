import React from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import '../game/dice2.css';
import Dice from '../game/Dice';
import pathLC from '../../assets/images/LogoColored.png';
import Swal from 'sweetalert2';

let socket: any;
let ws: any;

export default function Matching(props: any) {
  const matchingId = props.matchingId;

  const Swal = require('sweetalert2');

  console.log('matching id check>>>>>>');
  console.log(matchingId);
  console.log('matching id check>>>>>>');
  let roomId;
  let gameData: any;
  const accessToken = sessionStorage.getItem('token');
  let headers = { Authorization: `Bearer ${accessToken}` };
  const navigate = useNavigate();

  useEffect(() => {
    if (matchingId) {
      socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
      ws = Stomp.over(socket);
      ws.connect(headers, (frame: any) => {
        console.log('소켓연결', frame);
        subscribe(matchingId);
      });
    }
  }, [matchingId]);

  function subscribe(matchingId: string) {
    console.log('matching id : 구 독');
    console.log(matchingId);
    ws.subscribe(`/sub/${matchingId}`, (event: any) => {
      const received = JSON.parse(event.body);
      console.log('응답받은 데이터 >>>>>');
      console.log(received);

      if (received.gameRoom.roomId) {
        roomId = received.gameRoom.roomId;

        ws.disconnect();
        navigate(`/game/${roomId}`);
      }
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
    const dicesElement1 = document.querySelectorAll('.dice');
    const dicesElement2 = document.querySelectorAll('.dice2');

    dicesElement1.forEach(function (dice) {
      dice.classList.remove('active');
      animateDice(dice1, dice);
    });

    dicesElement2.forEach(function (dice) {
      dice.classList.remove('active');
      animateDice(dice2, dice);
    });
  }

  function animateDice(randomNumber: number, dice: any) {
    if (dice.id === `dice-${randomNumber}`) {
      setTimeout(function () {
        dice.classList.add('active');
      });
    }
  }

  const [timecount, setTimecount] = useState<number>(0);
  const [startTime, setStartTime] = useState<boolean>(true);
  const [timerOut, setTimerOut] = useState<boolean>(false);

  // 첫 시작때만 시간 셋팅
  if (startTime) {
    getRandom();
    setStartTime(false);
  }

  function getRandom() {
    setTimecount(Math.floor(Math.random() * (90 - 30) + 30));
  }

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTimecount((prevTime) => {
        const newTime = prevTime - 1;
        return newTime;
      });
    }, 1000);

    // Cleanup function to clear the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover bg">
        <div className='flex flex-col items-center justify-center h-[700px] mt-[-100px]'>
          <img
            className='w-[200px] object-cover top-[-300px]'
            src={pathLC}
            alt='WORLDY GAME'
          />
          <div className='h-[50px] flex flex-col items-center justify-center mt-[30px]'>
            {timecount >= 0 ? (
              <div className='font-PtdSemiBOld text-[40px] text-white'>
                대전 상대를 찾는 중 입니다.
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center'>
                <div className='font-PtdSemiBOld text-[35px] text-white'>
                  대전 상대가 부족합니다.
                </div>
                <div className='font-PtdSemiBOld text-[35px] mt-[10px] text-white'>
                  잠시만 기다려주세요.
                </div>
              </div>
            )}
          </div>
          {timecount >= 0 ? (
            <div className='text-white mt-[40px] font-PtdLight text-[20px]'>
              예상 대기 시간
            </div>
          ) : (
            <div className='text-white mt-[40px] font-PtdLight text-[20px]'>
              예상 대기 시간 초과
            </div>
          )}

          <img
            className='mt-[10px] w-[150px] object-cover'
            src={'/game/loading.gif'}
            alt='WORLDY GAME'
          />
          <div className='text-white relative top-[-90px] font-PtdLight text-[25px]'>
            {timecount}초
          </div>
          <button
            className='flex flex-col justify-center items-center w-[180px] h-[70px] mt-[150px] bg-white/50 hover:bg-[#FA5B54] 
              font-PtdSemiBOld text-[22px] rounded-[6px] text-white'
            onClick={() => {
              Swal.fire({
                title: '게임 매칭을 취소하시겠습니까?',
                icon: 'warning',
                iconColor: '#FA5B54',
                showCancelButton: true,
                confirmButtonColor: '#FA5B54',
                cancelButtonColor: '#999999',
                confirmButtonText: 'YES',
                cancelButtonText: 'NO',
              }).then((result: any) => {
                if (result.isConfirmed) {
                  ws.disconnect();
                  navigate('/');
                }
              });
            }}
          >
            매칭 취소
          </button>
        </div>
      </div>
    </>
  );
}

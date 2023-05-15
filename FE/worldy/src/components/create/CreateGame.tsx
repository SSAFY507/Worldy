import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useState } from 'react';
import axios from 'axios';


export default function CreateGame(props: any) {


  const setMatchingId = props.setMatchingId
  const setMode = props.setMode;
  const setRoomId = props.setRoomId;
  let accessToken = sessionStorage.getItem('token');

  return (<>
    <div className='w-full h-full bg-white flex flex-col justify-center items-center'>
      <h1>게임 만들기</h1>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
        console.log('매칭 api 호출');
        console.log('매칭 페이지 인터페이스 변경');
        setMode(1)
        axios.get("https://k8a507.p.ssafy.io/api/game/matching", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data);
            setMatchingId(response.data.roomId);
            console.log(response.data.roomId);
          });



      }}>랜덤 매칭</button>
      <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

        axios.get("https://k8a507.p.ssafy.io/api/game/with/friend", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            // console.log(response.data.roomId);
            setRoomId(response.data.roomId);
          });

        setMode(2);
      }}>친구와 함께하기</button>

    </div>
  </>
  )
}


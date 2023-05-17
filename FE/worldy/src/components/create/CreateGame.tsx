import React from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useState } from "react";
import axios from "axios";
import pathLC from '../../assets/images/LogoColored.png';

export default function CreateGame(props: any) {
  const setMatchingId = props.setMatchingId;
  const setMode = props.setMode;
  const setRoomId = props.setRoomId;

  const accessToken = sessionStorage.getItem("token");


  const [hoverTempState, setHoverTempState] = useState<boolean>(false)
  const hoverTemp = (input:boolean)=>{
    setHoverTempState(input)
  }

  const [hoverTempState2, setHoverTempState2] = useState<boolean>(false)
  const hoverTemp2 = (input:boolean)=>{
    setHoverTempState2(input)
  }
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg.png')] bg-cover">     
        <div className="flex flex-col items-center h-[700px]" >
        <img
          className='w-[400px] object-cover'
          src={pathLC}
          alt='WORLDY GAME'
        />
        <div className="w-[700px] flex flex-row justify-between items-center">
          <div className="w-[400px] h-[450px]  flex justify-center items-center">
            <button 
              className="flex flex-col items-center w-[304px] hover:w-[325px] h-[403px] hover:h-[425px] mt-[40px] bg-white hover:bg-[#FC851F] 
              hover:text-white font-PtdExtraBold text-[35px] rounded-[20px] hover:outline outline-[4px]"
              // id="shbutton"
              onClick={() => {
                setMode(1);
                axios
                  .get("https://k8a507.p.ssafy.io/api/game/matching", {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                    setMatchingId(response.data.roomId);
                    console.log(response.data.roomId);
                  });
              }}
              onMouseEnter={()=>{hoverTemp(true)}}
              onMouseLeave={()=>{hoverTemp(false)}}
            >
              <div className="mt-[39px] mb-[5px]">랜덤</div>
              <div className="mb-[30px]">매칭</div>
              <img
                className='w-[50px] object-cover mt-[20px]'
                src={hoverTempState? '/game/click_random.png' : '/game/random.png'}
                alt='WORLDY GAME'
              />
              <div className="text-[20px] mt-[40px] font-PtdLight">
                <div className=" border-[1px] border-[#E3E3E3] border-solid"></div>
                <div className="mb-[5px] mt-[30px]">랜덤으로 만난 유저들과</div>
                <div>월드게임을 즐겨보세요.</div>
              </div>
            </button>
          </div>
          <div className="w-[400px] h-[450px] flex justify-center items-center">
            <button 
              className="flex flex-col items-center w-[304px] hover:w-[325px] h-[403px] hover:h-[425px] mt-[40px] bg-white hover:bg-[#FA5B54] 
              hover:text-white font-PtdExtraBold text-[35px] rounded-[20px] hover:outline outline-[4px]"
              // id="shbutton"
              onClick={() => {
                axios
                  .get("https://k8a507.p.ssafy.io/api/game/with/friend", {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  })
                  .then((response) => {
                    // console.log(response.data.roomId);
                    setRoomId(response.data.roomId);
                  });

                setMode(2);
              }}
              onMouseEnter={()=>{hoverTemp2(true)}}
              onMouseLeave={()=>{hoverTemp2(false)}}
            >
              <div className="mt-[39px] mb-[5px]">친구와</div>
              <div className="mb-[30px]">함께하기</div>
              <img
                className='w-[50px] object-cover mt-[20px]'
                src={hoverTempState2? '/game/click_friend.png' : '/game/friend.png'}
                alt='WORLDY GAME'
              />
              <div className="text-[20px] mt-[40px] font-PtdLight">
                <div className=" border-[1px] border-[#E3E3E3] border-solid"></div>
                <div className="mb-[5px] mt-[30px]">지금 월드게임에서</div>
                <div>친구들과 함께하세요.</div>
              </div>
            </button>
          </div>

        </div>
        </div>
      </div>
    </>
  );
}

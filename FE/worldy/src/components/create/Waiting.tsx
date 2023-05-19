import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import pathLC from '../../assets/images/LogoColored.png';
import { useState } from "react";

export default function Waiting(props: any) {

  const navigate = useNavigate();

  const roomId = props.roomId;
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzc3NTAxMX0.FGXDtMPT4TZdwoUDUc98lZNlYI7d4MK2YYu63b7nvQiJdzY2zItjIgmOAsM5_Y4hKIPv2eU5o9gOwdbgyRc8uQ  '

  
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
              className="flex flex-col shadow-lg items-center w-[304px] hover:w-[325px] h-[403px] hover:h-[425px] mt-[40px] bg-white hover:bg-[#FC851F] 
                    hover:text-white font-PtdExtraBold text-[35px] rounded-[20px] hover:outline outline-[4px]"
              // id="shbutton"
              onClick={() => {
                (window as any).Kakao.Share.sendCustom({
                 templateId: 93476,
                 templateArgs: {
                 key: roomId
                 },
                });
               
              }}
              onMouseEnter={()=>{hoverTemp(true)}}
              onMouseLeave={()=>{hoverTemp(false)}}
            >
              <div className="mt-[39px] mb-[5px]">카카오톡</div>
              <div className="mb-[30px]">공유하기</div>
              <img
                className='w-[50px] object-cover  mt-[20px]'
                src={hoverTempState? '/game/click_kakaoshare.png' : '/game/kakaoshare.png'}
                alt='WORLDY GAME'
              />

              <div className="text-[17px] mt-[40px] font-PtdLight">
                <div className=" border-[1px] border-[#E3E3E3] border-solid"></div>
                <div className="mb-[5px] mt-[30px]">친구들에게 공유하여 함께 즐기세요.</div>
                <div>최대 4명까지 플레이하실 수 있습니다.</div>
              </div>
            </button>
          </div>
          <div className="w-[400px] h-[450px] flex justify-center items-center">
            <button 
              className="flex flex-col items-center w-[304px] hover:w-[325px] h-[403px] hover:h-[425px] mt-[40px] bg-white hover:bg-[#FA5B54] 
                    hover:text-white font-PtdExtraBold text-[35px] rounded-[20px] hover:outline outline-[4px]"
              // id="shbutton"
              onClick={() => {
                navigate(`/game/${roomId}`);
              }}
              onMouseEnter={()=>{hoverTemp2(true)}}
              onMouseLeave={()=>{hoverTemp2(false)}}
            >
              <div className="mt-[39px] mb-[5px]">월드게임</div>
              <div className="mb-[30px]">입장하기</div>
              <img
                className='w-[110px] object-cover mt-[20px]'
                src={hoverTempState2? '/game/click_enter.png' : '/game/enter2.png'}
                alt='WORLDY GAME'
              />
              <div className="text-[17px] mt-[40px] font-PtdLight">
                <div className=" border-[1px] border-[#E3E3E3] border-solid"></div>
                <div className="mb-[5px] mt-[30px]">친구 초대를 완료했다면</div>
                <div>지금 바로 월드게임으로 입장하세요!</div>
              </div>
            </button>
          </div>

        </div>
        </div>
      </div>
    </>
  )
}

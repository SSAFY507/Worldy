import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Waiting(props: any) {

  const navigate = useNavigate();

  const roomId = props.roomId;;
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzc3NTAxMX0.FGXDtMPT4TZdwoUDUc98lZNlYI7d4MK2YYu63b7nvQiJdzY2zItjIgmOAsM5_Y4hKIPv2eU5o9gOwdbgyRc8uQ  '

  return (<div className='w-full h-full flex flex-col justify-center items-center'>
    <div>친구와 대기중</div>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {

      (window as any).Kakao.Share.sendCustom({
        templateId: 93476,
        templateArgs: {
          key: roomId
        },
      });


    }}>카카오톡 공유하기</button>
    <button className='w-[200px] h-[70px] mt-[40px]' id='shbutton' onClick={() => {
      navigate(`/game/${roomId}`)
    }}>방 입장하기</button>

  </div>
  )
}

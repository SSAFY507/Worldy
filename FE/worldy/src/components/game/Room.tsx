import React, { useState } from 'react'



export default function Room(props: any) {
  
  const p1 = props.p[0];
  const p2 = props.p[1];
  const p3 = props.p[2];
  const p4 = props.p[3];
  const setP1 = props.setP[0];
  const setP2 = props.setP[1];
  const setP3 = props.setP[2];
  const setP4 = props.setP[3];

  return (<>
    <div className='w-full h-full bg-white flex flex justify-center items-center'>
      {/* 왼쪽영역 */}
      <div className='w-[44%] h-full bg-red-200 flex flex-col justify-around items-end'>
        <div className='w-[440px] h-[1300px] mb-[70px] outline outline-2 flex flex-col justify-around items-center'>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>  
          </div>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>  
          </div>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>  
          </div>
        </div>
      </div>

      {/* 가운데 영역 */}
      <div className='w-full h-full bg-green-200 flex justify-center items-center'>
        <div className='w-[1300px] h-[1300px] rounded-[10px] outline outline-2 mb-[80px]'></div>  
      </div>
      
      
      {/* 오른쪽 영역 */}
      <div className='w-[44%] h-full bg-red-200 flex flex-col justify-around items-start'>
      <div className='w-[440px] h-[1300px] mb-[70px] outline outline-2 flex flex-col justify-around items-center'>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>  
          </div>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>  
          </div>
          <div className='w-[400px] h-[400px] bg-blue-300 rounded-[8px]'>
            <div></div>
          </div>
        </div>
      </div>
      



      {/* <div>{p1.name}</div>
      <div onClick={()=> {
        console.log('클릭');
        setP1((prevState:any) => ({
          ...prevState,
          name: '김성훈',
          game: {
            ...prevState.game,
            location: 2,
            desert: 3,
          }
        }))
      }}>데이터수정</div> 
       */}
      
      
      
      
      


    </div>
  </>
  )
}


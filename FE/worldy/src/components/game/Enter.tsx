import * as React from 'react';
import { useState, useEffect } from 'react';

import { SiPowerapps } from 'react-icons/si';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

export default function Enter(props : any ) {

  const Swal = require('sweetalert2');

  const user1Check = props.user1Check;
  const user2Check = props.user2Check;
  const user3Check = props.user3Check;
  const user4Check = props.user4Check;

  const user1 = props.user1;
  const user2 = props.user2;
  const user3 = props.user3;
  const user4 = props.user4;

  const gameWait = props.gameWait;

  const navigate = useNavigate();

  const setTierColor = (input: string): string => {
    if (input === 'Platinum') return '#86FFF8';
    else if (input === 'Gold') return '#FFEE95';
    else if (input === 'Silver') return '#E1FBFF';
    else return '#EED4BB';
  };

  const [start, setStart] = useState<boolean>(false);

  if(gameWait) {
    setTimeout(function () {
      setStart(true);
    }, 2900);
  }

  // useEffect(() => {
  //   console.log('useEffect11')
  //   if (user4Check ) {
  //     setTimecount(3)
  //   }
  // }, [user4Check]);

  // useEffect(()=>{
  //   if(user4Check){
  //     const letTimeFlow = setInterval(()=>{
  //       setTimecount((prev) => prev-1)
  //     },1000 )

      
  //     if(timecount === 0) clearInterval(letTimeFlow)
  //     return ()=> {clearInterval(letTimeFlow)}
  //   }
  // },[timecount])

  return (
    <>
      { gameWait && !start && (
      <div className=' top-[45%] left-[50%] translate-y-[-50%] translate-x-[-50%] absolute w-[250px] h-[50px] font-PtdSemiBOld text-[200px] text-[#FF4D45] z-[1]'>
        <div className='flex flex-col justify-center items-center'>
         
          <img
              className='mt-[10px] w-[1350px] object-cover'
              src={'/game/timer.gif'}
              alt='WORLDY GAME'
          />
        </div>
      </div>)}
      { start && (
      <div className=' top-[45%] left-[50%] translate-y-[-50%] translate-x-[-50%] absolute w-[550px] h-[50px] font-PtdSemiBOld text-[200px] text-[#FF4D45] z-[1]'>
        <div className='flex flex-col justify-center items-center'>
         
          <img
              className='mt-[10px] w-[1350px] object-cover'
              src={'/game/start.gif'}
              alt='WORLDY GAME'
          />
        </div>
      </div>)}
      
      <div className={`w-full h-full flex flex-col justify-center items-center bg-[url('../../public/game/game_bg2.png')] bg-cover ${gameWait ? "blur-[2px] " : "" }`}>     
      <div className='text-[35px] h-[100px] text-white font-PtdSemiBOld flex flex-col justify-center items-center'>
      { user4Check? 
      (
        <div className='flex flex-col justify-center items-center'>
          <div>플레이어 입장 완료</div>
          <div className='mt-[15px]'>GAME START!</div>
      </div>)
      :( 
        <div className='flex flex-col justify-center items-center'>
          <div>플레이어가 입장 중 입니다.</div>
          <div className='mt-[15px]'>잠시만 기다려주세요.</div>
          <img
              className='mt-[20px] w-[70px] object-cover'
              src={'/game/loading.gif'}
              alt='WORLDY GAME'
          />
        </div>)
        }
        </div>
        <div className='w-[960px] h-[610px] bg-white/50 rounded-[20px] mt-[50px]'>
          <div className='text-[40px] text-white font-PtdSemiBOld flex flex-col justify-center items-center mt-[75px]'>
            <div className='flex flex-row justify-between items-center w-[800px] '>
            { user1Check? 
                  (
                  <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>
                  <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row font-PtdLight w-[280px] justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div>플레이어</div>
                    <div>{user1.tier}</div>
                  </div>
                  <div className='flex flex-row w-[370px] mt-[5px] items-center text-[15px] text-black text-[32px]'>
                    <img
                        className='ml-[42px] h-[50px] w-[50px] object-cover rounded-full'
                        src={user1.profileImg}
                        alt='Profile'
                    />
                    <div className='ml-[20px] w-[150px] truncate'>{user1.nickName}</div>
                  <SiPowerapps
                    size={32}
                    color={setTierColor(user1.tier)}
                    className='ml-[25px]'
                  />
                  </div>
                  <div className=" border-[1px] w-[300px] border-[#E3E3E3] border-solid mt-[15px]"></div>
                  <div className='flex flex-row w-[280px] mt-[10px] font-PtdLight justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div className='ml-[10px]'>MMR</div>
                    <div className=''>현재 레벨</div>
                  </div>
                  <div className='flex flex-row w-[280px] mt-[10px] justify-between items-center text-black text-[25px]'>    
                    <div className=''>{user1.mmr}<span className='text-[15px]'>점</span></div>
                    <div className=''>{user1.level}<span className='text-[15px]'>LV</span></div>
                  </div>
                  </div>
                  </div>
                  )
                  :
                  (
                    <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF]/60 rounded-[11px]'>
                    <div className='flex flex-col justify-center items-center text-[30px] text-[#626060]'>
                      <div className='font-PtdExtraBold'>플레이어 1</div>
                      <div className='font-PtdSemiBOld mt-[20px] text-[20px]'>접속 대기 중 ...</div>
                    </div>
                    </div>
                  )
              }

              { user2Check? 
                  (
                  <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>
                  <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row font-PtdLight w-[280px] justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div>플레이어</div>
                    <div>{user2.tier}</div>
                  </div>
                  <div className='flex flex-row w-[370px] mt-[5px] items-center text-[15px] text-black text-[32px]'>
                    <img
                        className='ml-[42px] h-[50px] w-[50px] object-cover rounded-full'
                        src={user2.profileImg}
                        alt='Profile'
                    />
                    <div className='ml-[20px] w-[150px] truncate'>{user2.nickName}</div>
                  <SiPowerapps
                    size={32}
                    color={setTierColor(user2.tier)}
                    className='ml-[25px]'
                  />
                  </div>
                  <div className=" border-[1px] w-[300px] border-[#E3E3E3] border-solid mt-[15px]"></div>
                  <div className='flex flex-row w-[280px] mt-[10px] font-PtdLight justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div className='ml-[10px]'>MMR</div>
                    <div className=''>현재 레벨</div>
                  </div>
                  <div className='flex flex-row w-[280px] mt-[10px] justify-between items-center text-black text-[25px]'>    
                    <div className=''>{user2.mmr}<span className='text-[15px]'>점</span></div>
                    <div className=''>{user2.level}<span className='text-[15px]'>LV</span></div>
                  </div>
                  </div>
                  </div>
                  )
                  :
                  (
                    <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF]/60 rounded-[11px]'>
                    <div className='flex flex-col justify-center items-center text-[30px] text-[#626060]'>
                      <div className='font-PtdExtraBold'>플레이어 2</div>
                      <div className='font-PtdSemiBOld mt-[20px] text-[20px]'>접속 대기 중 ...</div>
                    </div>
                    </div>
                  )
              }
            </div>
            <div className='flex flex-row justify-between items-center w-[800px] mt-[60px] '>
            { user3Check? 
                  (
                  <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>
                  <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row font-PtdLight w-[280px] justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div>플레이어</div>
                    <div>{user3.tier}</div>
                  </div>
                  <div className='flex flex-row w-[370px] mt-[5px] items-center text-[15px] text-black text-[32px]'>
                    <img
                        className='ml-[42px] h-[50px] w-[50px] object-cover rounded-full'
                        src={user3.profileImg}
                        alt='Profile'
                    />
                    <div className='ml-[20px] w-[150px] truncate'>{user3.nickName}</div>
                  <SiPowerapps
                    size={32}
                    color={setTierColor(user3.tier)}
                    className='ml-[25px]'
                  />
                  </div>
                  <div className=" border-[1px] w-[300px] border-[#E3E3E3] border-solid mt-[15px]"></div>
                  <div className='flex flex-row w-[280px] mt-[10px] font-PtdLight justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div className='ml-[10px]'>MMR</div>
                    <div className=''>현재 레벨</div>
                  </div>
                  <div className='flex flex-row w-[280px] mt-[10px] justify-between items-center text-black text-[25px]'>    
                    <div className=''>{user3.mmr}<span className='text-[15px]'>점</span></div>
                    <div className=''>{user3.level}<span className='text-[15px]'>LV</span></div>
                  </div>
                  </div>
                  </div>
                  )
                  :
                  (
                    <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF]/60 rounded-[11px]'>
                    <div className='flex flex-col justify-center items-center text-[30px] text-[#626060]'>
                      <div className='font-PtdExtraBold'>플레이어 3</div>
                      <div className='font-PtdSemiBOld mt-[20px] text-[20px]'>접속 대기 중 ...</div>
                    </div>
                    </div>
                  )
              }
             
              { user4Check? 
                  (
                  <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF] rounded-[11px]'>
                  <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row font-PtdLight w-[280px] justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div>플레이어</div>
                    <div>{user4.tier}</div>
                  </div>
                  <div className='flex flex-row w-[370px] mt-[5px] items-center text-[20px] text-black text-[32px]'>
                    <img
                        className='ml-[42px] h-[50px] w-[50px] object-cover rounded-full'
                        src={user4.profileImg}
                        alt='Profile'
                    />
                  <div className='ml-[20px] w-[150px] truncate'>{user4.nickName}</div>
                  <SiPowerapps
                    size={32}
                    color={setTierColor(user4.tier)}
                    className='ml-[25px]'
                  />
                  </div>
                  <div className=" border-[1px] w-[300px] border-[#E3E3E3] border-solid mt-[15px]"></div>
                  <div className='flex flex-row w-[280px] mt-[10px] font-PtdLight justify-between items-center text-[10px] text-[#8D8989] text-[15px]'>
                    <div className='ml-[10px]'>MMR</div>
                    <div className=''>현재 레벨</div>
                  </div>
                  <div className='flex flex-row w-[280px] mt-[10px] justify-between items-center text-black text-[25px]'>    
                    <div className=''>{user4.mmr}<span className='text-[15px]'>점</span></div>
                    <div className=''>{user4.level}<span className='text-[15px]'>LV</span></div>
                  </div>
                  </div>
                  </div>
                  )
                  :
                  (
                    <div className='flex flex-col justify-center items-center w-[370px] h-[200px] bg-[#FFFFFF]/60 rounded-[11px]'>
                    <div className='flex flex-col justify-center items-center text-[30px] text-[#626060]'>
                      <div className='font-PtdExtraBold'>플레이어 4</div>
                      <div className='font-PtdSemiBOld mt-[20px] text-[20px]'>접속 대기 중 ...</div>
                    </div>
                    </div>
                  )
              }
              
            </div>
          </div>
          <div className='flex justify-center items-center'>
          <button
            className='flex flex-col justify-center items-center w-[180px] h-[70px] mt-[110px] bg-white/50 hover:bg-[#FA5B54] 
              font-PtdSemiBOld text-[22px] rounded-[6px] text-white'
            onClick={() => {
              Swal.fire({
                title: '게임을 취소하시겠습니까?',
                icon: 'warning',
                iconColor: '#FA5B54',
                showCancelButton: true,
                confirmButtonColor: '#FA5B54',
                cancelButtonColor: '#999999',
                confirmButtonText: 'YES',
                cancelButtonText: 'NO',
              }).then((result: any) => {
                if (result.isConfirmed) {
                  // ws.disconnect();
                  navigate('/create');
                }
              });
            }}
          >
            게임 취소
          </button>
          </div>
        </div>
      </div>
    </>
  );
}

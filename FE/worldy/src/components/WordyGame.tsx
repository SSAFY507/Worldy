import { sign } from 'crypto';
import React from 'react';
import { useState } from 'react';





type Price = {
  land : number,
  villa? : number,
  hotel? : number,
  landmark? : number,
}


type Spot = {
  location : number,
  name : string,
  price? : Price,
  type : string,
  landmark? : string,
  contents : string,
  continent? : string,
}


type Game = {
  location : number,
  balance : number,
  desert : number,
  state : boolean,
  dice1 : number,
  dice2 : number,
  dice : number,
  double : boolean,
  own? : number[]
  lap : number,
  ranking : number,
}

type Player = {
  pId : string,
  pNum : number,
  name : string,
  game : Game,
}

const worldMap:Spot[] = [
  {
    location : 0,
    name : '시작',
    type : 'start',
    contents : '시작점 입니다. 월급을 받으세요. + 300,000',
  },
  {
    location : 1,
    name : '필리핀',
    price : {
      land : 50,
      villa : 20,
      hotel : 50,
      landmark : 100,
    },
    type : 'nation',
    landmark : '마닐라 대성당',
    contents : '필리핀의 수도는 마닐라. 어쩌구 저쩌구',
    continent : '아시아',
  },
  {
    location : 2,
    name : '태국',
    price : {
      land : 50,
      villa : 20,
      hotel : 50,
      landmark : 100,
    },
    type : 'nation',
    landmark : '카오산 로드',
    contents : '태국의 수도는 방콕. 어쩌구 저쩌구',
    continent : '아시아',
  },
  {
    location : 3,
    name : '보물상자',
    type : 'item',
    contents : '보물상자를 발견했습니다.',
  },
  {
    location : 4,
    name : '싱가폴',
    price : {
      land : 80,
      villa : 50,
      hotel : 70,
      landmark : 120,
    },
    type : 'nation',
    landmark : '싱가폴 무역센터',
    contents : '싱가폴의 수도는 싱가폴 도시 국가이다.',
    continent : '아시아',
  },
  {
    location : 5,
    name : '인도',
    price : {
      land : 80,
      villa : 50,
      hotel : 70,
      landmark : 120,
    },
    type : 'nation',
    landmark : '타지마할',
    contents : '인도의 수도는 뉴델리. 세상에서 가장 많은 인구를 보유하고있다.',
    continent : '아시아',
  },
  {
    location : 6,
    name : '사우디',
    price : {
      land : 90,
      villa : 70,
      hotel : 100,
      landmark : 130,
    },
    type : 'nation',
    landmark : '사우디 이슬람 모스크',
    contents : '사우디 아라비아는 석유가 많이 난다. 저쩌구',
    continent : '아시아',
  },
  {
    location : 7,
    name : '중국',
    price : {
      land : 100,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '만리장성',
    contents : '중국의 수도는 베이징. 어쩌구 저쩌구',
    continent : '아시아',
  },
  {
    location : 8,
    name : '일본',
    price : {
      land : 100,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '후지산',
    contents : '일본의 수도는 후지산. 어쩌구 저쩌구',
    continent : '아시아',
  },
  {
    location : 9,
    name : '대한민국',
    price : {
      land : 100,
      villa : 100,
      hotel : 130,
      landmark : 170,
    },
    type : 'nation',
    landmark : '경복궁',
    contents : '한국의 수도는 서울. BTS, 봉준호, 손흥민, Jay Park',
    continent : '아시아',
  },
  {
    location : 10,
    name : '무인도',
    type : 'desert',
    contents : '무인도에 불시착했습니다. 3턴 쉬세요.',
  },
  {
    location : 11,
    name : '헝가리',
    price : {
      land : 70,
      villa : 50,
      hotel : 80,
      landmark : 100,
    },
    type : 'nation',
    landmark : '헝가리 모스크',
    contents : '헝가리 수도는 부다페스트. 큰 도시',
    continent : '유럽',
  },
  {
    location : 12,
    name : '덴마크',
    price : {
      land : 80,
      villa : 80,
      hotel : 100,
      landmark : 130,
    },
    type : 'nation',
    landmark : '덴마크 레고랜드',
    contents : '덴마크는 우유의 나라,어쩌구 저쩌구',
    continent : '유럽',
  },
  {
    location : 13,
    name : '보물상자',
    type : 'item',
    contents : '보물상자를 발견했습니다.',
  },
  {
    location : 14,
    name : '스페인',
    price : {
      land : 80,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '가우디 대성당',
    contents : '스페인의 수도는 마드리드. 축구는 바르셀로나',
    continent : '유럽',
  },
  {
    location : 15,
    name : '이탈리아',
    price : {
      land : 80,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '바티칸 대성당',
    contents : '이탈리아의 수도는 로마. 로마에 가면 로마의 법을 따르라',
    continent : '유럽',
  },
  {
    location : 16,
    name : '스위스',
    price : {
      land : 100,
      villa : 100,
      hotel : 130,
      landmark : 170,
    },
    type : 'nation',
    landmark : '알프스 산맥',
    contents : '스위스의 수도는 베른. 스위스는 중립국',
    continent : '유럽',
  },
  {
    location : 17,
    name : '독일',
    price : {
      land : 100,
      villa : 100,
      hotel : 130,
      landmark : 170,
    },
    type : 'nation',
    landmark : '베를린 장벽',
    contents : '독일의 수도는 베를린. 벤츠의 나라',
    continent : '유럽',
  },
  {
    location : 18,
    name : '프랑스',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 200,
    },
    type : 'nation',
    landmark : '에펠탑',
    contents : '프랑스의 수도는 파리. 낭만의 도시',
    continent : '유럽',
  },
  {
    location : 19,
    name : '영국',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 200,
    },
    type : 'nation',
    landmark : '빅반',
    contents : '영국의 수도는 런던. 태양이 지지 않는 나라',
    continent : '유럽',
  },
  {
    location : 20,
    name : '정거장',
    type : 'port',
    contents : '특가 항공권 당첨! 원하는 곳으로 이동합니다.',
  },
  {
    location : 21,
    name : '가나',
    price : {
      land : 50,
      villa : 50,
      hotel : 70,
      landmark : 100,
    },
    type : 'nation',
    landmark : '가나 초콜릿',
    contents : '가나는 초콜릿이 유명하다.',
    continent : '아프리카',
  },
  {
    location : 22,
    name : '소말리아',
    price : {
      land : 50,
      villa : 50,
      hotel : 70,
      landmark : 100,
    },
    type : 'nation',
    landmark : '소말리아 모스크',
    contents : '소말리아 수도는 리비아. 해적을 조심하라',
    continent : '아프리카',
  },
  {
    location : 23,
    name : '보물상자',
    type : 'item',
    contents : '보물상자를 발견했습니다.',
  },
  {
    location : 24,
    name : '모르코',
    price : {
      land : 80,
      villa : 80,
      hotel : 100,
      landmark : 130,
    },
    type : 'nation',
    landmark : '모르코 모스코',
    contents : '모르코의 수도는 모르코. 좋은 나라입니다',
    continent : '아프리카&오세아니아',
  },
  {
    location : 25,
    name : '남아공',
    price : {
      land : 80,
      villa : 80,
      hotel : 100,
      landmark : 130,
    },
    type : 'nation',
    landmark : '남아공 월드컵 경기장',
    contents : '남아공의 수도는 키예프. 어쩌구 저쩌구',
    continent : '아프리카&오세아니아',
  },
  {
    location : 26,
    name : '리비아',
    price : {
      land : 80,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '리비아 대성당',
    contents : '리비아의 수도는 리비아. 리비아에 가면 리비아의 법을 따르라',
    continent : '아프리카&오세아니아',
  },
  {
    location : 27,
    name : '이집트',
    price : {
      land : 100,
      villa : 100,
      hotel : 140,
      landmark : 170,
    },
    type : 'nation',
    landmark : '쿠푸왕의 대피라미드',
    contents : '이집트의 수도는 카이로. 이집트는 문명의 시작',
    continent : '아프리카&오세아니아',
  },
  {
    location : 28,
    name : '호주',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 180,
    },
    type : 'nation',
    landmark : '오페라 하우스',
    contents : '호주의 수도는 어디일까요',
    continent : '아프리카&오세아니아',
  },
  {
    location : 29,
    name : '뉴질랜드',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 180,
    },
    type : 'nation',
    landmark : '빌헬름 협곡',
    contents : '뉴질랜드의 수도는 키위. 로마에 가면 로마의 법을 따르라',
    continent : '아프리카&오세아니아',
  },
  {
    location : 30,
    name : '올림픽',
    type : 'olympic',
    contents : '하나된 세계 올림픽으로!',
  },
  {
    location : 31,
    name : '칠레',
    price : {
      land : 80,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '칠레 대성당',
    contents : '세상에서 가장 긴 나라 칠레',
    continent : '아메리카',
  },
  {
    location : 32,
    name : '페루',
    price : {
      land : 80,
      villa : 80,
      hotel : 120,
      landmark : 150,
    },
    type : 'nation',
    landmark : '마추픽추',
    contents : '잉카 문명의 고대 제국 페루',
    continent : '아메리카',
  },
  {
    location : 33,
    name : '보물상자',
    type : 'item',
    contents : '보물상자를 발견했습니다.',
  },
  {
    location : 34,
    name : '브라질',
    price : {
      land : 100,
      villa : 100,
      hotel : 140,
      landmark : 180,
    },
    type : 'nation',
    landmark : '리우데자네이루 거대 예수상',
    contents : '삼바의 나라 브라질',
    continent : '아메리카',
  },
  {
    location : 35,
    name : '아르헨티나',
    price : {
      land : 100,
      villa : 100,
      hotel : 140,
      landmark : 180,
    },
    type : 'nation',
    landmark : '바티칸 대성당',
    contents : '아르헨티나의 수도는 부에노스아이레스. 리오넬 메시',
    continent : '아메리카',
  },
  {
    location : 36,
    name : '멕시코',
    price : {
      land : 100,
      villa : 100,
      hotel : 150,
      landmark : 180,
    },
    type : 'nation',
    landmark : '차첸이트사',
    contents : '멕시코의 수도는 멕시코시티. 로마에 가면 로마의 법을 따르라',
    continent : '유럽',
  },
  {
    location : 37,
    name : '국세청',
    type : 'tax',
    contents : '탈세는 위법입니다. 가진 재산의 10%를 세금으로 납부하세요',
  },
  {
    location : 38,
    name : '캐나다',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 200,
    },
    type : 'nation',
    landmark : '캐나다 대성당',
    contents : '캐나다의 수도는 오타와',
    continent : '아메리카',
  },
  {
    location : 39,
    name : '미국',
    price : {
      land : 120,
      villa : 120,
      hotel : 150,
      landmark : 200,
    },
    type : 'nation',
    landmark : '자유의 여신상',
    contents : '미국의 수도는 워싱턴D.C 자유의 나라',
    continent : '아메리카',
  },
]





export default function WordyGame() {
  
  const [ p1, setP1 ] = useState<Player>({
    pId : '1',
    pNum : 1,
    name : '성훈',
    game : {
      location : 0,
      balance : 500,
      desert : 0,
      state : true,
      dice1 : 0,
      dice2 : 0,
      dice : 0,
      double : false,
      own : [],
      lap : 0,
      ranking : 0,
    },
  })

  const [ p2, setP2 ] = useState<Player>({
    pId : '2',
    pNum : 2,
    name : '한빈',
    game : {
      location : 0,
      balance : 500,
      desert : 0,
      state : false,
      dice1 : 0,
      dice2 : 0,
      dice : 0,
      double : false,
      own : [],
      lap : 0,
      ranking : 0,
    },
  })

  const [ p3, setP3 ] = useState<Player>({
    pId : '3',
    pNum : 3,
    name : '정훈',
    game : {
      location : 0,
      balance : 500,
      desert : 0,
      state : false,
      dice1 : 0,
      dice2 : 0,
      dice : 0,
      double : false,
      own : [],
      lap : 0,
      ranking : 0,
    },
  })

  const [ p4, setP4 ] = useState<Player>({
    pId : '4',
    pNum : 4,
    name : '원규',
    game : {
      location : 0,
      balance : 500,
      desert : 0,
      state : false,
      dice1 : 0,
      dice2 : 0,
      dice : 0,
      double : false,
      own : [],
      lap : 0,
      ranking : 0,
    },
  })
  
  let lst = [p1, p2, p3, p4]

  let [cnt, setCnt ] = useState(0);
  let [dice1, setDice1] = useState(0);
  let [dice2, setDice2] = useState(0);
  let [dice, setDice] = useState(0);
  let [double, setDouble] = useState(false);
  let [turn, setTurn] = useState(1);

  // 플레이어 1회 턴 함수

  const playerTurn = async(turn: number) => {
    await getDice();
    
    if(turn === 1) {

      // 변경된 값 세팅
      setP1((prevState) => {
        alert('dice : ' + dice + 'lst : ' + lst )
        return {
          ...prevState,
          game : {
            location : setLocation(p1.game.location, dice),
            balance : 500,
            desert : 0,
            state : false,
            dice1 : dice1,
            dice2 : dice2,
            dice : dice,
            double : double,
            own : [],
            lap : 0,
            ranking : 0,
          },
        }
      })
    } else if(turn === 2) {

      // 변경된 값 세팅
      setP2((prevState) => {
        return {
          ...prevState,
          game : {
            location : setLocation(p2.game.location, dice1+dice2),
            balance : 500,
            desert : 0,
            state : false,
            dice1 : dice1,
            dice2 : dice2,
            dice : dice1+dice2,
            double : double,
            own : [],
            lap : 0,
            ranking : 0,
          },
        }
      })
    } else if(turn === 3) {

      // 변경된 값 세팅
      setP3((prevState) => {
        return {
          ...prevState,
          game : {
            location : setLocation(p3.game.location, dice1+dice2),
            balance : 500,
            desert : 0,
            state : false,
            dice1 : dice1,
            dice2 : dice2,
            dice : dice1+dice2,
            double : double,
            own : [],
            lap : 0,
            ranking : 0,
          },
        }
      })
    } else if(turn === 4) {

      // 변경된 값 세팅
      setP4((prevState) => {
        return {
          ...prevState,
          game : {
            location : setLocation(p4.game.location, dice1+dice2),
            balance : 500,
            desert : 0,
            state : false,
            dice1 : dice1,
            dice2 : dice2,
            dice : dice1+dice2,
            double : double,
            own : [],
            lap : 0,
            ranking : 0,
          },
        }
      })
    }

    // 더블아니면 turn 증가
    if(!double) {
      setTurn((turn+1)%4)
    } 
  }

  // 주사위 굴리는 함수
  const getDice = async () => {
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    let dice = dice1 + dice2
    if(dice1 === dice2) {
      setDouble(true);
    } else {
      setDouble(false);
    }
    await setDice1(dice1);
    await setDice2(dice2);
    await setDice(dice);
  };

  // 위치 변경 함수
  const setLocation = (location: number , dice: number) => {
    return (location + dice)%40
  }



  

  return (
    <>
      <div className='w-full bg-white flex flex-col justify-center items-center'>
        <div className='w-[900px] h-[960px] mt-[20px] bg-red-200 flex flex-col justify-center items-center'>
          <div className='w-[990px] h-[990px] bg-green-100'>
            <div className=''>
              <div className='flex relative'>
                  {worldMap.map((i, index) => {
                    return <>
                        { i.location >= 0 && i.location < 10 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-red-300 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                          <div>{i.price? i.price.land + '만원' : '특수지역'}</div>
                        </div> : null}
                        { i.location >= 0 && i.location < 10 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                        { i.location >= 0 && i.location < 10 && (i.type !== 'item' && i.type !=='nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                    </>
                  })}  
              </div>
              <div className='flex-col relative top-[-90px] left-[900px]'>
                  {worldMap.map((i, index) => {
                    return <>
                        { i.location >= 10 && i.location < 20 && i.type === 'nation'  ? <div className='w-[90px] h-[90px] bg-green-300 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                          <div>{i.price? i.price.land + '만원' : '특수지역'}</div>
                        </div> : null}
                        { i.location >= 10 && i.location < 20 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                        { i.location >= 10 && i.location < 20 && (i.type !== 'item' && i.type !=='nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                    </>
                  })}  
              </div>
              <div className='flex flex-row-reverse relative top-[-90px]'>
                  {worldMap.map((i, index) => {
                    return <>
                        { i.location >= 20 && i.location < 30 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-yellow-300 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                          <div>{i.price? i.price.land + '만원' : '특수지역'}</div>
                        </div> : null}
                        { i.location >= 20 && i.location < 30 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                        { i.location >= 20 && i.location < 30 && (i.type !== 'item' && i.type !=='nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                    </>
                  })}  
              </div>
              <div className='flex flex-col-reverse relative top-[-990px]'>
                  {worldMap.map((i, index) => {
                    return <>
                        { i.location >= 30 && i.location < 40 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-purple-300 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                          <div>{i.price? i.price.land + '만원' : '특수지역'}</div>
                        </div> : null}
                        { i.location >= 30 && i.location < 40 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                        { i.location >= 30 && i.location < 40 && (i.type !== 'item' && i.type !=='nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-center'>
                          <div>[{index}]{i.name}</div>
                        </div> : null}
                    </>
                  })}  
              </div>
            </div>
          </div>
        </div>
        <div className='w-[990px] h-[800px] bg-red-300 mt-[60px] flex flex-col items-center p-[20px]'>
          <div>==== 콘솔 영역 ====</div>

          <div className='flex p-[20px]'>
                  {
                    lst.map((i) => {
                      return <>
                        <div className='w-[200px] h-[180px] bg-gray-200 outline outline-1'>
                          <div>플레이어{i.pId}({i.name})</div>
                          <div>보유자산 : {i.game.balance}만원</div>
                          <div>현재위치 : [{i.game.location}] {worldMap[i.game.location].name}</div>
                          <div>소유국가 : [{i.game.own}]</div>
                          <div>주사위1 : {i.game.dice1}</div>
                          <div>주사위2 : {i.game.dice2}</div>
                          <div>주사위합 : {i.game.dice1 + p1.game.dice2}</div>
                          <div>더블 : {i.game.double? '더블!' : '더블아님'}</div>
                          <div>순위 : {i.game.ranking}</div>
                          <div>몇바퀴 : {i.game.lap} 바퀴 </div>
                          <div>턴 : {i.game.state? '플레이어 턴' : '차례 아님'}</div>
                        </div>
                      </>
                    })
                  }
          </div>
          <div className='flex flex-col bg-blue-200 w-[800px] justify-center items-center'>
            <div> ==== 플레이어{turn} 턴 진행결과 ==== </div>
            <div>({cnt}회차)</div>
            <div> 주사위1 : {dice1}</div>
            <div> 주사위2 : {dice2}</div>
            <div> 총합 : {dice1 + dice2}</div>
            <div> double : {double? '더블!' : '더블 아님'}</div>
            
          </div>

          <div 
            onClick={() => {
              playerTurn(turn);
             
            }}
            className='w-[200px] h-[60px] bg-yellow-300 flex justify-center items-center mt-[40px] hover:cursor-pointer'>주사위 굴리기</div>
        </div>
      </div>
    </>
  )
}

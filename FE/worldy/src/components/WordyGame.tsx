import { sign } from 'crypto';
import React from 'react';
import { useState, useEffect } from 'react';






type Price = {
  land: number,
  villa?: number,
  hotel?: number,
  landmark?: number,
}


type Spot = {
  location: number,
  name: string,
  price?: Price,
  type: string,
  landmark?: string,
  contents: string,
  continent?: string,
  owner: number,
}


type Game = {
  location: number,
  balance: number,
  desert: number,
  state: boolean,
  dice1: number,
  dice2: number,
  dice: number,
  double: boolean,
  own: number[]
  lap: number,
  ranking: number,
}

type Player = {
  pId: string,
  pNum: number,
  name: string,
  game: Game,
}







export default function WordyGame() {

  const [worldMap, setWorldMap] = useState<Spot[]>([
    {
      location: 0,
      name: '시작',
      type: 'start',
      contents: '시작점 입니다. 월급을 받으세요. + 300,000',
      owner: 0,
    },
    {
      location: 1,
      name: '태국',
      price: {
        land: 50,
        villa: 20,
        hotel: 50,
        landmark: 100,
      },
      type: 'nation',
      landmark: '카오산 로드',
      contents: '태국의 수도는 방콕. 어쩌구 저쩌구',
      continent: '아시아',
      owner: 0,

    },
    {
      location: 2,
      name: '싱가포르',
      price: {
        land: 50,
        villa: 20,
        hotel: 50,
        landmark: 100,
      },
      type: 'nation',
      landmark: '싱가포르 무역센터',
      contents: '싱가포르의 수도는 싱가폴\ 도시 국가이다.',
      continent: '아시아',
      owner: 0,

    },
    {
      location: 3,
      name: '보물상자',
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
    },
    {
      location: 4,
      name: '인도',
      price: {
        land: 80,
        villa: 50,
        hotel: 70,
        landmark: 120,
      },
      type: 'nation',
      landmark: '타지마할',
      contents: '인도의 수도는 뉴델리. 세상에서 가장 많은 인구를 보유하고있다.',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 5,
      name: '특수지역',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      landmark: '랜드마크없음',
      contents: '여기는 특수지역입니다.',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 6,
      name: '사우디',
      price: {
        land: 90,
        villa: 70,
        hotel: 100,
        landmark: 130,
      },
      type: 'nation',
      landmark: '사우디 이슬람 모스크',
      contents: '사우디 아라비아는 석유가 많이 난다. 저쩌구',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 7,
      name: '중국',
      price: {
        land: 100,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '만리장성',
      contents: '중국의 수도는 베이징. 어쩌구 저쩌구',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 8,
      name: '일본',
      price: {
        land: 100,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '후지산',
      contents: '일본의 수도는 후지산. 어쩌구 저쩌구',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 9,
      name: '대한민국',
      price: {
        land: 100,
        villa: 100,
        hotel: 130,
        landmark: 170,
      },
      type: 'nation',
      landmark: '경복궁',
      contents: '한국의 수도는 서울. BTS, 봉준호, 손흥민, Jay Park',
      continent: '아시아',
      owner: 0,
    },
    {
      location: 10,
      name: '무인도',
      type: 'desert',
      contents: '무인도에 불시착했습니다. 3턴 쉬세요.',
      owner: 0,
    },
    {
      location: 11,
      name: '헝가리',
      price: {
        land: 70,
        villa: 50,
        hotel: 80,
        landmark: 100,
      },
      type: 'nation',
      landmark: '헝가리 모스크',
      contents: '헝가리 수도는 부다페스트. 큰 도시',
      continent: '유럽', owner: 0,
    },
    {
      location: 12,
      name: '스페인',
      price: {
        land: 80,
        villa: 80,
        hotel: 100,
        landmark: 130,
      },
      type: 'nation',
      landmark: '가우디 대성당',
      contents: '스페인는 열정의 나라,어쩌구 저쩌구',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 13,
      name: '보물상자',
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
    },
    {
      location: 14,
      name: '이탈리아',
      price: {
        land: 80,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '바티칸 대성당',
      contents: '이탈리아의 수도는 로마. 로마에 가면 로마의 법을 따르라',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 15,
      name: '특수지역',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      landmark: '랜드마크 없음',
      contents: '미정',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 16,
      name: '스위스',
      price: {
        land: 100,
        villa: 100,
        hotel: 130,
        landmark: 170,
      },
      type: 'nation',
      landmark: '알프스 산맥',
      contents: '스위스의 수도는 베른. 스위스는 중립국',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 17,
      name: '독일',
      price: {
        land: 100,
        villa: 100,
        hotel: 130,
        landmark: 170,
      },
      type: 'nation',
      landmark: '베를린 장벽',
      contents: '독일의 수도는 베를린. 벤츠의 나라',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 18,
      name: '프랑스',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 200,
      },
      type: 'nation',
      landmark: '에펠탑',
      contents: '프랑스의 수도는 파리. 낭만의 도시',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 19,
      name: '영국',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 200,
      },
      type: 'nation',
      landmark: '빅반',
      contents: '영국의 수도는 런던. 태양이 지지 않는 나라',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 20,
      name: '정거장',
      type: 'port',
      contents: '특가 항공권 당첨! 원하는 곳으로 이동합니다.',
      owner: 0,
    },
    {
      location: 21,
      name: '가나',
      price: {
        land: 50,
        villa: 50,
        hotel: 70,
        landmark: 100,
      },
      type: 'nation',
      landmark: '가나 초콜릿',
      contents: '가나는 초콜릿이 유명하다.',
      continent: '아프리카', owner: 0,
    },
    {
      location: 22,
      name: '소말리아',
      price: {
        land: 50,
        villa: 50,
        hotel: 70,
        landmark: 100,
      },
      type: 'nation',
      landmark: '소말리아 모스크',
      contents: '소말리아 수도는 리비아. 해적을 조심하라',
      continent: '아프리카',
      owner: 0,
    },
    {
      location: 23,
      name: '보물상자',
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
    },
    {
      location: 24,
      name: '모르코',
      price: {
        land: 80,
        villa: 80,
        hotel: 100,
        landmark: 130,
      },
      type: 'nation',
      landmark: '모르코 모스코',
      contents: '모르코의 수도는 모르코. 좋은 나라입니다',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 25,
      name: '특수지역',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      landmark: '랜드마크없음',
      contents: '특수지역입니다.',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 26,
      name: '남아공',
      price: {
        land: 80,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '남아공 월드컵 경기장',
      contents: '남어공의 수도는 키예프. 어쩔티비',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 27,
      name: '이집트',
      price: {
        land: 100,
        villa: 100,
        hotel: 140,
        landmark: 170,
      },
      type: 'nation',
      landmark: '쿠푸왕의 대피라미드',
      contents: '이집트의 수도는 카이로. 이집트는 문명의 시작',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 28,
      name: '호주',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 180,
      },
      type: 'nation',
      landmark: '오페라 하우스',
      contents: '호주의 수도는 어디일까요',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 29,
      name: '뉴질랜드',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 180,
      },
      type: 'nation',
      landmark: '빌헬름 협곡',
      contents: '뉴질랜드의 수도는 키위. 로마에 가면 로마의 법을 따르라',
      continent: '아프리카&오세아니아',
      owner: 0,
    },
    {
      location: 30,
      name: '올림픽',
      type: 'olympic',
      contents: '하나된 세계 올림픽으로!',
      owner: 0,
    },
    {
      location: 31,
      name: '칠레',
      price: {
        land: 80,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '칠레 대성당',
      contents: '세상에서 가장 긴 나라 칠레',
      continent: '아메리카',
      owner: 0,
    },
    {
      location: 32,
      name: '페루',
      price: {
        land: 80,
        villa: 80,
        hotel: 120,
        landmark: 150,
      },
      type: 'nation',
      landmark: '마추픽추',
      contents: '잉카 문명의 고대 제국 페루',
      continent: '아메리카',
      owner: 0,
    },
    {
      location: 33,
      name: '보물상자',
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
    },
    {
      location: 34,
      name: '브라질',
      price: {
        land: 100,
        villa: 100,
        hotel: 140,
        landmark: 180,
      },
      type: 'nation',
      landmark: '리우데자네이루 거대 예수상',
      contents: '삼바의 나라 브라질',
      continent: '아메리카',
      owner: 0,
    },
    {
      location: 35,
      name: '특수지역',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 180,
      },
      type: 'item',
      landmark: '파나마운하',
      contents: '특수지역입니다.',
      continent: '아메리카',
      owner: 0,
    },
    {
      location: 36,
      name: '멕시코',
      price: {
        land: 100,
        villa: 100,
        hotel: 150,
        landmark: 180,
      },
      type: 'nation',
      landmark: '차첸이트사',
      contents: '멕시코의 수도는 멕시코시티. 로마에 가면 로마의 법을 따르라',
      continent: '유럽',
      owner: 0,
    },
    {
      location: 37,
      name: '국세청',
      type: 'tax',
      contents: '탈세는 위법입니다. 가진 재산의 10%를 세금으로 납부하세요',
      owner: 0,
    },
    {
      location: 38,
      name: '캐나다',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 200,
      },
      type: 'nation',
      landmark: '캐나다 대성당',
      contents: '캐나다의 수도는 오타와',
      continent: '아메리카',
      owner: 0,
    },
    {
      location: 39,
      name: '미국',
      price: {
        land: 120,
        villa: 120,
        hotel: 150,
        landmark: 200,

      },
      type: 'nation',
      landmark: '자유의 여신상',
      contents: '미국의 수도는 워싱턴D.C 자유의 나라',
      continent: '아메리카',
      owner: 0,
    },
  ])

  const [p1, setP1] = useState<Player>({
    pId: '1',
    pNum: 1,
    name: '성훈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: true,
      dice1: 0,
      dice2: 0,
      dice: 0,
      double: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p2, setP2] = useState<Player>({
    pId: '2',
    pNum: 2,
    name: '한빈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      double: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p3, setP3] = useState<Player>({
    pId: '3',
    pNum: 3,
    name: '정훈',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      double: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p4, setP4] = useState<Player>({
    pId: '4',
    pNum: 4,
    name: '원규',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      double: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  let lst = [p1, p2, p3, p4]

  let [cnt, setCnt] = useState(0);
  let [dice1, setDice1] = useState(0);
  let [dice2, setDice2] = useState(0);
  let [dice, setDice] = useState(0);
  let [double, setDouble] = useState(false);
  let [turn, setTurn] = useState(0);

  // 플레이어 1회 턴 함수

  const playerTurn = async (turn: number) => {

    p1.game.state = false;
    p2.game.state = false;
    p3.game.state = false;
    p4.game.state = false;




    let double = false;
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    let dice = dice1 + dice2

    setDice1(dice1);
    setDice2(dice2);
    setDice(dice)
    if (dice1 === dice2) {
      double = true
    } else {
      double = false;
    }
    setDouble(double);

    // 무인도 검증

    if (turn === 0) {

      // 변경된 값 세팅
      setP1((prevState) => {
        return {
          ...prevState,
          game: {
            location: setLocation(p1, dice),
            balance: p1.game.balance,
            desert: p1.game.desert,
            state: true,
            dice1: dice1,
            dice2: dice2,
            dice: dice,
            double: double,
            own: p1.game.own,
            lap: p1.game.lap,
            ranking: 0,
          },
        }
      })
    } else if (turn === 1) {

      // 변경된 값 세팅
      setP2((prevState) => {
        return {
          ...prevState,
          game: {
            location: setLocation(p2, dice1 + dice2),
            balance: p2.game.balance,
            desert: p2.game.desert,
            state: true,
            dice1: dice1,
            dice2: dice2,
            dice: dice,
            double: double,
            own: p2.game.own,
            lap: p2.game.lap,
            ranking: 0,
          },
        }
      })
    } else if (turn === 2) {

      // 변경된 값 세팅
      setP3((prevState) => {
        return {
          ...prevState,
          game: {
            location: setLocation(p3, dice1 + dice2),
            balance: p3.game.balance,
            desert: p3.game.desert,
            state: true,
            dice1: dice1,
            dice2: dice2,
            dice: dice,
            double: double,
            own: p3.game.own,
            lap: p3.game.lap,
            ranking: 0,
          },
        }
      })
    } else if (turn === 3) {

      // 변경된 값 세팅
      setP4((prevState) => {
        return {
          ...prevState,
          game: {
            location: setLocation(p4, dice1 + dice2),
            balance: p4.game.balance,
            desert: p4.game.desert,
            state: true,
            dice1: dice1,
            dice2: dice2,
            dice: dice,
            double: double,
            own: p4.game.own,
            lap: p4.game.lap,
            ranking: 0,
          },
        }
      })
    }

    // 더블아니면 turn 증가
    if (!double) {
      setTurn((turn + 1) % 4)
    }
  }


  // 위치 변경 함수
  const setLocation = (p: Player, dice: number) => {

    let result = (p.game.location + dice)
    if (p.game.desert === 0) { // 무인도가 아니라면(무인도 카운트 === 0)

      if (result >= 40) {
        p.game.lap++;
        p.game.balance += 50;
        console.log(p.name + '한 바퀴 완주! 월급 + 50만원');
        result = (result % 40)  // 한바퀴 돌면(40칸 이상 이면 초기화)
      }

      if (result === 10) {   // 무인도 좌표값(10)이면,
        console.log(p.name + '무인도 불시착! 3턴 쉬세요.');
        p.game.desert = 3;
      }

    } else {
      if (p.game.double) {
        console.log(p.name + '더블로 무인도 탈출 성공!');
        p.game.desert = 0;

      } else {
        console.log(p.name + '무인도 탈출 실패! 카운트 - 1');
        p.game.desert--;
      }
      result = p.game.location;
    }

    let spot = worldMap[result]

    if (spot.type === 'nation') { // 도착지 종류가 나라일 때
      if (spot.owner) {  // 주인이 있을때
        if (spot.owner === p.pNum) {
          console.log(p.name + '님 본인의 땅입니다. 추가 건물을 지으시겠습니까?')
        } else {
          console.log('플레이어' + spot.owner + '소유지 입니다. 통행료를 지불하세요.');
        }

      } else {  // 주인이 없을 때
        console.log(spot.name + '의 가격은' + spot.price?.land + '만원 입니다. 구입하시겠습니까?');
      }
    } else if (spot.type === 'item') {  // 보물상자일 때
      console.log('보물상자를 열어보세요!');
    } else if (spot.type === 'start') {
      console.log('시작점에 도착했습니다. 월급이 두배 + 50만원');
    } else if (spot.type === 'desert') {
      console.log('무인도 도착!!!!');
    } else if (spot.type === 'tax') {
      console.log('납세는 의무입니다. 재산의 10%를 납부하세요.');
    } else if (spot.type === 'port') {
      console.log('여행상품 당첨!! 티웨이 항공과 함께 원하는 곳으로 이동해보세요.');
    } else if (spot.type === 'olympic') {
      console.log('올림픽 개최!!!');
    }




    return result


  }


  // 나라 구매하기
  const buy = (p: number, nation: number): void => {
    if (p === 1) {
      setP1((prevState) => ({
        ...prevState,
        game: {
          ...prevState.game,
          own: [...prevState.game.own, nation],

        }
      }))


    } else if (p === 2) {
      setP2((prevState) => ({
        ...prevState,
        game: {
          ...prevState.game,
          own: [...prevState.game.own, nation],

        }
      }))
      setWorldMap((prevState) =>
        prevState.map((item, key) =>
          key === nation ? { ...item, owner: p } : item
        )
      );
    } else if (p === 3) {
      setP3((prevState) => ({
        ...prevState,
        game: {
          ...prevState.game,
          own: [...prevState.game.own, nation],

        }
      }))
    } else if (p === 4) {
      setP4((prevState) => ({
        ...prevState,
        game: {
          ...prevState.game,
          own: [...prevState.game.own, nation],

        }
      }))
    }
    // 월드맵에 소유주 추가하기
    setWorldMap((prevState) =>
      prevState.map((item, key) =>
        key === nation ? { ...item, owner: p } : item
      )
    );

  }

  const [color, setColor] = useState<number>(0);
  const [inputColor, setInputColor] = useState<string>('white');
  useEffect(() => {
    if (color === 1) {
      setInputColor('red')
    } else if (color === 2) {
      setInputColor('green')
    } else if (color === 3) {
      setInputColor('green')
    } else if (color === 4) {
      setInputColor('green')
    }
  }, [color])





  return (
    <>
      <div className='w-full bg-white flex flex-col justify-center items-center'>
        <div className='w-[900px] h-[960px] mt-[20px] bg-red-200 flex flex-col justify-center items-center mt-[50px]'>
          <div className='w-[990px] h-[990px] bg-green-100'>
            <div className=''>
              <div className='flex relative'>
                {worldMap.map((i, index) => {
                  return <div key={index}>
                    {i.location >= 0 && i.location < 10 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-red-300 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>{i.price ? i.price.land + '만원' : '특수지역'}</div>
                      <div className={`w-[90px] h-[56px] mt-[4px]  flex flex-col justify-center items-center ${i.owner === 1 ? 'bg-red-100' : 'bg-white'} ${i.owner === 2 ? 'bg-green-100' : 'bg-white'} ${i.owner === 3 ? 'bg-blue-100' : 'bg-white'} ${i.owner === 4 ? 'bg-yellow-100' : 'bg-white'}`}>
                        {i.owner === p1.pNum ? <div className='bg-red-200 relative w-[60px] h-[40px] top-[-10px]'></div> : null}
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 0 && i.location < 10 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 0 && i.location < 10 && (i.type !== 'item' && i.type !== 'nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                  </div>
                })}
              </div>
              <div className='flex-col relative top-[-90px] left-[900px]'>
                {worldMap.map((i, index) => {
                  return <div key={index}>
                    {i.location >= 10 && i.location < 20 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-green-300 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>{i.price ? i.price.land + '만원' : '특수지역'}</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 10 && i.location < 20 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 10 && i.location < 20 && (i.type !== 'item' && i.type !== 'nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                  </div>
                })}
              </div>
              <div className='flex flex-row-reverse relative top-[-90px]'>
                {worldMap.map((i, index) => {
                  return <div key={index}>
                    {i.location >= 20 && i.location < 30 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-yellow-300 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>{i.price ? i.price.land + '만원' : '특수지역'}</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 20 && i.location < 30 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 20 && i.location < 30 && (i.type !== 'item' && i.type !== 'nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                  </div>
                })}
              </div>
              <div className='flex flex-col-reverse relative top-[-990px]'>
                {worldMap.map((i, index) => {
                  return <div key={index}>
                    {i.location >= 30 && i.location < 40 && i.type === 'nation' ? <div className='w-[90px] h-[90px] bg-purple-300 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>{i.price ? i.price.land + '만원' : '특수지역'}</div>
                      <div className={`w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center`}>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 30 && i.location < 40 && i.type === 'item' ? <div className='w-[90px] h-[90px] bg-purple-400 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                    {i.location >= 30 && i.location < 40 && (i.type !== 'item' && i.type !== 'nation') ? <div className='w-[90px] h-[90px] bg-gray-100 outline outline-1 flex flex-col items-center justify-start'>
                      <div>[{index}]{i.name}</div>
                      <div>(특수지역)</div>
                      <div className='w-[90px] h-[56px] mt-[4px] bg-white flex flex-col justify-center items-center'>
                        {i.location === p1.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-red-500'></div><div className='ml-[4px] text-[14px]'>{p1.name}</div></div> : null}
                        {i.location === p2.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-green-500'></div><div className='ml-[4px] text-[14px]'>{p2.name}</div></div> : null}
                        {i.location === p3.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-blue-500'></div><div className='ml-[4px] text-[14px]'>{p3.name}</div></div> : null}
                        {i.location === p4.game.location ? <div className='flex items-center pl-[10px]'><div className='rounded-[10px] w-[10px] h-[10px] bg-yellow-500'></div><div className='ml-[4px] text-[14px]'>{p4.name}</div></div> : null}
                      </div>
                    </div> : null}
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='w-[800px] h-[900px] mt-[60px] flex flex-col items-center p-[20px] relative top-[-820px]'>
          <div className='flex p-[20px]'>
            {
              lst.map((i, index) => {
                return <div key={index}>
                  <div className={`w-[200px] h-[200px] text-[12px] flex flex-col justify-between items-between p-[10px]  ${i.game.state ? 'bg-blue-300' : 'bg-gray-100'}`}>
                    <div className={`w-full h-[30px]  flex justify-center items-center text-[20px] mb-[10px] ${i.game.state ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Player{i.pId}({i.name})</div>
                    <div>보유자산 : {i.game.balance}만원</div>
                    <div>현재위치 : [{i.game.location}] {worldMap[i.game.location].name}</div>
                    <div>소유국가 : [{i.game.own + ''}]
                    </div>
                    <div>주사위1 : {i.game.dice1}</div>
                    <div>주사위2 : {i.game.dice2}</div>
                    <div>주사위합 : {i.game.dice}</div>
                    <div>더블 : {i.game.double ? '더블!' : '더블아님'}</div>
                    <div>순위 : {i.game.ranking}</div>
                    <div>몇바퀴 : {i.game.lap} 바퀴 </div>
                    <div>무인도 카운트 : {i.game.desert}</div>
                  </div>
                </div>
              })
            }
          </div>
          <div className='flex flex-col bg-blue-200 w-[400px] h-[120px] justify-center items-center relative top-[-370px]'>
            <div className='text-[24px]'>플레이어{turn}턴</div>
            <div> 주사위1 : {dice1}</div>
            <div> 주사위2 : {dice2}</div>
            <div> 총합 : {dice}</div>
            <div> double : {double ? '더블!' : '더블 아님'}</div>
          </div>

          {/* 콘솔창  */}
          <div className='w-[400px] h-[320px] bg-white flex flex-col items-center relative top-[-120px] rounded-[6px]'>
            {lst.map((i, index) => {
              return <div key={index}>
                {i.game.state &&
                  <div className='flex flex-col items-center'>
                    <div className='text-[30px] font-PtdBold mt-[20px]'>{worldMap[i.game.location].name}</div>
                    <div className='flex justify-center items-center'>
                      <div className='text-[12px]'>[{i.game.location}]</div>
                      <div className='text-[12px]'>[{worldMap[i.game.location].type}]</div>
                      <div className='text-[12px]'>[{worldMap[i.game.location].owner ? `플레이어 ${worldMap[i.game.location].owner} 소유` : '구입 가능'}]</div>
                    </div>
                    <div className='text-[18px] mt-[10px] mb-[10px] h-[60px]'>{worldMap[i.game.location].contents}</div>
                    {worldMap[i.game.location].type === 'nation' && !worldMap[i.game.location].owner &&
                      <div>
                        <div className='flex rounded-[4px] w-[380px] h-[100px] outline bg-gray-50'>
                          <div className='flex flex-col justify-center items-center w-[95px] h-full hover:bg-blue-100'>
                            <div className=''>
                              <span className='text-[22px]'>{worldMap[i.game.location].price?.land}</span>
                              <span className='text-[12px]'>만원</span>
                            </div>
                            <div className='mt-[10px]'>가격</div>
                          </div>
                          <div className='flex flex-col justify-center items-center w-[95px] h-full hover:bg-blue-100'>
                            <div>
                              <span className='text-[22px]'>{worldMap[i.game.location].price?.villa}</span>
                              <span className='text-[12px]'>만원</span>
                            </div>
                            <div className='mt-[10px]'>별장</div>
                          </div>
                          <div className='flex flex-col justify-center items-center w-[95px]  h-full hover:bg-blue-100'>
                            <div>
                              <span className='text-[22px]'>{worldMap[i.game.location].price?.hotel}</span>
                              <span className='text-[12px]'>만원</span>
                            </div>
                            <div className='mt-[10px]'>호텔</div>
                          </div>
                          <div className='flex flex-col justify-center items-center w-[95px]  h-full hover:bg-blue-100'>
                            <div>
                              <span className='text-[22px]'>{worldMap[i.game.location].price?.landmark}</span>
                              <span className='text-[12px]'>만원</span>
                            </div>
                            <div className='mt-[10px]'>랜드마크</div>
                          </div>
                        </div>
                        <div className='mt-[16px] flex flex-col justify-center items-center'>
                          구매하시겠습니까??
                        </div>
                        <div className='flex justify-around items-center mt-[10px]'>
                          <div className='rounded-[4px] bg-blue-300 w-[180px] h-[30px] flex justify-center items-center hover:cursor-pointer'
                            onClick={() => {
                              console.log('구매하기 실행');
                              buy(i.pNum, i.game.location);
                            }}
                          >예</div>
                          <div className='rounded-[4px] bg-red-300 w-[180px] h-[30px] flex justify-center items-center hover:cursor-pointer'
                            onClick={() => {
                              console.log('구입 안함');
                              playerTurn(turn)
                            }}
                          >아니오</div>
                        </div>
                      </div>
                    }



                  </div>
                }
              </div>
            })}
          </div>

          <div onClick={() => {
            playerTurn(turn);

          }}
            className='rounded-[6px] w-[400px] h-[70px] bg-blue-500 text-[24px] text-white flex justify-center items-center relative top-[-104px] hover:cursor-pointer hover:bg-blue-600'>주사위 굴리기</div>
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router';
import Room from './Room';
import CreateGame from '../create/CreateGame';
import Game2D from './Game2D';
import Game3D from './Game3D';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useLocation } from "react-router-dom";


export default function Main() {

  let roomData: any = null;
  const params = useParams();
  const location = useLocation();
  const loginUser = '2756798359';


  roomData = location.state.value;

  console.log('roomData : ');
  console.log(roomData.user1)
  console.log(roomData.user1.kakaoId);
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzc3NTAxMX0.FGXDtMPT4TZdwoUDUc98lZNlYI7d4MK2YYu63b7nvQiJdzY2zItjIgmOAsM5_Y4hKIPv2eU5o9gOwdbgyRc8uQ  '
  let headers = { Authorization: `Bearer ${accessToken}` };
  let receivedData: any = null;

  // 소켓 연결
  const socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
  const ws = Stomp.over(socket);

  useEffect(() => {
    ws.connect(headers, (frame: any) => {
      console.log('소켓 연결')
      subscribe();

    });
  }, [])


  useEffect(() => {

  }, [])


  function subscribe() {

    console.log('subcribe () 실행 >>>>>')
    ws.subscribe(`/sub/${params.id}`, (event) => {
      const received = JSON.parse(event.body);






    });
  }


  // 참여한 플레이어 데이터 세팅하기
  function setGameData() {

    let _p1 = roomData.user1;
    let _p2 = roomData.user2;
    let _p3 = roomData.user3;
    let _p4 = roomData.user4;
    let myId = 'ㅇㄹㅇㄹㅇㄹ';
    let myNum = 7;
    const ps = [_p1, _p2, _p3, _p4];

    console.log('참여한 플레이어 데이터 최초 세팅')

    ps.forEach((e, index) => {
      if(e.kakaoId === loginUser ) {
        console.log('플레이어 일치' + (index+1))
        console.log(e);

        myId = e.kakaoId;
        myNum = index+1;
        // setMe((prevState) => ({
        //   ...prevState,
        //   playerId: '내 정보 아이디다',
        //   playerNum: (index+1),
        //   name: '성훈',
        //   type: 'player',
        //   game: {
        //     ...prevState.game,
        //     location: 0,
        //     balance: 500,
        //     desert: 0,
        //     state: false,
        //     dice1: 0,
        //     dice2: 0,
        //     dice: 0,
        //     isDouble: false,
        //     own: [],
        //     lap: 0,
        //     ranking: 0,
        //   }
        // }))
        
        // console.log('내 정보')
        // console.log(me);
      }
    });

    
    

    setP1((prevState) => ({
      ...prevState,
      playerId: _p1.kakaoId,
      playerNum: 1,
      name: '설희',
      type: 'player',
      game: {
        ...prevState.game,
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      }
    }))

    setP2((prevState) => ({
      ...prevState,
      playerId: _p2.kakaoId,
      playerNum: 2,
      name: '성훈',
      type: 'player',
      game: {
        ...prevState.game,
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      }
    }))

    setP3((prevState) => ({
      ...prevState,
      playerId: _p3.kakaoId,
      playerNum: 3,
      name: '미희',
      type: 'player',
      game: {
        ...prevState.game,
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      }
    }))

    setP4((prevState) => ({
      ...prevState,
      playerId: _p4.kakaoId,
      playerNum: 4,
      name: '원규',
      type: 'player',
      game: {
        ...prevState.game,
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      }
    }))

    setMe((prevState) => ({
      ...prevState,
      playerId: myId,
      playerNum: myNum,
      name: '내 아이디',
      type: 'player',
      game: {
        ...prevState.game,
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      }
    }))

    console.log('me >>>>')
    console.log(me);
    console.log(p1)
    console.log(p2)
    console.log(p3)
    console.log(p4)

    


    // console.log('플레이어 데이터 전송 >>>')
    // ws.send("/pub/game/player", {}, JSON.stringify(roomData));
  }




  const [contents, setContents] = useState<String>('');
  const [mode, setMode] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [data, setData] = useState<Object[]>();
  // 백으로부터 응답 받은 데이터
  let res = {};




  // 플레이어 데이터 세팅
  const [p1, setP1] = useState<Player>({
    playerId: "",
    playerNum: 1,
    name: "설희",
    type: 'player',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })
  const [p2, setP2] = useState<Player>({
    playerId: "",
    playerNum: 2,
    name: "원규",
    type: 'player',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p3, setP3] = useState<Player>({
    playerId: "",
    playerNum: 3,
    name: "성훈",
    type: 'player',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [p4, setP4] = useState<Player>({
    playerId: "",
    playerNum: 4,
    name: "설희",
    type: 'player',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })

  const [me, setMe] = useState<Player>({
    playerId: "",
    playerNum: 4,
    name: "",
    type: 'player',
    game: {
      location: 0,
      balance: 500,
      desert: 0,
      state: false,
      dice1: 0,
      dice2: 0,
      dice: 0,
      isDouble: false,
      own: [],
      lap: 0,
      ranking: 0,
    },
  })


  // 아이템(보물상자)
  const [item, setItem] = useState<Item[]>([
    {
      id: 0,
      title: '운수 좋은 날',
      content: '주사위를 한 번 더 던지세요!',
    },
    {
      id: 1,
      title: '무인도 불시착',
      content: '비행기가 고장나서 무인도에 갇혔습니다. 무인도로 가세요.',
    },
    {
      id: 2,
      title: '자유여행권',
      content: '한번에 이동하고 싶은 곳을 클릭하세요.',
    },
    {
      id: 3,
      title: '코로나19 확진',
      content: '코로나에 걸렸습니다. 2턴 간 자가격리에 들어갑니다.',
    },
    {
      id: 4,
      title: '호텔에 짐을 놓고 왔습니다.',
      content: '뒤로 2 칸 이동하세요.',
    },
    {
      id: 5,
      title: '졸음',
      content: '졸다가 3역을 지나쳤습니다. 앞으로 3 칸 이동',
    },
    {
      id: 6,
      title: '복권 당첨',
      content: '100만원을 받으세요!',
    },
    {
      id: 7,
      title: '세무조사',
      content: '국세청에서 세무 조사를 시작합니다. 국세청으로 이동하세요.',
    },
    {
      id: 8,
      title: '주식 투자',
      content: '투자한 주식이 대박났습니다. 200만원을 받으세요.',
    },
    {
      id: 9,
      title: '올림픽 티켓 수령',
      content: '올림픽을 관람하러갑니다.',
    },
    {
      id: 10,
      title: 'BTS 콘서트',
      content: '콘서트를 보러 대한민국으로 이동합니다.',
    },
    {
      id: 11,
      title: '미국 여행',
      content: '미국으로 이동하세요',
    },
    {
      id: 12,
      title: '피라미드 대탐험',
      content: '새로운 피라미드가 발견됐습니다. 이집트로 이동하세요.',
    },
    {
      id: 13,
      title: '로마의 휴일',
      content: '휴가를 받았습니다. 이탈리아로 이동하세요.',
    },
    {
      id: 14,
      title: '과속 벌금',
      content: '과속은 위험합니다. 벌금 -100만원',
    },
    {
      id: 15,
      title: '통행 면제권',
      content: '1회 다른 플레이어의 나라에 무료로 머무를 수 있습니다.',
    },
    {
      id: 16,
      title: '뒤로 걷기 캠페인',
      content: '뒤로 3칸 이동하세요.',
    },



  ])


  // 월드맵(지도)
  const [worldMap, setWorldMap] = useState<Spot[]>([
    {
      location: 0,
      name: '시작',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'start',
      contents: '시작점 입니다. 월급을 받으세요. + 300,000',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },

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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },

    },
    {
      location: 3,
      name: '보물상자',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 5,
      name: '홍콩',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'city',
      landmark: '랜드마크없음',
      contents: '자유무역도시 홍콩',
      continent: '아시아',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 10,
      name: '무인도',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'desert',
      contents: '무인도에 불시착했습니다. 3턴 쉬세요.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 13,
      name: '보물상자',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 15,
      name: '지중해',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'city',
      landmark: '크레타섬',
      contents: '그리스 로마 문화의 시작 지중해',
      continent: '유럽',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 20,
      name: '정거장',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'port',
      contents: '특가 항공권 당첨! 원하는 곳으로 이동합니다.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 23,
      name: '보물상자',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 25,
      name: '사하라',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'city',
      landmark: '오아시스',
      contents: '뜨거운 모래의 사막, 사하라',
      continent: '아프리카&오세아니아',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 30,
      name: '올림픽',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'olympic',
      contents: '하나된 세계 올림픽으로!',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 33,
      name: '보물상자',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'item',
      contents: '보물상자를 발견했습니다.',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 35,
      name: '파나마',
      price: {
        land: 100,
        villa: 0,
        hotel: 0,
        landmark: 180,
      },
      type: 'city',
      landmark: '파나마운하',
      contents: '아메리카 대륙의 좁은 해협, 파나마',
      continent: '아메리카',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
    {
      location: 37,
      name: '국세청',
      price: {
        land: 0,
        villa: 0,
        hotel: 0,
        landmark: 0,
      },
      type: 'tax',
      contents: '탈세는 위법입니다. 가진 재산의 10%를 세금으로 납부하세요',
      owner: 0,
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
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
      option: 0,
      toll: 0,
      build: {
        land: false,
        villa: false,
        hotel: false,
        landmark: false,
      },
    },
  ])



  const p = [p1, p2, p3, p4]
  const setP = [setP1, setP2, setP3, setP4]


  return (<>
    <div className='w-screen h-screen bg-[#FFFDF4]'>
      <div className='w-full bg-[#FFFDF4] flex items-start justify-around fixed-top z-50'>
        <div className='w-full h-[60px] flex items-end justify-end'>
          {/* <img className='w-[100px] h-[54px] flex items-end mt-[20px] ml-[60px] object-cover' src='/game/LogoColored.png' alt='로고이미지'></img> */}
          <div className='w-[100px] h-[40px] rounded-[4px] mr-[120px] flex justify-center items-center rounded-full bg-blue-400 text-[18px] text-white hover:cursor-pointer hover:bg-blue-500'
            onClick={() => {
              setMode(!mode);
            }}
          >3D 모드</div>
        </div>
      </div>
      {!start && <div className='w-full h-full bg-[#FFFDF4] flex flex-col justify-center items-center'>
        <div id='shbutton' className='w-[200px] h-[50px] text-[24px] flex justify-center items-center'
          onClick={(e) => {
            e.preventDefault();
            setStart(true);
            setGameData();
          }}
        >게임스타트</div>
      </div>}
      {start && <div>
        {mode && <Game2D p={p} me={me} setMe={setMe} setP={setP} worldMap={worldMap} setWorldMap={setWorldMap}></Game2D>}
        {!mode && <Game3D p={p} setP={setP} worldMap={worldMap} setWorldMap={setWorldMap}></Game3D>}
      </div>}










      {/* <div>소켓 테스트용</div>
      <div className='flex flex-col'>
        <button className='w-[120px] h-[50px] mt-[20px] shbutton' onClick={sendMsg}>소켓 데이터 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px] shbutton' onClick={sendEmoticon}>이모티콘 전송</button>
        <button className='w-[120px] h-[50px] mt-[20px] shbutton'onClick={requestQuiz}>퀴즈 요청</button>
      </div> */}

    </div >
  </>
  )
}


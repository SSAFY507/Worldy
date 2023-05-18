import * as THREE from 'three';

import { useEffect, useMemo, useRef, useState } from "react";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { PlayerInfoType } from '../Game3D';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import WorldyMap from '../../../assets/lowpoly/WorldyPolyMap3.glb';
import { gsap } from 'gsap';
import pawn_0 from '../../../assets/lowpoly/pawn_0.glb';
import pawn_1 from '../../../assets/lowpoly/pawn_1.glb';
import pawn_2 from '../../../assets/lowpoly/pawn_2.glb';
import pawn_3 from '../../../assets/lowpoly/pawn_3.glb';

type MeshButtonProps = {
  position: THREE.Vector3;
  scale: [number, number, number];
  transparent?: boolean;
  color?: THREE.ColorRepresentation;
};

interface playerContainter {
  playerLoc: THREE.Vector3 | null,
  playerIndex: number | null,
}

interface Props {
  // playerInfo :PlayerInfoType
  metaData: MetadataType
  diceData: number
  player: NewPlayer
  getPlayerTurn: (data:any) => void
}
// player는 4명의 플레이어 데이터

const Game3DItem = ({diceData, metaData, player, getPlayerTurn}: Props) => {
  const playerInfo = { playerIndex: metaData.turn,  currentIndex: metaData.currentLocation}

  const arch = new Set(
    ["호주", "영국", "칠레", "페루", "브라질",
      "멕시코", "캐나다", "미국", "싱가포르", "중국",
      "일본", "대한민국", "인도", "사우디", "뉴질랜드", 
      "이집트", "남아공", "모로코", "소말리아", "가나", 
      "프랑스", "독일", "스위스", "이탈리아", "스페인", 
      "헝가리", "태국"])

  // 월드맵(지도)
  const [worldMap, setWorldMap] = useState<any>({
    roomId: "",
    type: "worldmap",
    worldMap: [
      {
        location: 0,
        name: "시작",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "start",
        contents: "시작점입니다. 월급을 받으세요.     + 300,000",
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
        name: "태국",
        price: {
          land: 50,
          villa: 20,
          hotel: 50,
          landmark: 100,
        },
        type: "nation",
        landmark: "카오산 로드",
        contents: "태국의 수도는 방콕. 어쩌구 저쩌구",
        continent: "아시아",
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
        name: "싱가포르",
        price: {
          land: 50,
          villa: 20,
          hotel: 50,
          landmark: 100,
        },
        type: "nation",
        landmark: "싱가포르 무역센터",
        contents: "싱가포르의 수도는 싱가폴 도시 국가이다.",
        continent: "아시아",
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
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
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
        name: "인도",
        price: {
          land: 80,
          villa: 50,
          hotel: 70,
          landmark: 120,
        },
        type: "nation",
        landmark: "타지마할",
        contents:
          "인도의 수도는 뉴델리. 세상에서 가장 많은 인구를 보유하고있다.",
        continent: "아시아",
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
        name: "홍콩",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "랜드마크없음",
        contents: "자유무역도시 홍콩",
        continent: "아시아",
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
        name: "사우디",
        price: {
          land: 90,
          villa: 70,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "사우디 이슬람 모스크",
        contents: "사우디 아라비아는 석유가 많이 난다. 저쩌구",
        continent: "아시아",
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
        name: "중국",
        price: {
          land: 100,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "만리장성",
        contents: "중국의 수도는 베이징. 어쩌구 저쩌구",
        continent: "아시아",
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
        name: "일본",
        price: {
          land: 100,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "후지산",
        contents: "일본의 수도는 후지산. 어쩌구 저쩌구",
        continent: "아시아",
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
        name: "대한민국",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "경복궁",
        contents: "한국의 수도는 서울. BTS, 봉준호, 손흥민, Jay Park",
        continent: "아시아",
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
        name: "무인도",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "desert",
        contents: "무인도에 불시착했습니다. 3턴 쉬세요.",
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
        name: "헝가리",
        price: {
          land: 70,
          villa: 50,
          hotel: 80,
          landmark: 100,
        },
        type: "nation",
        landmark: "헝가리 모스크",
        contents: "헝가리 수도는 부다페스트. 큰 도시",
        continent: "유럽",
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
        location: 12,
        name: "스페인",
        price: {
          land: 80,
          villa: 80,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "가우디 대성당",
        contents: "스페인는 열정의 나라,어쩌구 저쩌구",
        continent: "유럽",
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
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
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
        name: "이탈리아",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "바티칸 대성당",
        contents: "이탈리아의 수도는 로마. 로마에 가면 로마의 법을 따르라",
        continent: "유럽",
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
        name: "지중해",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "크레타섬",
        contents: "그리스 로마 문화의 시작 지중해",
        continent: "유럽",
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
        name: "스위스",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "알프스 산맥",
        contents: "스위스의 수도는 베른. 스위스는 중립국",
        continent: "유럽",
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
        name: "독일",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "베를린 장벽",
        contents: "독일의 수도는 베를린. 벤츠의 나라",
        continent: "유럽",
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
        name: "프랑스",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "에펠탑",
        contents: "프랑스의 수도는 파리. 낭만의 도시",
        continent: "유럽",
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
        name: "영국",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "빅반",
        contents: "영국의 수도는 런던. 태양이 지지 않는 나라",
        continent: "유럽",
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
        name: "정거장",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "port",
        contents: "특가 항공권 당첨! 원하는 곳으로 이동합니다.",
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
        name: "가나",
        price: {
          land: 50,
          villa: 50,
          hotel: 70,
          landmark: 100,
        },
        type: "nation",
        landmark: "가나 초콜릿",
        contents: "가나는 초콜릿이 유명하다.",
        continent: "아프리카",
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
        location: 22,
        name: "소말리아",
        price: {
          land: 50,
          villa: 50,
          hotel: 70,
          landmark: 100,
        },
        type: "nation",
        landmark: "소말리아 모스크",
        contents: "소말리아 수도는 리비아. 해적을 조심하라",
        continent: "아프리카",
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
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
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
        name: "모르코",
        price: {
          land: 80,
          villa: 80,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "모르코 모스코",
        contents: "모르코의 수도는 모르코. 좋은 나라입니다",
        continent: "아프리카&오세아니아",
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
        name: "사하라",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "오아시스",
        contents: "뜨거운 모래의 사막, 사하라",
        continent: "아프리카&오세아니아",
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
        name: "남아공",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "남아공 월드컵 경기장",
        contents: "남어공의 수도는 키예프. 어쩔티비",
        continent: "아프리카&오세아니아",
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
        name: "이집트",
        price: {
          land: 100,
          villa: 100,
          hotel: 140,
          landmark: 170,
        },
        type: "nation",
        landmark: "쿠푸왕의 대피라미드",
        contents: "이집트의 수도는 카이로. 이집트는 문명의 시작",
        continent: "아프리카&오세아니아",
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
        name: "호주",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "오페라 하우스",
        contents: "호주의 수도는 어디일까요",
        continent: "아프리카&오세아니아",
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
        name: "뉴질랜드",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "빌헬름 협곡",
        contents: "뉴질랜드의 수도는 키위. 로마에 가면 로마의 법을 따르라",
        continent: "아프리카&오세아니아",
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
        name: "올림픽",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "olympic",
        contents: "하나된 세계 올림픽으로!",
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
        name: "칠레",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "칠레 대성당",
        contents: "세상에서 가장 긴 나라 칠레",
        continent: "아메리카",
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
        name: "페루",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "마추픽추",
        contents: "잉카 문명의 고대 제국 페루",
        continent: "아메리카",
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
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
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
        name: "브라질",
        price: {
          land: 100,
          villa: 100,
          hotel: 140,
          landmark: 180,
        },
        type: "nation",
        landmark: "리우데자네이루 거대 예수상",
        contents: "삼바의 나라 브라질",
        continent: "아메리카",
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
        name: "파나마",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 180,
        },
        type: "city",
        landmark: "파나마운하",
        contents: "아메리카 대륙의 좁은 해협, 파나마",
        continent: "아메리카",
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
        name: "멕시코",
        price: {
          land: 100,
          villa: 100,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "차첸이트사",
        contents: "멕시코의 수도는 멕시코시티. 로마에 가면 로마의 법을 따르라",
        continent: "유럽",
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
        name: "국세청",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "tax",
        contents: "탈세는 위법입니다. 가진 재산의 10%를 세금으로 납부하세요",
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
        name: "캐나다",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "캐나다 대성당",
        contents: "캐나다의 수도는 오타와",
        continent: "아메리카",
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
        name: "미국",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "자유의 여신상",
        contents: "미국의 수도는 워싱턴D.C 자유의 나라",
        continent: "아메리카",
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
    ],
  });

  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

  const playerLoc = useRef<THREE.Vector3 | null>(null);
  // const player1Loc = useRef<THREE.Vector3 | null>(null);
  // const player2Loc = useRef<THREE.Vector3 | null>(null);
  // const player3Loc = useRef<THREE.Vector3 | null>(null);

  // const [player0Index, setPlayer0Index] = useState<number>(0);
  // const [player1Index, setPlayer1Index] = useState<number>(0);
  // const [player2Index, setPlayer2Index] = useState<number>(0);
  // const [player3Index, setPlayer3Index] = useState<number>(0);

  const [turn, setTurn] = useState<number>(0);
  const [rolledDice, setRolledDice] = useState<number>(0);
  const [playerMovedCount, setPlayerMovedCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [playerTurn, setPlayerTurn] = useState<number>(0)

  const dist = 1;


  // const getArch = (counting: number) => {
  //   let tmpTurn = playerTurn;
  //   alert(`${turn} 번째 턴. ${playerTurn}번째 플레이어가 주사위를 던집니다.`)
  //   alert("작은 건물을 구매하시겠습니까?")
  //   scene.current?.children[5].children.forEach((obj, idx) => {
  //     console.log(counting)
  //     if(worldMap.worldMap[counting].name + "_소" === obj.name)
  //       obj.visible = true
  //   })
  //   setPlayerTurn((tmpTurn + 1) % 4)
  //   setTurn(turn + 1)
  // }

  useEffect(() => {
    setPlayerMovedCount(playerInfo.currentIndex)
    setPlayerTurn(playerInfo.playerIndex)
    // setTurn(playerInfo.turn)
  }, [])

  useEffect(() => {
    if (diceData) {
      moveCounted(diceData)
    }
  }, [diceData])

  // useEffect(() => {
  //   if (turn > -1) {
  //     let tmpTurn = playerTurn;
  //     alert(`${turn} 번째 턴. ${playerTurn}번째 플레이어가 주사위를 던집니다.`)
  //     alert("작은 건물을 구매하시겠습니까?")
  //     scene.current?.children[5].children.forEach((obj, idx) => {
  //       if(worldMap.worldMap[tmpTurn].name + "_소" === obj.name)
  //         obj.visible = true
  //     })
  //     setPlayerTurn((tmpTurn + 1) % 4)
  //   }
  //   setTurn(turn + 1)

  // },[playerMovedCount])

 /** 주사위 굴리는 함수 */
  const getRandomInt = () => {
    const newDice = Math.floor(Math.random() * (13 - 1) + 1);
    // setRolledDice(newDice);
    moveCounted(newDice);
  };

  /** 입력한 input의 count handle 함수 */
  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    if (event.target.value) setCount(parseInt(event.target.value));
    console.log(count)

  };

  /** 플레이어 몇 칸 움직이고 카메라 움직일 거니 */ 
  const moveCounted = async (count: number) => {
    // var prevDir: number = -1;
    var presentDir = 0;
    for (let i = 1; i <= count; i++) {
      presentDir = Math.floor((playerMovedCount - 1 + i) / 10);
      if (presentDir === 4) presentDir = 0;
      // if (prevDir === -1) prevDir = presentDir;
      // else if (prevDir !== presentDir) {
      //   await rotateCamera(presentDir);
      //   prevDir = presentDir;
      // }
      console.log('presentDir', presentDir);
      await movePlayerDir(presentDir);
      // console.log('playerLoc', player0Loc.current);
    }
    // rotateCamera(presentDir);
    setPlayerMovedCount((playerMovedCount + count) % 40);
    // getArch((playerMovedCount + count) % 40);
  };

  /** 플레이어 움직임 함수 */
  const movePlayerDir = (dir: number): Promise<void> => {
    console.log('현재', playerLoc.current);
    return new Promise((resolve) => {
      //   const newPosition: localPosition = player;
      const newX =
        playerLoc.current!.x +
        (dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0);
      const newY = playerLoc.current!.y + 0.5;
      const newZ =
        playerLoc.current!.z +
        (dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0);
      console.log('newX : ' + newX);
      console.log('newY : ' + newY);
      console.log('newZ : ' + newZ);
      gsap.to(playerLoc.current!, {
        duration: 0.2,
        ease: 'power0.inOut',
        x: newX,
        y: newY,
        z: newZ,
        onUpdate: () => {
          playerLoc.current!.set(
            playerLoc.current!.x,
            playerLoc.current!.y,
            playerLoc.current!.z
          );
        },
        onComplete: () => {
          console.log('점프', playerLoc.current!);
          const newnewX =
            playerLoc.current!.x +
            (dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0);
          const newnewY = playerLoc.current!.y - 0.5;
          const newnewZ =
            playerLoc.current!.z +
            (dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0);
          gsap.to(playerLoc.current!, {
            delay: 0.01,
            duration: 0.2,
            ease: 'power0.out',
            // x: (newPosition.x +=h
            x: newnewX,
            y: newnewY,
            z: newnewZ,
            onUpdate: () => {
              playerLoc.current!.set(
                playerLoc.current!.x,
                playerLoc.current!.y,
                playerLoc.current!.z
              );
            },
            onComplete: () => {
              console.log('착지', playerLoc.current);
              resolve();
            },
          });
        },
      });
    });
  };

  // /** 카메라 함수 */
  // const rotateCamera = (dir: number): Promise<void> => {
  //   return new Promise((resolve) => {
  //     const newX = 170 * (dir % 2) * Math.pow(-1, dir % 3);
  //     const newZ = 170 * ((dir + 1) % 2) * Math.pow(-1, Math.floor(dir / 2));
  //     gsap.to(cameraRef.current!.position, {
  //       duration: 1,
  //       x: newX,
  //       y: 50,
  //       z: newZ,
  //       onUpdate: () => {
  //         cameraRef.current!.position.set(
  //           cameraRef.current!.position.x,
  //           50,
  //           cameraRef.current!.position.z
  //         );
  //       },
  //       onComplete: () => {
  //         resolve();
  //       },
  //     });
  //   });
  // };

  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;
    const cam = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cam.position.set(0, 8, 8);
    cameraRef.current = cam;
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 5, 6);
    scene.current?.add(light);
  };

  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(WorldyMap, (glb) => {
      const obj3d = glb.scene;
      console.log(obj3d)
      obj3d.children.forEach((obj, idx) =>{
        // name이 6글자 이하인 객체들에 대해서 '_'가 존재하는 객체 
        if (obj.name.length <7 && obj.name.includes('_')){
          obj.name.slice(0, obj.name.indexOf('_'))
          obj.visible = false
        }
      })
      obj3d.name = "worldMap";

      obj3d.position.set(0, 0, 0);
      obj3d.scale.set(1, 1, 1);

      scene.current?.add(obj3d)
    })
    const items = [
      {url: pawn_0, location: player.p1.game.location},
      {url: pawn_1, location: player.p2.game.location},
      {url: pawn_2, location: player.p3.game.location},
      {url: pawn_3, location: player.p4.game.location},
    ]

    items.forEach((item, idx) => {
      gltfLoader.load(item.url, (glb) =>{
        const obj3d = glb.scene;
        // obj3d.position.set(0, 0, 0);
        obj3d.scale.set(1, 1, 1);
        console.log(obj3d.position)
        if (idx === playerInfo.playerIndex){
          playerLoc.current = obj3d.position
        }
        scene.current?.add(obj3d)
      })

    })
  }

  /** 렌더링 될 때마다 사이즈 초기화 */
  const resize = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;

    if (cameraRef.current !== null) {
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
    renderer.current?.setSize(width, height);
  };
  
  /** 마우스 그래그로 회전시킴 */
  const SetupControls = () => {
    if (cameraRef.current) {
      controls.current = new OrbitControls(cameraRef.current, divContainer.current!); // OrbitControls를 초기화합니다.
      controls.current.enableDamping = true;
    }
  }

  const render = (time: number) => {
    renderer.current?.render(scene.current!, cameraRef.current!);
    update(time);
    requestAnimationFrame(render);
  };

  const update = (time: number) => {
    time *= 0.01;

  };

  useEffect(() => {
    if (divContainer.current) {
      const ren = new THREE.WebGLRenderer({ antialias: true });
      ren.setPixelRatio(window.devicePixelRatio);
      divContainer.current.appendChild(ren.domElement);
      renderer.current = ren;

      const scn = new THREE.Scene();
      scene.current = scn;
      
      SetupCamera();
      SetupLight();
      SetupModel();
      SetupControls();
      // scene.current.background = new THREE.Color("#0000");
      // let light =new THREE.DirectionalLight(0xffff00, 10);
      // scene.current.add(light)

      window.onresize = resize;
      resize();

      requestAnimationFrame(render);
    }
  }, []);

  return (
    <div className='flex flex-col w-full h-full justify-start items-center'>
     
        <div className='w-full  flex flex-row justify-start items-center h-20'>
          <div className='mx-10'>
            <button id='tempButton' onClick={() => {
                getPlayerTurn(metaData.turn)
                // console.log(playerTurn)
                // getRandomInt()
              }}>
              <span
                id='tempButtonText'
                className='flex items-center justify-center flex-row'
              >
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 512 512'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153zm.926 82.855a31.953 18.96 0 0 1 22.127 32.362 31.953 18.96 0 1 1-45.188-26.812 31.953 18.96 0 0 1 23.06-5.55zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm221.52 64.664A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM145.296 289.1a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 0 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm277.523 29.38A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184zm-221.52 64.663a31.236 18.008 58.094 0 1 33.817 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203z'></path>
                </svg>
                <div className='ml-4'>( {rolledDice} )</div>
              </span>
            </button>
          </div>
          {/* <div id='input-container' className='mx-10'>
            <input
              id='tempInput'
              type='number'
              value={count}
              max={3}
              min={1}
              onChange={handleCount}
            />
            <button
              id='invite-btn'
              onClick={() => {
                console.log("마우스 오버")
                console.log(count);
                moveCounted(count);
              }}
            >
              돌리기
            </button>
          </div> */}
        </div>
      <div
      className=''
        style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}
        ref={divContainer} 
      />
    </div>
  )
}

export default Game3DItem;
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
  worldMap: Spot[]
  getPlayerTurn: (data:any) => void
}

interface ArchType {
  [key:string]:string|boolean
}

// player는 4명의 플레이어 데이터

const mapAxis = [
  {name: "시작", axis:[0, 0, 0]},
  {name: "태국", axis:[-1, 0, 0]},
  {name: "싱가포르", axis:[-2, 0, 0]},
  {name: "보물상자1", axis:[-3, 0, 0]},
  {name: "인도", axis:[-4, 0, 0]},
  {name: "독도", axis:[-5, 0, 0]},
  {name: "사우디", axis:[-6, 0, 0]},
  {name: "중국", axis:[-7, 0, 0]},
  {name: "일본", axis:[-8, 0, 0]},
  {name: "대한민국", axis:[-9, 0, 0]},

  {name: "무인도", axis:[-10, 0, 0]},
  {name: "헝가리", axis:[-9.5, 1, 0]},
  {name: "스페인", axis:[-9.5, 2, 0]},
  {name: "보물상자2", axis:[-9.5, 3, 0]},
  {name: "이탈리아", axis:[-9.5, 4, 0]},
  {name: "지중해", axis:[-9.5, 5, 0]},
  {name: "스위스", axis:[-9.5, 6, 0]},
  {name: "독일", axis:[-9.5, 7, 0]},
  {name: "프랑스", axis:[-9.5, 8, 0]},
  {name: "영국", axis:[-9.5, 9, 0]},

  {name: "정거장", axis:[-9.5, 9.5, 0]},
  {name: "가나", axis:[-9, 9.5, 0]},
  {name: "소말리아", axis:[-8, 9.5, 0]},
  {name: "보물상자3", axis:[-7, 9.5, 0]},
  {name: "모로코", axis:[-6, 9.5, 0]},
  {name: "사하라", axis:[-5, 9.5, 0]},
  {name: "남아공", axis:[-4, 9.5, 0]},
  {name: "이집트", axis:[-3, 9.5, 0]},
  {name: "호주", axis:[-2, 9.5, 0]},
  {name: "뉴질랜드", axis:[-1, 9.5, 0]},

  {name: "올림픽", axis:[0, 9.5, 0]},
  {name: "칠레", axis:[-0.5, 9, 0]},
  {name: "페루", axis:[-0.5, 8, 0]},
  {name: "보물상자4", axis:[-0.5, 7, 0]},
  {name: "브라질", axis:[-0.5, 6, 0]},
  {name: "하와이", axis:[-0.5, 5, 0]},
  {name: "멕시코", axis:[-0.5, 4, 0]},
  {name: "국세청", axis:[-0.5, 3, 0]},
  {name: "캐나다", axis:[-0.5, 2, 0]},
  {name: "미국", axis:[-0.5, 1, 0]},

]

const checkArch:ArchType = {
  소: "villa",
  중: "hotel",
  대: "landmark"
}

const Game3DItem = ({diceData, metaData, player, worldMap, getPlayerTurn}: Props) => {
  const playerInfo = { playerIndex: metaData.turn,  currentIndex: metaData.currentLocation}

  const arch = new Set(
    ["호주", "영국", "칠레", "페루", "브라질",
      "멕시코", "캐나다", "미국", "싱가포르", "중국",
      "일본", "대한민국", "인도", "사우디", "뉴질랜드", 
      "이집트", "남아공", "모로코", "소말리아", "가나", 
      "프랑스", "독일", "스위스", "이탈리아", "스페인", 
      "헝가리", "태국"])

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
        (dir === 0 ? -dist / 2 : (dir === 2 ? dist / 2 : 0));
      const newY = playerLoc.current!.y + 0.5;
      const newZ =
        playerLoc.current!.z +
        (dir === 3 ? dist / 2 : (dir === 1 ? -dist / 2 : 0));
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

    const isArch = [...player.p1.game.own, ...player.p2.game.own, ...player.p3.game.own, ...player.p4.game.own]
    const isArchSet = new Set()
    isArch.forEach ((number, idx) => {
      isArchSet.add(mapAxis[number].name)
    })
    
    gltfLoader.load(WorldyMap, (glb) => {
      const obj3d = glb.scene;
      obj3d.children.forEach((obj, idx) =>{
        // name이 6글자 이하인 객체들에 대해서 '_'가 존재하는 객체 
        if (obj.name.length <7 && obj.name.includes('_')){
          obj.visible = false
          // 건물이 있는 나라를 찾고
          if (isArchSet.has(obj.name.slice(0, obj.name.indexOf('_')))){
            // 해당 건물의 종류를 찾아 
            isArch.forEach((number, idx2) => {
              if (worldMap[number].name === obj.name.slice(0, obj.name.indexOf('_'))) {
                //해당 객체의 크기
                const tmp = obj.name.slice(obj.name.indexOf('_')+1, obj.name.indexOf('_')+2)
                //해당 객체의 크기에 따른 건물 이름
                const name = checkArch[`${tmp}`]
                // 해당 객체
                const a:ArchType = worldMap[number].build
                if (a[`${name}`]) {
                  obj.visible = true
                }
              }
            })
          }
          
          // if (mapAxis[]) {
          //   obj.visible = false
          // }
          
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
        obj3d.position.set(mapAxis[item.location].axis[0], obj3d.position.y-0.1, -mapAxis[item.location].axis[1])
        if (playerInfo.playerIndex === idx) {
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
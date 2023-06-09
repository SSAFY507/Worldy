import * as THREE from 'three';

import { useEffect, useMemo, useRef, useState } from "react";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { PlayerInfoType } from '../Game3D';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import WorldyMap from '../../../assets/lowpoly/WorldyPolyMap4.glb';
import bg from '../../../assets/images/gameBg.png';
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
  myIndex: number
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

const Game3DItem = ({diceData, metaData, player, worldMap, myIndex, getPlayerTurn}: Props) => {
  // playerIndex => 현재 차례인 유저, currentIndex => 현재 있는 위치
  const playerInfo = { playerIndex: metaData.turn,  currentIndex: metaData.currentLocation}

  // 플레이어
  const items = [
    {url: pawn_0, location: player.p1.game.location},
    {url: pawn_1, location: player.p2.game.location},
    {url: pawn_2, location: player.p3.game.location},
    {url: pawn_3, location: player.p4.game.location},
  ]

  const isArch = [...player.p1.game.own, ...player.p2.game.own, ...player.p3.game.own, ...player.p4.game.own]
  const isArchSet = new Set()
  isArch.forEach ((number, idx) => {
    isArchSet.add(mapAxis[number].name)
  })
  

  // const arch = new Set(
  //   ["호주", "영국", "칠레", "페루", "브라질",
  //     "멕시코", "캐나다", "미국", "싱가포르", "중국",
  //     "일본", "대한민국", "인도", "사우디", "뉴질랜드", 
  //     "이집트", "남아공", "모로코", "소말리아", "가나", 
  //     "프랑스", "독일", "스위스", "이탈리아", "스페인", 
  //     "헝가리", "태국"])

  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

  const playerLoc = useRef<THREE.Vector3 | null>(null);
  const player1Loc = useRef<THREE.Vector3 | null>(null);
  const player2Loc = useRef<THREE.Vector3 | null>(null);
  const player3Loc = useRef<THREE.Vector3 | null>(null);

  const currentPlayer = useRef<THREE.Vector3 | null>(null);

  // const [turn, setTurn] = useState<number>(0);
  // const [rolledDice, setRolledDice] = useState<number>(0);
  const [playerMovedCount, setPlayerMovedCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [playerTurn, setPlayerTurn] = useState<number>(0)

  const dist = 1;
  useEffect(() => {
    if (diceData) {
      scene.current?.children[5].children.forEach((obj, idx) => {
        // 건물 인식해서 짓기
        if (obj.name.length <7 && obj.name.includes('_')){
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
                if (a[`${name}`] && obj.visible === false) {
                  gsap.to(obj, { visible: true, duration: 0 });
                  gsap.to(obj.position, { y: obj.position.y + 0.15 , duration: 1 });
                }
              }
            })
          }
        }
      })
      // 현재 유저 인식
      switch (playerInfo.playerIndex) {
        case 0:
          currentPlayer.current = playerLoc.current
          setPlayerMovedCount(player.p1.game.location)
          break
        case 1:
          currentPlayer.current = player1Loc.current
          setPlayerMovedCount(player.p2.game.location)
          break
        case 2:
          currentPlayer.current = player2Loc.current
          setPlayerMovedCount(player.p3.game.location)
          break
        case 3:
          currentPlayer.current = player3Loc.current
          setPlayerMovedCount(player.p4.game.location)
          break
        default:
          alert("유저선택오류")
          break
      }
    }
  },[metaData])

  // useEffect(() => {
  //   setPlayerTurn(playerInfo.playerIndex)
  // }, [diceData])

  useEffect(() => {
    if (diceData) {
      moveCounted(diceData)
    }
  }, [diceData])

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
      await movePlayerDir(presentDir);
      // console.log('playerLoc', player0Loc.current);
    }
    // rotateCamera(presentDir);
    setPlayerMovedCount((playerMovedCount + count) % 40);
    getPlayerTurn(true)
  };

  /** 플레이어 움직임 함수 */
  const movePlayerDir = (dir: number): Promise<void> => {
    console.log('현재', currentPlayer.current);
    return new Promise((resolve) => {
      //   const newPosition: localPosition = player;
      const newX =
        currentPlayer.current!.x +
        (dir === 0 ? -dist / 2 : (dir === 2 ? dist / 2 : 0));
      const newY = currentPlayer.current!.y + 0.5;
      const newZ =
        currentPlayer.current!.z +
        (dir === 3 ? dist / 2 : (dir === 1 ? -dist / 2 : 0));
      console.log('newX : ' + newX);
      console.log('newY : ' + newY);
      console.log('newZ : ' + newZ);
      gsap.to(currentPlayer.current!, {
        duration: 0.2,
        ease: 'power0.inOut',
        x: newX,
        y: newY,
        z: newZ,
        onUpdate: () => {
          currentPlayer.current!.set(
            currentPlayer.current!.x,
            currentPlayer.current!.y,
            currentPlayer.current!.z
          );
        },
        onComplete: () => {
          console.log('점프', currentPlayer.current!);
          const newnewX =
            currentPlayer.current!.x +
            (dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0);
          const newnewY = currentPlayer.current!.y - 0.5;
          const newnewZ =
            currentPlayer.current!.z +
            (dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0);
          gsap.to(currentPlayer.current!, {
            delay: 0.01,
            duration: 0.2,
            ease: 'power0.out',
            // x: (newPosition.x +=h
            x: newnewX,
            y: newnewY,
            z: newnewZ,
            onUpdate: () => {
              currentPlayer.current!.set(
                currentPlayer.current!.x,
                currentPlayer.current!.y,
                currentPlayer.current!.z
              );
            },
            onComplete: () => {
              console.log('착지', currentPlayer.current);
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
  //     const newZ = 0 * (dir % 2) * Math.pow(-1, dir % 3);
  //     const newX = 8 * ((dir + 1) % 2) * Math.pow(-1, Math.floor(dir / 2));
  //     gsap.to(cameraRef.current!.position, {
  //       duration: 1,
  //       x: newX,
  //       y: 8,
  //       z: newZ,
  //       onUpdate: () => {
  //         cameraRef.current!.position.set(
  //           cameraRef.current!.position.x,
  //           8,
  //           cameraRef.current!.position.z
  //         );
  //       },
  //       onComplete: () => {
  //         resolve();
  //       },
  //     });
  //   });
  // };

  /** 배경함수 */
  const SetBackground = () => {
    //2. 이미지를 배경으로 (방법 여러개지만, 여기서는 Texture 이용)
    const loader = new THREE.TextureLoader();

    loader.load(bg, (texture) => {
      scene.current!.background = texture;

      // SetupModel이 없는 상태에서 background를 받으려니 문제 생김!
      // => Backround를 호출할 때, 모델을 호출해주자
      // SetupModel();
    });
  };

  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;
    const cam = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cam.position.set(0, 6, 6);
    cam.rotation.set(
      THREE.MathUtils.degToRad(0), 
      THREE.MathUtils.degToRad(-30), 
      THREE.MathUtils.degToRad(30)
    )
    // cam.lookAt(0, 0, -4)
    cameraRef.current = cam;
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    //6. RectAreaLight : 광원의 위치에서 사방으로 퍼져나감
    RectAreaLightUniformsLib.init(); 
    // 빛의 색상, 빛의 세기, 광원의 가로길이, 광원의 세로길이
    const light = new THREE.RectAreaLight(0xffffff, 2, 50, 50);
    light.position.set(0, 5, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-90);


    scene.current?.add(light);
    // lightRef.current = light
    // // Add lights
    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);

    // hemiLight.position.set(0, 50, 0);
    // // Add hemisphere light to scene
    // scene.current?.add(hemiLight);
    
    // const color = 0xffffff;
    // const intensity = 2;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(0, 5, 6);
    // scene.current?.add(light);
  };

  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(WorldyMap, (glb) => {
      const obj3d = glb.scene;
      obj3d.children.forEach((obj, idx) =>{
        // name이 6글자 이하인 객체들에 대해서 '_'가 존재하는 객체 
        if (obj.name.length <7 && obj.name.includes('_')){
          obj.visible = false
          obj.position.y = 0.7
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
                  gsap.to(obj, { visible: true, duration: 0 });
                  gsap.to(obj.position, { y: obj.position.y + 0.15 , duration: 1 });
                  // obj.visible =  true
                  // obj.position.y = 0.85
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

    console.log(myIndex)
    items.forEach((item, idx) => {
      gltfLoader.load(item.url, (glb) =>{
        const obj3d = glb.scene;
        obj3d.scale.set(1, 1, 1);
        if (diceData) {
          obj3d.position.set(mapAxis[item.location].axis[0], obj3d.position.y-0.1, -mapAxis[item.location].axis[1])
        } else {
          obj3d.position.set(mapAxis[item.location].axis[0], obj3d.position.y, -mapAxis[item.location].axis[1])
        }
        if ( idx === (myIndex-1)) {
          playerLoc.current = obj3d.position
        } else {
          if (player1Loc.current === null) {
            player1Loc.current = obj3d.position
          } else if (player2Loc.current === null) {
            player2Loc.current = obj3d.position
          } else { 
            player3Loc.current = obj3d.position
          }
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
      SetBackground();

      window.onresize = resize;
      resize();

      requestAnimationFrame(render);
    }
  }, []);

  return (
    <div className='absolute flex flex-col w-full h-full justify-start items-center'>
      <div
      className=''
        style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}
        ref={divContainer} 
      />
    </div>
  )
}

export default Game3DItem;
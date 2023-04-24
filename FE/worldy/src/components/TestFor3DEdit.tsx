import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { relative } from 'path';
import './TempButton.css';

type MeshButtonProps = {
  position: THREE.Vector3;
  scale: [number, number, number];
  transparent?: boolean;
  color?: THREE.ColorRepresentation;
};

function TestFor3DEdit() {
  ///////////////////////////////////////////

  const mountRef = useRef<HTMLDivElement | null>(null);

  const dist = 15;

  const [rolledDice, setRolledDice] = useState<number>(0);

  //   const [playerLoc, setPlayerLoc] = useState<[number, number, number]>([
  //     82.5, 7, 82.5,
  //   ]);

  const [playerMovedCount, setPlayerMovedCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  //   const [vector, setVector] = useState<THREE.Vector3>();

  const defaultCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const cameraRef = useRef<THREE.PerspectiveCamera>(defaultCamera);

  const playerLoc = useRef<THREE.Vector3>(new THREE.Vector3(82.5, 7, 82.5));

  //주사위 굴리는 함수
  const getRandomInt = () => {
    const newDice = Math.floor(Math.random() * (13 - 1) + 1);
    setRolledDice(newDice);
    moveCounted(newDice);
  };
  //////////////////////////////

  //입력한 input의 count handle 함수
  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setCount(parseInt(event.target.value));
  };
  ///////////////////////////

  // 플레이어 몇 칸 움직이고 카메라 움직일 거니
  const moveCounted = async (count: number) => {
    // var prevDir: number = -1;
    var presentDir = 0;
    for (let i = 1; i <= count; i++) {
      presentDir = Math.floor((playerMovedCount - 1 + i) / 11);
      if (presentDir === 4) presentDir = 0;
      // if (prevDir === -1) prevDir = presentDir;
      // else if (prevDir !== presentDir) {
      //   await rotateCamera(presentDir);
      //   prevDir = presentDir;
      // }
      console.log('presentDir', presentDir);
      await movePlayerDir(presentDir);
      console.log('playerLoc', playerLoc.current);
    }
    rotateCamera(presentDir);
    setPlayerMovedCount(playerMovedCount + count);
  };
  ////////////////////////////////

  //플레이어 움직임 함수
  const movePlayerDir = (dir: number): Promise<void> => {
    console.log('현재', playerLoc.current);
    return new Promise((resolve) => {
      //   const newPosition: localPosition = playerLoc.current;
      const newX =
        playerLoc.current.x +
        (dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0);
      const newY = playerLoc.current.y + 3;
      const newZ =
        playerLoc.current.z +
        (dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0);
      console.log('newX : ' + newX);
      console.log('newY : ' + newY);
      console.log('newZ : ' + newZ);
      gsap.to(playerLoc.current, {
        duration: 0.2,
        ease: 'power0.inOut',
        x: newX,
        y: newY,
        z: newZ,
        onUpdate: () => {
          playerLoc.current.set(
            playerLoc.current.x,
            playerLoc.current.y,
            playerLoc.current.z
          );
        },
        onComplete: () => {
          console.log('점프', playerLoc.current);
          const newnewX =
            playerLoc.current.x +
            (dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0);
          const newnewY = playerLoc.current.y - 3;
          const newnewZ =
            playerLoc.current.z +
            (dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0);
          gsap.to(playerLoc.current, {
            delay: 0.01,
            duration: 0.2,
            ease: 'power0.out',
            // x: (newPosition.x +=h
            x: newnewX,
            y: newnewY,
            z: newnewZ,
            onUpdate: () => {
              playerLoc.current.set(
                playerLoc.current.x,
                playerLoc.current.y,
                playerLoc.current.z
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
  ////////////////////////////////

  //카메라 함수
  const rotateCamera = (dir: number): Promise<void> => {
    return new Promise((resolve) => {
      const newX = 170 * (dir % 2) * Math.pow(-1, dir % 3);
      const newZ = 170 * ((dir + 1) % 2) * Math.pow(-1, Math.floor(dir / 2));
      gsap.to(cameraRef.current.position, {
        duration: 1,
        x: newX,
        y: 50,
        z: newZ,
        onUpdate: () => {
          cameraRef.current.position.set(
            cameraRef.current.position.x,
            50,
            cameraRef.current.position.z
          );
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  };
  ////////////////////////////////

  const addMeshButton = ({
    position,
    scale,
    color,
    transparent = false,
  }: MeshButtonProps) => {
    const geometry = new THREE.BoxGeometry(...scale);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: transparent,
      opacity: transparent ? 0 : 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    // scene.add(mesh);

    return mesh;
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  useEffect(() => {
    if (!mountRef.current) return;

    const camera = cameraRef.current;
    if (camera.position.x === 0) camera.position.set(0, 50, 170);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.enablePan = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // 여기에 객체를 추가하십시오.

    // 객체 추가 (바닥 블록)

    // 사용 예시

    // const topLine: THREE.Mesh[] = [];
    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        -82.5 + i * dist,
        0,
        -82.5
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'green' : '#1E1E1E';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      //   topLine.push(meshButton);
      scene.add(meshButton);
    }

    // const bottomLine: THREE.Mesh[ ] = [];
    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        82.5 - i * dist,
        0,
        82.5
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'blue' : '#1E1E1E';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      //   bottomLine.push(meshButton);
      scene.add(meshButton);
    }

    // const rightLine: THREE.Mesh[] = [];
    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        82.5,
        0,
        -82.5 + i * dist
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'red' : '#1E1E1E';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      //   rightLine.push(meshButton);
      scene.add(meshButton);
    }

    // const leftLine: THREE.Mesh[] = [];
    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        -82.5,
        0,
        82.5 - i * dist
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'purple' : '#1E1E1E';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      //   leftLine.push(meshButton);
      scene.add(meshButton);
    }
    ////////////////////////////////

    const effectPlayerLoc = playerLoc.current;

    //플레이어 추가
    const meshPlayer = addMeshButton({
      position: effectPlayerLoc,
      scale: [5, 10, 5],
      color: 'orange',
      transparent: false,
    });
    scene.add(meshPlayer);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      //   meshPlayer.position.set(
      //     playerLoc.current.x,
      //     playerLoc.current.y,
      //     playerLoc.current.z
      //   );
      meshPlayer.position.copy(playerLoc.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className='App w-full h-full'>
      <div
        className='outline outline-red-600 outline-4 bg-gray-500'
        ref={mountRef}
      >
        <div>
          {/* <button
            className={'border-2 border-black'}
            onClick={() => {
              movePlayerDir(0);
            }}
          >
            <h2>왼쪽</h2>
          </button>
          <button
            onClick={() => {
              movePlayerDir(3);
            }}
          >
            <h2>아래</h2>
          </button>
          <button
            onClick={() => {
              movePlayerDir(2);
            }}
          >
            <h2>오른쪽</h2>
          </button>
          <button
            onClick={() => {
              movePlayerDir(1);
            }}
          >
            <h2>위</h2>
          </button> */}
          <div className='flex flex-row justify-start items-center h-20'>
            <div className='mx-10'>
              <button id='tempButton' onClick={getRandomInt}>
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
            <div id='input-container' className='mx-10'>
              <input
                id='tempInput'
                type='number'
                value={count}
                onChange={handleCount}
              />
              <button
                id='invite-btn'
                onClick={() => {
                  moveCounted(count);
                }}
              >
                돌리기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFor3DEdit;

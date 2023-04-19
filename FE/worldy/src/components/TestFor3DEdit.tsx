import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

type MeshButtonProps = {
  position: THREE.Vector3;
  scale: [number, number, number];
  transparent?: boolean;
  color?: THREE.ColorRepresentation;
};

function TestFor3DEdit() {
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
    const newDice = Math.floor(Math.random() * (12 - 1) + 1);
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
        // x: (newPosition.x += dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0),
        // y: (newPosition.y += 3),
        // z: (newPosition.z += dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0),
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
            //   dir === 0 ? -dist / 2 :  dir === 2 ? dist / 2 : 0),
            // y: (newPosition.y -= 3),
            // z: (newPosition.z +=
            //   dir === 3 ? dist / 2 : dir ===  1 ? -dist / 2 : 0),
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

  const scene = new THREE.Scene();

  useEffect(() => {
    if (!mountRef.current) return;

    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );

    const camera = cameraRef.current;
    camera.position.set(0, 50, 170);

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

    // 객체 추가 (바닥 블록)
    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        -82.5 + i * dist,
        0,
        -82.5
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'green' : 'gray';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      scene.add(meshButton);
    }

    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        82.5 - i * dist,
        0,
        82.5
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'blue' : 'gray';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      scene.add(meshButton);
    }

    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        82.5,
        0,
        -82.5 + i * dist
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'red' : 'gray';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
      scene.add(meshButton);
    }

    for (let i = 0; i <= 10; i++) {
      const position: THREE.Vector3 = new THREE.Vector3(
        -82.5,
        0,
        82.5 - i * dist
      );
      const scale: [number, number, number] = [10, 5, 10];
      const transparent: boolean = false;
      const color: THREE.ColorRepresentation = i === 0 ? 'purple' : 'gray';

      const meshButton = addMeshButton({
        position,
        scale,
        color,
        transparent,
      });
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
      meshPlayer.position.copy(playerLoc.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className='App'>
      <div
        style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}
        ref={mountRef}
      >
        <div>
          <button
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
          </button>
          <div>
            <input type='number' value={count} onChange={handleCount} />
            <button
              onClick={() => {
                moveCounted(count);
              }}
            >
              돌리기
            </button>
          </div>
          <div>
            <button onClick={getRandomInt}>주사위 돌리기</button>
            <h2> 주사위값 : {rolledDice}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFor3DEdit;

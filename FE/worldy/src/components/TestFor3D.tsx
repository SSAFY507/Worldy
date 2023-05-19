import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';

// import Plane from './Plane.jsx';

type MeshButtonProps = {
  onClick?: () => void;
  position: THREE.Vector3 | [number, number, number];
  scale: [number, number, number];
  transparent?: boolean;
  color?: string;
};

const MeshButton = ({
  onClick,
  position,
  scale,
  transparent,
  color,
}: MeshButtonProps) => {
  return (
    <>
      <mesh onClick={onClick} position={position} scale={scale}>
        <boxGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial
          attach='material'
          transparent={transparent}
          opacity={transparent ? 0 : 1}
          color={color}
        />
      </mesh>
    </>
  );
};

function TestFor3D() {
  // hoonsCamera.position.set(10, 32, 50);

  const [rolledDice, setRolledDice] = useState<number>(0);
  const getRandomInt = () => {
    const newDice = Math.floor(Math.random() * (12 - 1) + 1);
    setRolledDice(newDice);
    moveCounted(newDice);
  };

  const defaultCamera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const [camera, setCamera] = useState<PerspectiveCamera>(defaultCamera);

  useEffect(() => {
    camera.position.set(0, 50, 170);
  }, []);

  const [vector, setVector] = useState<THREE.Vector3>();
  // new THREE.Vector3(-62.5, 0, -72.5)
  const dist = 15;

  const [playerLoc, setPlayerLoc] = useState<THREE.Vector3>(
    new THREE.Vector3(82.5, 7, 82.5)
  );

  const rotateCamera = (dir: number): Promise<void> => {
    return new Promise((resolve) => {
      const newX = 170 * (dir % 2) * Math.pow(-1, dir % 3);
      const newZ = 170 * ((dir + 1) % 2) * Math.pow(-1, Math.floor(dir / 2));
      gsap.to(camera.position, {
        duration: 1,
        x: newX,
        y: 50,
        z: newZ,
        onUpdate: () => {
          camera.position.set(camera.position.x, 50, camera.position.z);
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  };

  const movePlayerDir = (dir: number): Promise<void> => {
    return new Promise((resolve) => {
      const newPosition = playerLoc.clone();
      gsap.to(playerLoc, {
        duration: 0.2,
        ease: 'power0.inOut',
        x: (newPosition.x += dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0),
        y: (newPosition.y += 3),
        z: (newPosition.z += dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0),
        onUpdate: () => setPlayerLoc(playerLoc.clone()),
        onComplete: () => {
          gsap.to(playerLoc, {
            delay: 0.01,
            duration: 0.2,
            ease: 'power0.out',
            x: (newPosition.x +=
              dir === 0 ? -dist / 2 : dir === 2 ? dist / 2 : 0),
            y: (newPosition.y -= 3),
            z: (newPosition.z +=
              dir === 3 ? dist / 2 : dir === 1 ? -dist / 2 : 0),
            onUpdate: () => setPlayerLoc(playerLoc.clone()),
            onComplete: () => {
              resolve();
            },
          });
        },
      });
    });
  };

  //Contorls
  const [playerMovedCount, setPlayerMovedCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setCount(parseInt(event.target.value));
  };

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
      //console.log('presentDir', presentDir);
      await movePlayerDir(presentDir);
    }
    rotateCamera(presentDir);
    setPlayerMovedCount(playerMovedCount + count);
  };

  useEffect(() => {
    //console.log('count', count);
    //console.log('playerMovedCount', playerMovedCount);
  }, [playerMovedCount]);

  const bottomLine: JSX.Element[] = [];
  for (let i = 0; i <= 10; i++) {
    bottomLine.push(
      <MeshButton
        position={[82.5 - i * dist, 0, 82.5]}
        scale={[10, 5, 10]}
        transparent={false}
        color={i === 0 ? 'blue' : undefined}
      />
    );
  }

  const leftLine: JSX.Element[] = [];
  for (let i = 0; i <= 10; i++) {
    leftLine.push(
      <MeshButton
        position={[-82.5, 0, 82.5 - i * dist]}
        scale={[10, 5, 10]}
        transparent={false}
        color={i === 0 ? 'orange' : undefined}
      />
    );
  }

  const topLine: JSX.Element[] = [];
  for (let i = 0; i <= 10; i++) {
    topLine.push(
      <MeshButton
        position={[-82.5 + i * dist, 0, -82.5]}
        scale={[10, 5, 10]}
        transparent={false}
        color={i === 0 ? 'green' : undefined}
      />
    );
  }

  const rightLine: JSX.Element[] = [];
  for (let i = 0; i <= 10; i++) {
    rightLine.push(
      <MeshButton
        position={[82.5, 0, -82.5 + i * dist]}
        scale={[10, 5, 10]}
        transparent={false}
        color={i === 0 ? 'brown' : undefined}
      />
    );
  }

  return (
    <div className='App'>
      <div style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}>
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
        <Canvas camera={camera}>
          <axesHelper args={[5]} />
          <OrbitControls
            // target={camera}
            autoRotate={false}
            enableZoom={true}
            enablePan={true}
            target={vector}
          />

          <ambientLight intensity={1} />

          {/* 클릭 박스 */}
          {/* ///////////////////// */}
          <MeshButton
            position={playerLoc}
            scale={[5, 10, 5]}
            transparent={false}
            color='red'
          />
          {bottomLine}
          {leftLine}
          {topLine}
          {rightLine}
        </Canvas>
      </div>
    </div>
  );
}

export default TestFor3D;

import * as THREE from "three";

import React, { useEffect, useRef, useState } from 'react';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import shiba from "../assets/lowpoly/shiba.glb"

function BinsTestPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.3, 1000 );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias : true });
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도 설정
    // AmbientLight 생성 및 scene에 추가
    // scene.add(ambientLight);


    // const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
    // document.body.appendChild( renderer.domElement );
    renderer.outputEncoding = THREE.sRGBEncoding;  //색상 그대로 가져옴

    // 카메라 위치 설정
    camera.position.z = 5;

    // 큐브
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // const glbFilePath = './low_poly_city_pack.glb';

    // 에셋 추가
    const loader = new GLTFLoader();
    loader.load(shiba, (gltf) => {
      const model = gltf.scene;

      // 로드된 모델의 위치, 크기, 회전 설정
      model.position.set(1 ,1, 1);
      model.scale.set(1, 1, 1);
      model.rotation.set(0, 0, 0);
      
      // scene에 모델 추가
      scene.add(model)
      const animate = () =>  {
        requestAnimationFrame( animate );
    
        // model.rotation.x += 0.01;
        // model.rotation.y += 0.01;
    
        renderer.render( scene, camera );
      }
    
      animate();

    })
  

    // Ambient Light 생성 및 scene에 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도 설정
    scene.add(ambientLight);



  },[])


  return (
    <canvas 
      ref={canvasRef}
      // style={{ width: '100%', height: '100%' }}
    />
  )
}

export default BinsTestPage;
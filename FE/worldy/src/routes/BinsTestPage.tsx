import * as THREE from "three";

import React, { useEffect, useRef, useState } from 'react';

import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import shiba from "../assets/lowpoly/shiba.glb"
import super_mario from "../assets/lowpoly/super_mario_world_map.glb"

function BinsTestPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.3, 1000 );
    const camera = new THREE.OrthographicCamera( 1, -1, 1, -1 );
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current!, 
      antialias : true 
    });

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.maxDistance = 20;
    controls.minDistance = 3;
    controls.minPolarAngle = Math.PI / 4; //45deg
    controls.maxPolarAngle = THREE.MathUtils.degToRad(45);
    controls.update();
    
    // const controls = new TrackballControls( camera, renderer.domElement );
    
    // const controls = new FlyControls( camera, renderer.domElement );

    // controls.rollSpeed = 0.3;
    // controls.movementSpeed = 1;
    // controls.dragToLook = true;
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도 설정
    // AmbientLight 생성 및 scene에 추가
    // scene.add(ambientLight);


    // const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 1500, 1000 );
    // document.body.appendChild( renderer.domElement );
    renderer.outputEncoding = THREE.sRGBEncoding;  //색상 그대로 가져옴

    // 카메라 위치 설정
    camera.position.z = 15;

    // 큐브
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // const glbFilePath = './low_poly_city_pack.glb';

    // 에셋 추가
    const loader = new GLTFLoader();
    loader.load(super_mario, (gltf) => {
      const model = gltf.scene;

      // 로드된 모델의 위치, 크기, 회전 설정
      model.position.set(0 ,0, 0);
      model.scale.set(1, 1, 1);
      model.rotation.set(1, 1, 0);
      
      // scene에 모델 추가
      scene.add(model)
      const animate = () =>  {
        requestAnimationFrame( animate );
    
        // model.rotation.x += 0.01;
        // model.rotation.y += 0.01;
    
        controls.update();
        renderer.render( scene, camera );
      }
    
      animate();
      
      // const clock = new THREE.Clock();
      // function draw() {
      //   const delta = clock.getDelta();
  
      //   controls.update(delta);
  
      //   renderer.render(scene, camera);
      //   renderer.setAnimationLoop(draw);
      // }
      // draw();
      
    })
  

        

    // Ambient Light 생성 및 scene에 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도 설정
    scene.add(ambientLight);

    scene.background = new THREE.Color("#0000");
    let light =new THREE.DirectionalLight(0xffff00, 10);
    scene.add(light)
  

  },[])


  return (
    <canvas 
      ref={canvasRef}
      // style={{ width: '100%', height: '100%' }}
    />
  )
}

export default BinsTestPage;
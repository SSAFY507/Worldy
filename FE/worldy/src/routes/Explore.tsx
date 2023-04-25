import * as THREE from "three";

import { useEffect, useRef } from "react";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import worldmap from "../assets/lowpoly/World Map.glb"

const Explore = () => {
  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;
    const cam = new THREE.PerspectiveCamera(50, width / height, 0.1, 30000);
    // cam.position.z = 1;
    cam.position.set(0, 11000, 11000);      // 카메라의 위치는 7, 7, 0
    cam.rotation.set(0, 0, 50);
    cam.lookAt(150, 100, 100);          // 카메라가 바라보는 곳이 0, 0, 0
    
    camera.current = cam;

    scene.current?.add(cam)
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    const color = 0xffffff;
    const intensity = 4;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    // scene.current?.add(light);
    // 카메라에 조명을 달았음
    camera.current?.add(light)
  };

  /** 카메라 적정 위치 구하는 함수 */
  const ZoomFit = (object3D:any, camera:THREE.PerspectiveCamera) => {
    // 모델 경계 박스
    const box = new THREE.Box3().setFromObject(object3D);

    // 모델 경계 박스 대각 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();

    // 모델의 경계 박스 중심 위치
    const centerBox = box.getCenter(new THREE.Vector3());

    // 모델 크기의 절반값
    const halfSizeModel = sizeBox * 0.5;

    // 카메라의 fov의 절반값
    const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);

    // 모델을 화면에 꽉 채우기 위한 적당한 거리
    const distance = halfSizeModel / Math.tan(halfFov);

    // 모델 중심에서 카메라 위치로 향하는 방향 단위 벡터 계산
    const direction = (new THREE.Vector3()).subVectors(
      camera.position,
      centerBox
    ).normalize();

    // "단위 방향 벡터" 방향으로 모델 중심 위치에서 distance 거리에 대한 위치
    const position = direction.multiplyScalar(distance).add(centerBox);
    camera.position.copy(position);

    // 모델의 크기에 맞게 카메라의 near, far 값을 대략적으로 조정
    camera.near = sizeBox / 100;
    camera.far = sizeBox * 100;

    // 카메라 기본 속성 변경에 따른 투영행렬 업데이트
    camera.updateProjectionMatrix();

    // 카메라가 모델의 중심을 바라 보도록 함
    camera.lookAt(centerBox.x, centerBox.y, centerBox.z);
  }


  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      worldmap,
      (glb) => {
        const root = glb.scene;
        scene.current?.add(root)

        // if (camera.current) {
        //   ZoomFit(root, camera.current)
        // }
      }
    )
  };

  /** 렌더링 될 때마다 사이즈 초기화 */
  const resize = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;

    if (camera.current !== null) {
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
    }
    renderer.current?.setSize(width, height);
  };

  const render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    update(time);
    requestAnimationFrame(render);
  };

  /** 마우스 그래그로 회전시킴 */
  const SetupControls = () => {
    if (camera.current) {
      controls.current = new OrbitControls(camera.current, divContainer.current!); // OrbitControls를 초기화합니다.
      controls.current.enableDamping = true;
    }
  }

  const update = (time: number) => {
    time *= 0.01;
    // cube.current!.rotation.x = time;
    // cube.current!.rotation.y = time;
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

  return(
  <div
    style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}
    ref={divContainer} 
  />
  )
};

export default Explore;
import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import fontJSON from "../../assets/fonts/NanumMyeongjo_Regular.json";
import { gsap } from 'gsap';

/** 동적 애니메이션 함수 */
export const SetAnimation = (option:any, x:number, y:number, z:number, duration:number) => {
  gsap.to(option, {
    duration: duration,
    x: x,
    y: y,
    z: z,
    ease: "power4.out", // 선택사항: 애니메이션 효과를 조절할 수 있습니다.
  });
}

/** 객체 생성 함수 */
export const CreateObject = (w:number, h:number, x:number, y:number, z:number, name:string, angleX:number, angleY:number, angleZ:number) => {
  const createGeometry = new THREE.PlaneGeometry(w, h);
  const createMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  });

  const createMesh = new THREE.Mesh(createGeometry, createMaterial)

  createMesh.position.set(x, y, z)
  createMesh.name = name

  createMesh.rotation.set(THREE.MathUtils.degToRad(angleX), THREE.MathUtils.degToRad(angleY), THREE.MathUtils.degToRad(angleZ));
  
  return createMesh;
}

/** 3D TextGeometry 생성 함수 */
export const CreateTextGeometry = (text: string, x:number, y:number, z:number, name:string, angleX:number, angleY:number, angleZ:number) => {
  const loader = new FontLoader();
  const font = loader.parse(fontJSON);
  const geometry = new TextGeometry(
    text,
    {
      font: font,
      size: 0.25,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness:  0.03,
      bevelSize: 0.03,
      bevelOffset: 0.005,
      // bevelSegments: 15
    }
  );
  
  // 위의 4줄을 한줄로 표현 가능
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: "#689F38",
    roughness: 0.3,
    metalness: 0.7
  });

  const mesh = new THREE.Mesh(geometry, material);

  // 처음에 안보이게
  // mesh.visible = false;

  mesh.position.set(x, y, z)
  mesh.rotation.set(THREE.MathUtils.degToRad(angleX), THREE.MathUtils.degToRad(angleY), THREE.MathUtils.degToRad(angleZ));
  mesh.name = name

  return mesh
}

/** 조명 커스텀 함수 return => light */
export const SetupLight = (color:THREE.ColorRepresentation, intensity:number, position:THREE.Vector3, targetPosition:THREE.Vector3) => {
  
  const light = new THREE.DirectionalLight(color, intensity);

  light.position.copy(position);
  light.target.position.copy(targetPosition);
  light.shadow.camera.top = light.shadow.camera.right = 6;
  light.shadow.camera.bottom = light.shadow.camera.left = -6;

  // 그림자 품질향상
  light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;

  // 그림자의 외곽을 블러링
  light.shadow.radius = 3;

  // 그림자 여부
  light.castShadow = true;
  return light
};

/** 카메라 커스텀 함수 */
export const SetupCamera = (fov:number, near:number, far:number, position:THREE.Vector3, rotation:THREE.Vector3, look:THREE.Vector3) => {
  const cam = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
  
  cam.position.copy(position);
  cam.rotation.set(
    THREE.MathUtils.degToRad(rotation.x), 
    THREE.MathUtils.degToRad(rotation.y), 
    THREE.MathUtils.degToRad(rotation.z)
  );
  cam.lookAt(look);          // 카메라가 바라보는 곳이 0, 0, 0
  
  return cam
};

/** 마우스 그래그로 회전시킴 */
export const SetupControls = (camera:THREE.PerspectiveCamera, divContainer:HTMLDivElement, polorMin:number, polorMax:number, azimuthMin:number, azimuthMax:number ) => {
  const controls = new OrbitControls(camera, divContainer);
  controls.target.set(0, 0, 0)
  controls.enableDamping = true;        // 부드럽게 돌아가
  controls.enableZoom = false;
  // 위아래 카메라 제한
  controls.minPolarAngle = THREE.MathUtils.degToRad(polorMin);   // 0도 부터
  controls.maxPolarAngle = THREE.MathUtils.degToRad(polorMax);  // 60도 까지 회전 가능
  // 좌우 카메라 제한
  controls.minAzimuthAngle = THREE.MathUtils.degToRad(azimuthMin); // -15도 부터
  controls.maxAzimuthAngle = THREE.MathUtils.degToRad(azimuthMax);  // 15도 까지

  return controls
}
import * as THREE from "three";

import { useEffect, useRef } from "react";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import africa_Egypt from "../../assets/lowpoly/africa_Egypt.glb"
import asia_China from "../../assets/lowpoly/asia_China.glb"
import asia_India from "../../assets/lowpoly/asia_india.glb"
import asia_Japen from "../../assets/lowpoly/asia_Japen.glb"
import asia_Korea from "../../assets/lowpoly/asia_Korea.glb"
import bg from "../../assets/images/WorldBackgrorund.jpg"
import europe_France from "../../assets/lowpoly/europe_France.glb"
import europe_Italia from "../../assets/lowpoly/europe_Italia.glb"
import europe_Spain from "../../assets/lowpoly/europe_Spain.glb"
import europe_UK from "../../assets/lowpoly/europe_UK.glb"
import northAmerica_America from "../../assets/lowpoly/northAmerica_America.glb"

interface Props {
  countryName: string;
}

const CountryMap:React.FC<Props> = (countryName) => {
  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

    /** 배경함수 */
  const Background = () => {

    //2. 이미지를 배경으로 (방법 여러개지만, 여기서는 Texture 이용)
    const loader = new THREE.TextureLoader();

    loader.load(bg, texture => {
      scene.current!.background = texture;
      
      // SetupModel이 없는 상태에서 background를 받으려니 문제 생김!
      // => Backround를 호출할 때, 모델을 호출해주자
      // SetupModel();
    })
  } 

  
  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    // const width = divContainer.current?.clientWidth || 0;
    // const height = divContainer.current?.clientHeight || 0;
    // const cam = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    // cam.position.z = 6;
    // camera.current = cam;
    
    // scene.current?.add(cam)
    // const width = divContainer.current?.clientWidth || 0;
    // const height = divContainer.current?.clientHeight || 0;
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    cam.position.set(13, 10, 10);
    cam.rotation.set(0, 0, 0);
    cam.lookAt(13, 0, 10);          // 카메라가 바라보는 곳이 0, 0, 0
    
    camera.current = cam;
    
    scene.current?.add(cam)
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 3, 4);
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
    const items = [
      {url: africa_Egypt, name: "africa_Egypt"},
      {url: asia_China, name: "asia_China"},
      {url: asia_India, name: "asia_india"},
      {url: asia_Japen, name: "asia_Japen"},
      {url: asia_Korea, name: "asia_Korea"},
      {url: europe_France, name: "europe_France"},
      {url: europe_Italia, name: "europe_Italia"},
      {url: europe_Spain, name: "europe_Spain"},
      {url: europe_UK, name: "europe_UK"},
      {url: northAmerica_America, name: "northAmerica_America"},
    ]
    items.forEach((item, index) => {
      if (item.name === countryName.countryName) {
        gltfLoader.load(item.url, (glb) => {
          const obj3d:THREE.Group = glb.scene;
          obj3d.name = item.name
          obj3d.position.set(13, 0, 10);
          obj3d.scale.set(3, 3, 3);
          console.log(obj3d);
          scene.current?.add(obj3d);
          console.log(obj3d.name)
          if (camera.current) {
            ZoomFit(obj3d, camera.current)
          }
        })
      }
    })

    // cube.current = mesh;
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
  
  /** 마우스 그래그로 회전시킴 */
  const SetupControls = () => {
    if (camera.current) {
      controls.current = new OrbitControls(camera.current, divContainer.current!); // OrbitControls를 초기화합니다.
      controls.current.enableDamping = true;
    }
  }

  const render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    update(time);
    requestAnimationFrame(render);
  };

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

      Background();
      SetupCamera();
      SetupLight();
      SetupModel();
      // SetupControls();
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

export default CountryMap;
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
import northAmerica_America from "../../assets/lowpoly/Country_America.glb";

// import northAmerica_America from "../../assets/lowpoly/northAmerica_America.glb"



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
      
    })
  } 

  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    const cam = new THREE.PerspectiveCamera(37, window.innerWidth / window.innerHeight, 0.1, 100);
    cam.position.set(-0.11, 0.09, 1.8);
    cam.rotation.set(
      THREE.MathUtils.degToRad(0),
      THREE.MathUtils.degToRad(0),
      THREE.MathUtils.degToRad(0)
    );
    cam.lookAt(0, 0, 0);          // 카메라가 바라보는 곳이 0, 0, 0
    
    camera.current = cam;
    scene.current?.add(cam)
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    // Add lights
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    hemiLight.position.set( 0, 50, 0 );

    // Add hemisphere light to scene   
    scene.current?.add( hemiLight );
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    // const light = new THREE.AmbientLight(color,intensity)
    // const light = new THREE.HemisphereLight("#b0d8f5", "#bb7a1c", 1)

    light.position.set(-1, 3, 4);
    // scene.current?.add(light);
    // 카메라에 조명을 달았음
    camera.current?.add(light)
  };


  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    const items = [
      {url: africa_Egypt, name: "africa_Egypt", angle:[5, 15, 15], size:0.5},
      {url: asia_China, name: "asia_China", angle:[0, 10,-5], size:0.45},
      {url: asia_India, name: "asia_india", angle:[0, 0, 15], size:0.5},
      {url: asia_Japen, name: "asia_Japen", angle:[15, 10, 5], size:0.45},
      {url: asia_Korea, name: "asia_Korea", angle:[0, 10, 10], size:0.5},
      {url: europe_France, name: "europe_France", angle:[10, 10, 5], size:0.5},
      {url: europe_Italia, name: "europe_Italia", angle:[10, 0, 10], size:0.5},
      {url: europe_Spain, name: "europe_Spain", angle:[0, 10, 15], size:0.5},
      {url: europe_UK, name: "europe_UK", angle:[0, 10, 15], size:0.5},
      {url: northAmerica_America, name: "northAmerica_America", angle:[ 0, 265, 0], size: 0.5},
    ]
    items.forEach((item, index) => {
      if (item.name === countryName.countryName) {
        gltfLoader.load(item.url, (glb) => {
          const obj3d:THREE.Group = glb.scene;
          obj3d.name = item.name
          obj3d.children.forEach((obj, idx) => {
            console.log(obj.name)
          })
          console.log(obj3d)
          obj3d.position.set(0,-0.1, 0.5);
          obj3d.rotation.set(
            THREE.MathUtils.degToRad(item.angle[0]),
            THREE.MathUtils.degToRad(item.angle[1]),
            THREE.MathUtils.degToRad(item.angle[2])
          )
          obj3d.scale.set(1, 1, 1);
          
          // const helper = new THREE.AxesHelper
          // const shelper = new THREE.GridHelper
          // scene.current?.add(helper)
          // scene.current?.add(shelper)
          scene.current?.add(obj3d);
          // if (camera.current) {
          //   ZoomFit(obj3d, camera.current)
          // }
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
      controls.current.target.set(0,0,0)    // 카메라 회전점
      controls.current.enableDamping = true;        // 부드럽게 돌아가

      
  
      // 위아래 카메라 제한
      // controls.current.minPolarAngle = THREE.MathUtils.degToRad(0);   // 0도 부터
      // controls.current.maxPolarAngle = THREE.MathUtils.degToRad(60);  // 30도 까지 회전 가능
      // // 좌우 카메라 제한
      // controls.current.minAzimuthAngle = THREE.MathUtils.degToRad(-15); // -5도 부터
      // controls.current.maxAzimuthAngle = THREE.MathUtils.degToRad(15);  // 5도 까지
      // console.log(camera.current!.fov)
    }
  }

  const render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    update(time);
    requestAnimationFrame(render);
  };

  const update = (time: number) => {
    time *= 0.01;
    // console.log("객체 위치 : ",scene.current?.position)
    // console.log("객체 기울기 :",scene.current?.rotation)
    // console.log("카메라 위치 :", camera.current?.position)
    // console.log("카메라 기울기 :", camera.current?.rotation)
    // console.log("카메라 시각 :", camera.current?.lookAt)
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
      SetupControls();

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
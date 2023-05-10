import * as THREE from "three";

import { SetAnimation, SetupCamera, SetupControls, SetupLight } from "./ThreejsOptionComponent";
import { useEffect, useRef } from "react";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
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

interface Props {
  countryName: string;
}

const CountryMap:React.FC<Props> = (countryName) => {
  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);
  const selectedCountryRef = useRef<THREE.Object3D | null>(null);

  const outlinePassRef = useRef<OutlinePass | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const effectFXAARef = useRef<ShaderPass | null>(null);

  const assetSet = new Set(["paintBox", "historyBox", "quizBox", "foodBox", "personalityBox",  "newsBox"])
  let selectedName = "";


  /** 마우스 추적 */
  const SetupPicking = () => {
    const raycaster = new THREE.Raycaster();
    divContainer.current?.addEventListener("pointermove", OnPointerMove);
    raycasterRef.current = raycaster;
  }

  /** 마우스 추적하여 근처 대륙 객체 찾기 */
  const FindObject = (event:any) => {
    // 현재 마우스의 위치 찾기
    const mouse = new THREE.Vector2
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    raycasterRef.current?.setFromCamera(mouse, camera.current!)

    // 객체 이름이 asset인 객체만 고르기
    const assets:THREE.Object3D[] = [];
    scene.current?.children.forEach((obj3d) => {
      if (obj3d){
        obj3d.children.forEach((asset) => {
          if (assetSet.has(asset.name)) {
            assets.push(asset);
          }
        })
      }
    })
    return assets
  }

  /** 강조할 대륙 객체 추적 */
  const OnPointerMove = (event:PointerEvent) => {
    if (event.isPrimary === false) return;

    // 마우스 위치 추적하고 대륙 객체 저장
    const assets:THREE.Object3D[] = FindObject(event)!
    let selectedObject: THREE.Object3D;
    
    const intersects: any[] = raycasterRef.current!.intersectObjects(assets)


    // 나라 안에 위에서 충돌한 객체가 들어 있으면 호버
    if (intersects.length) {
      // console.log("intersects :", intersects)
      // console.log("assets : ", assets)
      assets.forEach((obj3d) => {
        if (intersects[0].object.name === obj3d.name){
          // console.log("int : ", intersects[0].object.name)
          // console.log("ass : ", obj3d.name)
          selectedObject = obj3d;
        }
      });
  
      // 이전 호버효과 초기화 
      if (selectedName && selectedName !== selectedObject!.name) {
        selectedName = selectedObject!.name

        SetAnimation(selectedObjectRef.current!.position, selectedObjectRef.current!.position.x, selectedObject!.position.y, selectedObjectRef.current!.position.z, 1)
      }

      // 해당하는 에셋 호버 효과 
      SetAnimation(selectedObject!.position, selectedObject!.position.x, selectedObject!.position.y, selectedObject!.position.z, 1)
      
      // 해당하는 에셋 강조 효과 
      outlinePassRef.current!.edgeStrength = 25;  
      outlinePassRef.current!.selectedObjects = [ selectedObject! ];
      selectedObjectRef.current = selectedObject!;
      return;
    }
    
    // // 마우스가 대륙에 있지 않으면 호버 초기화
    // else if (selectedObjectRef.current) {
    //   // 줌 아웃 상태
    //     SetAnimation(selectedObjectRef.current.position, selectedObjectRef.current.position.x, selectedObject!.position.y, selectedObjectRef.current.position.z, 1)

    // }
    
    outlinePassRef.current!.selectedObjects = [];
    
  }
  
  /** 객체 강조 후처리 */
  const SetupPostProcess = () => {
    const composer = new EffectComposer(renderer.current!);

    const renderPass = new RenderPass(scene.current!, camera.current!);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene.current!, camera.current!);
    composer.addPass(outlinePass);

    const effetFXAA = new ShaderPass(FXAAShader);
    effetFXAA.uniforms["resolution"].value.set(1/window.innerWidth, 1/window.innerHeight);
    composer.addPass(effetFXAA);

    outlinePassRef.current = outlinePass;
    composerRef.current = composer;
    effectFXAARef.current = effetFXAA;

  }
  

  /** 배경함수 */
  const Background = () => {

    //2. 이미지를 배경으로 (방법 여러개지만, 여기서는 Texture 이용)
    const loader = new THREE.TextureLoader();

    loader.load(bg, texture => {
      scene.current!.background = texture;
      
    })
  } 

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
            if (assetSet.has(obj.name)) {
              obj.children.forEach((children) => {
                children.name = obj.name
              })
            }
          })
          obj3d.position.set(0,-0.1, 0.5);
          obj3d.rotation.set(
            THREE.MathUtils.degToRad(item.angle[0]),
            THREE.MathUtils.degToRad(item.angle[1]),
            THREE.MathUtils.degToRad(item.angle[2])
          )
          obj3d.scale.set(1, 1, 1);
          
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
  const Resize = () => {
    const width = divContainer.current?.clientWidth || 0;
    const height = divContainer.current?.clientHeight || 0;

    if (camera.current !== null) {
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
    }
    renderer.current?.setPixelRatio(window.devicePixelRatio);
    renderer.current?.setSize(width, height);

    composerRef.current?.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)

    effectFXAARef.current?.uniforms["resolution"].value.set(1/(window.innerWidth*window.devicePixelRatio), 1/(window.innerHeight*window.devicePixelRatio))

  };
  
  const render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    update(time);
    composerRef.current?.render();
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

      window.addEventListener("resize", Resize);
      SetupPicking();


      const cam = SetupCamera(37, 0.1, 25, new THREE.Vector3(-0.11, 0.09, 1.8), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
      camera.current = cam
      scene.current.add(cam)
      controls.current =  SetupControls(camera.current!, divContainer.current!, 0, 360, -180, 180);

      // Add lights
      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
      hemiLight.position.set( 0, 50, 0 );
      // Add hemisphere light to scene   
      scene.current?.add( hemiLight );
      const light = SetupLight(0xffffff, 1.5, new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, 0, 0) );
      scene.current.add(light.target)
      camera.current?.add(light)

      Background();
      SetupModel();
      SetupPostProcess();

      window.onresize = Resize;
      Resize();

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
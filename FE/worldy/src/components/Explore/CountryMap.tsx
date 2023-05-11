import * as THREE from 'three';

import { SetAnimation, SetupCamera, SetupControls, SetupLight } from "./ThreejsOptionComponent";
import { useEffect, useMemo, useRef, useState } from "react";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import africa_Egypt from '../../assets/lowpoly/Country_America.glb';
import asia_China from '../../assets/lowpoly/Country_America.glb';
import asia_India from '../../assets/lowpoly/Country_America.glb';
import asia_Japen from '../../assets/lowpoly/Country_America.glb';
import asia_Korea from '../../assets/lowpoly/Country_America.glb';
import back from '../../assets/lowpoly/back.glb';
import bg from '../../assets/images/WorldBackgrorund.jpg';
import europe_France from '../../assets/lowpoly/Country_America.glb';
import europe_Italia from '../../assets/lowpoly/Country_America.glb';
import europe_Spain from '../../assets/lowpoly/Country_America.glb';
import europe_UK from '../../assets/lowpoly/Country_America.glb';
import northAmerica_America from '../../assets/lowpoly/Country_America.glb';
import { useNavigate } from 'react-router';

interface Props {
  countryName: string;
  selectAsset: string;
  GetSelectAssetName: (name:string) => void;
};

interface AssetsType {
  [key: string]: string;
}


const CountryMap = ({countryName, selectAsset, GetSelectAssetName}:Props) => {
  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  // const controls = useRef<OrbitControls |null>(null);

  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);
  // const selectedCountryRef = useRef<THREE.Object3D | null>(null);

  const outlinePassRef = useRef<OutlinePass | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const effectFXAARef = useRef<ShaderPass | null>(null);

  const navigate = useNavigate();

  const assetSet = new Set(["paintBox", "historyBox", "quizBox", "foodBox", "personalityBox",  "newsBox", "back"])
  const assetObject:AssetsType = {
    paintBox: "🖼틀린 그림 찾기🖼",
    historyBox: "🧭역사에 대해 알아보자!",
    quizBox: "🎁퀴즈 풀고 Level Up!🎁",
    foodBox: "🍜🍛🍣🍻",
    personalityBox: "👴🤴인물을 알아보자!👳‍♂️🎅",
    newsBox: "📰오늘의 뉴스📰"
  }
  let selectedName:string = "";
  let selectTmp:boolean = false
  /** 마우스 추적 */
  const SetupPicking = () => {
    const raycaster = new THREE.Raycaster();
    divContainer.current?.addEventListener('pointermove', OnPointerMove);
    divContainer.current?.addEventListener('click', OnClick);
    raycasterRef.current = raycaster;
  };

  /** 마우스 추적하여 근처 대륙 객체 찾기 */
  const FindObject = (event: any) => {
    // 현재 마우스의 위치 찾기
    const mouse = new THREE.Vector2();
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycasterRef.current?.setFromCamera(mouse, camera.current!);

    // 객체 이름이 asset인 객체만 고르기
    const assets: THREE.Object3D[] = [];
    scene.current?.children.forEach((obj3d) => {
      if (obj3d) {
        obj3d.children.forEach((asset) => {
          if (assetSet.has(asset.name)) {
            assets.push(asset);
          }
        });
      }
    });
    return assets;
  };

  /** 강조할 대륙 객체 추적 */
  const OnPointerMove = (event: PointerEvent) => {
    if (event.isPrimary === false) return;
    if (selectTmp) return;
     
    // 마우스 위치 추적하고 대륙 객체 저장
    const assets: THREE.Object3D[] = FindObject(event)!;
    let selectedObject: THREE.Object3D;

    const intersects: any[] = raycasterRef.current!.intersectObjects(assets);

    // 나라 안에 위에서 충돌한 객체가 들어 있으면 호버
    if (intersects.length) {
      assets.forEach((obj3d) => {
        if (intersects[0].object.name === obj3d.name) {
          selectedObject = obj3d;
        }
      });
      selectedName = selectedObject!.name;

      // 해당하는 에셋 호버 효과
      SetAnimation(
        selectedObject!.position,
        selectedObject!.position.x,
        selectedObject!.position.y,
        selectedObject!.position.z,
        1
      );

      // 해당하는 에셋 강조 효과
      outlinePassRef.current!.edgeStrength = 25;
      outlinePassRef.current!.selectedObjects = [selectedObject!];
      selectedObjectRef.current = selectedObject!;
      return;
    }

    selectedName = '';
    outlinePassRef.current!.selectedObjects = [];
  };

  /** 객체 강조 후처리 */
  const SetupPostProcess = () => {
    const composer = new EffectComposer(renderer.current!);

    const renderPass = new RenderPass(scene.current!, camera.current!);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene.current!,
      camera.current!
    );
    composer.addPass(outlinePass);

    const effetFXAA = new ShaderPass(FXAAShader);
    effetFXAA.uniforms['resolution'].value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    composer.addPass(effetFXAA);

    outlinePassRef.current = outlinePass;
    composerRef.current = composer;
    effectFXAARef.current = effetFXAA;
  };

  /** 마우스 한번 클릭 */
  const OnClick = (event:any) => {
    const name:string = selectedName;
    // const moveCountry = name;
    console.log(selectTmp)
    if (assetSet.has(name)) {
      if (name === "back") {
        alert("대륙으로 이동합니다")
        navigate("/explore")
      }
      else {
        if (selectTmp === false) {
          alert(`${assetObject[name]}`)
          GetSelectAssetName(name)
          selectTmp = true;
        } else {
          selectTmp = false;
          return
        }
      }
    } else {
      // alert(`오픈 예정입니다!😉`)
    }
    // 클릭 이벤트 처리
    console.log('click');
  };

  /** 배경함수 */
  const Background = () => {
    //2. 이미지를 배경으로 (방법 여러개지만, 여기서는 Texture 이용)
    const loader = new THREE.TextureLoader();

    loader.load(bg, (texture) => {
      scene.current!.background = texture;
    });
  };

  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    const items = [
      {
        url: africa_Egypt,
        name: 'africa_Egypt',
        angle: [0, 265, 0],
        size: 0.5,
      },
      { url: asia_China, name: 'asia_China', angle: [0, 265, 0], size: 0.5 },
      { url: asia_India, name: 'asia_india', angle: [0, 265, 0], size: 0.5 },
      { url: asia_Japen, name: 'asia_Japen', angle: [0, 265, 0], size: 0.5 },
      { url: asia_Korea, name: 'asia_Korea', angle: [0, 265, 0], size: 0.5 },
      {
        url: europe_France,
        name: 'europe_France',
        angle: [0, 265, 0],
        size: 0.5,
      },
      {
        url: europe_Italia,
        name: 'europe_Italia',
        angle: [0, 265, 0],
        size: 0.5,
      },
      {
        url: europe_Spain,
        name: 'europe_Spain',
        angle: [0, 265, 0],
        size: 0.5,
      },
      { url: europe_UK, name: 'europe_UK', angle: [0, 265, 0], size: 0.5 },
      {
        url: northAmerica_America,
        name: 'northAmerica_America',
        angle: [0, 265, 0],
        size: 0.5,
      },
    ];
    items.forEach((item, index) => {
      if (item.name === countryName) {
        gltfLoader.load(item.url, (glb) => {
          const obj3d: THREE.Group = glb.scene;
          obj3d.name = item.name;
          obj3d.children.forEach((obj, idx) => {
            obj.receiveShadow = true;
            obj.castShadow = true; // 그림자 주기
            if (assetSet.has(obj.name)) {
              obj.children.forEach((children) => {
                children.name = obj.name;
                children.receiveShadow = true;
                children.castShadow = true;
              });
            } else if (obj.name === 'ground') {
              obj.children.forEach((children) => {
                children.receiveShadow = true;
                // children.castShadow =true;
              });
            } else {
              obj.children.forEach((children) => {
                children.receiveShadow = false;
                children.castShadow = false;
              });
            }
          });
          obj3d.position.set(0, -0.1, 0.5);
          obj3d.rotation.set(
            THREE.MathUtils.degToRad(item.angle[0]),
            THREE.MathUtils.degToRad(item.angle[1]),
            THREE.MathUtils.degToRad(item.angle[2])
          );
          obj3d.scale.set(1, 1, 1);
          obj3d.receiveShadow = true;
          scene.current?.add(obj3d);
        });
      }
    });

    // gltfLoader.load(back, (glb)=>{
    //   const iconObj = glb.scene;
    //   // iconObj.name = "back"
    //   // iconObj.position.set(0,0, 0);
    //   // iconObj.rotation.set(
    //   //   THREE.MathUtils.degToRad(0),
    //   //   THREE.MathUtils.degToRad(0),
    //   //   THREE.MathUtils.degToRad(0)
    //   // )
    //   iconObj.scale.set(1, 1, 1);
    //   scene.current?.add(iconObj);
    // })
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

    composerRef.current?.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );

    effectFXAARef.current?.uniforms['resolution'].value.set(
      1 / (window.innerWidth * window.devicePixelRatio),
      1 / (window.innerHeight * window.devicePixelRatio)
    );
  };

  const render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    update(time);
    composerRef.current?.render();
    requestAnimationFrame(render);
  };

  const update = (time: number) => {
    time *= 0.01;

  };

  useEffect(() => {
    if (divContainer.current) {
      const ren = new THREE.WebGLRenderer({ antialias: true });
      ren.setPixelRatio(window.devicePixelRatio);
      //그림자 활성화
      ren.shadowMap.enabled = true;
      divContainer.current.appendChild(ren.domElement);
      renderer.current = ren;

      const scn = new THREE.Scene();
      scene.current = scn;

      window.addEventListener('resize', Resize);
      SetupPicking();

      const cam = SetupCamera(37, 0.1, 25, new THREE.Vector3(-0.11, 0.09, 1.8), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
      camera.current = cam
      scene.current.add(cam)

      // Add lights
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

      hemiLight.position.set(0, 50, 0);
      // Add hemisphere light to scene
      scene.current?.add(hemiLight);
      const light = SetupLight(
        '#CCF2F4',
        0.9,
        new THREE.Vector3(7, 15, 15),
        new THREE.Vector3(-2, 2, 2)
      );
      scene.current.add(light.target);
      camera.current?.add(light);

      Background();
      SetupModel();
      SetupPostProcess();

      window.onresize = Resize;
      Resize();

      requestAnimationFrame(render);
    }
  }, []);

  return <div style={{ width: '100%', height: 1000 }} ref={divContainer} />;
};

export default CountryMap;

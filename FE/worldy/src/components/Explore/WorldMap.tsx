import '../../styles/SweetAlertStyles.css';

import * as THREE from 'three';

import {
  CreateObject,
  CreateTextGeometry,
  SetAnimation,
  SetupCamera,
  SetupControls,
  SetupLight,
} from './ThreejsOptionComponent';
import { useEffect, useRef, useState } from 'react';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import LoaderPyramid from '../Loaders/LoaderPyramid';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import Swal from 'sweetalert2';
import africa from '../../assets/lowpoly/africa.glb';
import asia from '../../assets/lowpoly/asia.glb';
import basemap from '../../assets/lowpoly/basemap.glb';
import bg from '../../assets/images/WorldBackground.jpg';
import europe from '../../assets/lowpoly/europe.glb';
import { gsap } from 'gsap';
import northAmerica from '../../assets/lowpoly/northAmerica.glb';
import oceania from '../../assets/lowpoly/oceania.glb';
import southAmerica from '../../assets/lowpoly/southAmerica.glb';
import useLoadGlbsHook from '../../_hooks/useLoadGlbsHook';
import { useNavigate } from 'react-router';

export interface CountryType {
  [key: string]: string;
}

const WorldMap = () => {
  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls | null>(null);

  const raycasterRef = useRef<THREE.Raycaster | null>(null);
  const selectedObjectRef = useRef<THREE.Object3D | null>(null);
  const selectedCountryRef = useRef<THREE.Object3D | null>(null);

  const outlinePassRef = useRef<OutlinePass | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const effectFXAARef = useRef<ShaderPass | null>(null);

  const newPositionRef = useRef<THREE.Vector3 | null>(null);
  const centerBoxRef = useRef<THREE.Vector3 | null>(null);

  const continentSet = new Set([
    'africa',
    'asia',
    'europe',
    'northAmerica',
    'oceania',
    'southAmerica',
  ]);
  const countryObject: CountryType = {
    asia_Korea: '대한민국',
    asia_China: '중국',
    asia_india: '인도',
    asia_Japen: '일본',
    africa_Egypt: '이집트',
    europe_France: '프랑스',
    europe_Italia: '이탈리아',
    europe_Spain: '스페인',
    europe_UK: '영국',
    northAmerica_America: '미국',
  };
  let selectedName = '';
  let selectedName2: string = '';
  let clickTimeout: any = null;

  const myGlbList = {
    WorldAfrica: africa,
    WorldAsia: asia,
    WorldEurope: europe,
    WorldNorthAmerica: northAmerica,
    WorldOceania: oceania,
    WorldSouthAmerica: southAmerica,
    WorldBasemap: basemap,
  };

  // const isLoaded = useLoadGlbsHook(myGlbList);
  // const [loadedAll, setLoadedAll] = useState<boolean>(false);
  // useEffect(() => {
  //   if (isLoaded) {
  //     setTimeout(() => {
  //       setLoadedAll(true);
  //       //console.log(loadedImages);
  //     }, 1000);    }
  // }, [isLoaded]);

  const navigate = useNavigate();

  /** 마우스 추적 */
  const SetupPicking = () => {
    const raycaster = new THREE.Raycaster();
    divContainer.current?.addEventListener('pointermove', OnPointerMove);
    divContainer.current?.addEventListener('dblclick', OnDblClick);
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

    // // 화면에 광선을 표시
    // const arrowHelper = new THREE.ArrowHelper(
    //   raycasterRef.current!.ray.direction,
    //   camera.current!.position,
    //   100,
    //   Math.random() * 0xffffff
    // );
    // scene.current!.add(arrowHelper);

    // 객체 이름이 continent인 객체만 고르기
    const continents: THREE.Object3D[] = [];
    scene.current?.children.forEach((obj3d) => {
      if (continentSet.has(obj3d.name)) {
        continents.push(obj3d);
      }
    });
    return continents;
  };

  /** 마우스 한번 클릭 */
  const OnClick = (event: any) => {
    const name = countryObject[selectedName2];
    const moveCountry = selectedName2;

    if (!clickTimeout && selectedObjectRef.current!.userData.flag) {
      clickTimeout = setTimeout(() => {
        if (name) {
          // alert(`${name}으(로) 이동합니다.`)
          if (
            `${name}` === '미국' ||
            `${name}` === '영국' ||
            `${name}` === '스페인' ||
            `${name}` === '대한민국'
          ) {
            Swal.fire({
              title: `${name}으로 이동합니다.`,
              confirmButtonText: 'YES',
              buttonsStyling: false,
              showCancelButton: true,
              cancelButtonText: 'NO',
              customClass: {
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel',
              },
            }).then(function (result: any) {
              if (result.isConfirmed) {
                // ws.disconnect();
                navigate(`/explore/${moveCountry}`);
              } else {
                navigate('/explore');
              }
            });
          } else {
            Swal.fire({
              title: `${name}로 이동합니다.`,
              confirmButtonText: 'YES',
              buttonsStyling: false,
              showCancelButton: true,
              cancelButtonText: 'NO',
              customClass: {
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel',
              },
            }).then(function (result: any) {
              if (result.isConfirmed) {
                // ws.disconnect();
                navigate(`/explore/${moveCountry}`);
              } else {
                navigate('/explore');
              }
            });
          }
        } else {
          // alert(`오픈 예정입니다!😉`)
          Swal.fire({
            title: '오픈 예정입니다.',
            confirmButtonText: '확인',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'swal2-confirm',
            },
          });
          // .then(function(){
          //   navigate(`/explore/${moveCountry}`)
          // });
        }
        // 클릭 이벤트 처리
        console.log('click');
        clickTimeout = null;
      }, 250);
    }
  };

  /** 마우스 더블 클릭  */
  const OnDblClick = (event: any) => {
    if (event.isPrimary === false) return;

    // 클릭 이벤트 처리를 막음
    clearTimeout(clickTimeout);
    clickTimeout = null;

    // 마우스 위치 추적하고 대륙 객체 저장
    const continents: THREE.Object3D[] = FindObject(event);

    // 더블 클릭된 곳과 해당 객체의 충돌점을 찾아서 객체를 정확히 추적
    for (let i = 0; i < continents.length; i++) {
      const continent = continents[i];

      // 줌 아웃 상태에서 대륙이 마우스 위에 있으면 줌인
      const targets = raycasterRef.current?.intersectObject(continent);
      if (
        targets!.length > 0 &&
        selectedObjectRef.current?.userData.flag === false
      ) {
        // ZoomFit(continent, 45, 0.4)
        ZoomFit(continent, 45, 0.25);
        selectedObjectRef.current!.userData.flag = true;
        return;
      }
    }

    const basemap = scene.current?.getObjectByName('basemap');
    // 기본 상태로 돌아오기
    ZoomFit(basemap!, 70, 0.06);
    if (selectedObjectRef.current) {
      selectedObjectRef.current!.userData.flag = false;
    }
  };

  /** 확대 실행 학수 */
  const ZoomFit = (
    object3d: THREE.Object3D,
    viewAngle: number,
    viewdistance: number
  ) => {
    if (viewdistance < 0.1) {
      // 기본 상태

      const newPosition = new THREE.Vector3();
      newPosition.set(0, 10, 6);
      const centerBox = new THREE.Vector3();
      centerBox.set(0, 0, 0);

      newPositionRef.current = newPosition;
      centerBoxRef.current = centerBox;
    } else {
      // 대륙 확대

      const box = new THREE.Box3().setFromObject(object3d); // 객체를 감싸고 있는 box
      const sizeBox = box.getSize(new THREE.Vector3()).length(); // 객체의 정육각형 box의 대각선 길이
      const centerBox = box.getCenter(new THREE.Vector3()); // box의 중앙점
      // const direction = new THREE.Vector3(0, 1, 0);               // 처음에 설정된 벡터
      const direction = new THREE.Vector3(0, 1, 0); // 처음에 설정된 벡터
      // 처음에 설정된 벡터 (0, 1, 0)을 (1, 0 ,0)방향으로 viewAngle만큼 회전한 객체
      direction.applyAxisAngle(
        new THREE.Vector3(1, 0, 0),
        THREE.MathUtils.degToRad(viewAngle)
      );

      const halfSizeModel = sizeBox * viewdistance; // sizebox의 절반
      const halfFov = THREE.MathUtils.degToRad(camera.current!.fov * 0.3); // 카메라 fov의 절반
      const distance = halfSizeModel / Math.tan(halfFov); // 모델을 확대했을 때, 거리값

      // 카메라의 새로운 위치
      // 단위 벡터 * distance 로 방향벡터를 얻고
      // 위치 벡터인 centerBox를 추가하여
      // 정확한 위치를 얻어냄
      const newPosition = new THREE.Vector3().copy(
        direction.multiplyScalar(distance).add(centerBox)
      );

      newPositionRef.current = newPosition;
      centerBoxRef.current = centerBox;
    }

    const newPosition = newPositionRef.current;
    const centerBox = centerBoxRef.current;
    // 동적으로 변경
    gsap.to(camera.current!.position, {
      duration: 1.5,
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
    });
    gsap.to(controls.current!.target, {
      duration: 0.7,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      // 매 프레임마다 카메라의 위치 추적
      onUpdate: () => {
        camera.current!.lookAt(
          controls.current!.target.x,
          controls.current!.target.y,
          controls.current!.target.z
        );
      },
    });
  };

  /** 강조할 대륙 객체 추적 */
  const OnPointerMove = (event: PointerEvent) => {
    if (event.isPrimary === false) return;

    // 마우스 위치 추적하고 대륙 객체 저장
    const continents: THREE.Object3D[] = FindObject(event)!;
    let selectedObject: THREE.Object3D;

    const intersects: any[] =
      raycasterRef.current!.intersectObjects(continents);

    // 이 대륙안에 위에서 충돌한 객체가 들어 있고 줌 아웃 상태이면 호버 효과를 줘
    if (
      intersects.length &&
      (!selectedObjectRef.current ||
        selectedObjectRef.current?.userData.flag === false)
    ) {
      continents.forEach((obj3d) => {
        const result1 = intersects[0].object.name.substr(0, obj3d.name.length);
        if (result1 === obj3d.name) {
          selectedObject = obj3d;
          selectedObject.userData.flag = false;
        }
      });

      // 이전 호버효과 초기화
      if (selectedName && selectedName !== selectedObject!.name) {
        SetAnimation(
          selectedObjectRef.current!.position,
          selectedObjectRef.current!.position.x,
          0.3,
          selectedObjectRef.current!.position.z,
          1
        );
        SetAnimation(selectedObjectRef.current!.scale, 1, 1, 1, 1);
      }

      selectedName = selectedObject!.name;

      // 해당하는 대륙 호버 효과
      SetAnimation(
        selectedObject!.position,
        selectedObject!.position.x,
        0.5,
        selectedObject!.position.z,
        1
      );
      SetAnimation(selectedObject!.scale, 1.05, 1.05, 1.05, 1);
      divContainer.current!.style.cursor = 'pointer';

      // 해당하는 대륙 강조 효과
      outlinePassRef.current!.edgeStrength = 25;
      outlinePassRef.current!.selectedObjects = [selectedObject!];
      selectedObjectRef.current = selectedObject!;
      return;
    }

    // 마우스가 대륙에 있지 않으면 호버 초기화
    else if (selectedObjectRef.current) {
      // 줌 아웃 상태
      if (selectedObjectRef.current.userData.flag === false) {
        SetAnimation(
          selectedObjectRef.current.position,
          selectedObjectRef.current.position.x,
          0.3,
          selectedObjectRef.current.position.z,
          1
        );
        SetAnimation(selectedObjectRef.current.scale, 1, 1, 1, 1);
        if (selectedCountryRef.current) {
          SetAnimation(
            selectedCountryRef.current.position,
            selectedCountryRef.current.position.x,
            -0.28,
            selectedCountryRef.current.position.z,
            1
          );
          SetAnimation(
            selectedCountryRef.current!.scale,
            0.00071871024556458,
            0.00071871024556458,
            0.00071871024556458,
            1
          );
        }
      } else {
        // 줌인 상태
        const countries = selectedObjectRef.current!;
        let selectedCountry: THREE.Object3D;

        const intersect: any = raycasterRef.current!.intersectObject(countries);
        if (intersect.length) {
          countries.children.forEach((country) => {
            if (country.name === intersect[0].object.name) {
              selectedCountry = country;
            }
          });

          // 이전 호버효과 초기화
          if (selectedName2 && selectedName2 !== selectedCountry!.name) {
            SetAnimation(
              selectedCountryRef.current!.position,
              selectedCountryRef.current!.position.x,
              -0.28,
              selectedCountryRef.current!.position.z,
              1
            );
            SetAnimation(
              selectedCountryRef.current!.scale,
              0.00071871024556458,
              0.00071871024556458,
              0.00071871024556458,
              1
            );
          }
          selectedName2 = selectedCountry!.name;

          // 해당하는 대륙 호버 효과
          SetAnimation(
            selectedCountry!.position,
            selectedCountry!.position.x,
            -0.2,
            selectedCountry!.position.z,
            1
          );
          SetAnimation(selectedCountry!.scale, 0.00074, 0.00075, 0.00074, 1);
          divContainer.current!.style.cursor = 'pointer';

          // 해당하는 대륙 강조 효과
          outlinePassRef.current!.edgeStrength = 40;
          // outlinePassRef.current!.visibleEdgeColor = new THREE.Color(0x000000);
          outlinePassRef.current!.selectedObjects = [selectedCountry!];
          selectedCountryRef.current = selectedCountry!;

          divContainer.current?.addEventListener('click', OnClick);

          return;
        }
      }
    }
    outlinePassRef.current!.selectedObjects = [];
    divContainer.current!.style.cursor = 'auto';
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

  /** 배경함수 */
  const Background = () => {
    //2. 이미지를 배경으로 (방법 여러개지만, 여기서는 Texture 이용)
    const loader = new THREE.TextureLoader();

    loader.load(bg, (texture) => {
      scene.current!.background = texture;

      // SetupModel이 없는 상태에서 background를 받으려니 문제 생김!
      // => Backround를 호출할 때, 모델을 호출해주자
      // SetupModel();
    });
  };

  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    const items = [
      {
        url: africa,
        name: 'africa',
        textObject: CreateTextGeometry(
          '아프리카',
          -1.7,
          0.8,
          -0.3,
          'africatext',
          -90,
          0,
          0
        ),
      },
      {
        url: asia,
        name: 'asia',
        textObject: CreateTextGeometry(
          '아시아',
          2,
          0.8,
          -2.2,
          'asiatext',
          -90,
          0,
          0
        ),
      },
      {
        url: europe,
        name: 'europe',
        textObject: CreateTextGeometry(
          '유럽',
          -1.2,
          0.7,
          -3,
          'europetext',
          -90,
          0,
          0
        ),
      },
      {
        url: northAmerica,
        name: 'northAmerica',
        textObject: CreateTextGeometry(
          '북아메리카',
          -7.5,
          0.7,
          -3,
          'northAmericatext',
          -90,
          0,
          0
        ),
      },
      {
        url: oceania,
        name: 'oceania',
        textObject: CreateTextGeometry(
          '오세아니아',
          3.7,
          0.7,
          1.7,
          'oceaniatext',
          -90,
          0,
          0
        ),
      },
      {
        url: southAmerica,
        name: 'southAmerica',
        textObject: CreateTextGeometry(
          '남아메리카',
          -5.7,
          0.8,
          1,
          'southAmericatext',
          -90,
          0,
          0
        ),
      },
    ];

    // 대륙에 해당하는 그룹을 순회
    items.forEach((item, index) => {
      gltfLoader.load(item.url, (glb) => {
        const obj3d = glb.scene;
        obj3d.position.y = 0.3;
        obj3d.name = item.name;
        let tmpArray = obj3d;
        if (tmpArray.children) {
          // 해당 나라를 돌아
          tmpArray.children.forEach((element) => {
            // element.name = item.name
            if (element.children) {
              element.children.forEach((element2) => {
                element2.name = element.name;
              });
            }
          });
        }
        obj3d.position.set(2.4, 0.3, 0);
        // console.log(obj3d.position)
        // scale = (1, 1, 1)
        // console.log(obj3d.scale)
        scene.current?.add(obj3d);
        // scene.current?.add(item.textObject);
        // console.log(scene.current?.children)
      });
    });
    gltfLoader.load(basemap, (glb) => {
      const root = glb.scene;
      // x:0, y:0, z:0
      root.position.set(2.4, 0.3, 0);
      scene.current?.add(root);
      root.name = 'basemap';
    });

    // //tmpEurope
    // const tmpEurope = CreateObject(1.6, 4, -0.5, 0, -4, "flat", -90, 0, -50)
    // scene.current?.add(tmpEurope);

    // // northAmerica
    // const northAmericaText = CreateTextGeometry("북아메리카", -7.5, 0.7, -3, "text", -90, 0, 0)
    // scene.current?.add(northAmericaText);

    // //southAmerica
    // const southAmericaText = CreateTextGeometry("남아메리카", -5.7, 0.8, 1, "text", -90, 0 ,0)
    // scene.current?.add(southAmericaText);

    // //Africa
    // const africaText = CreateTextGeometry("아프리카", -1.7, 0.8, -0.3, "text", -90, 0 , 0)
    // scene.current?.add(africaText);

    // //Europe
    // const europeText = CreateTextGeometry("유럽", -1.2, 0.7, -3, "text", -90, 0, 0)
    // scene.current?.add(europeText);

    // //Asia
    // const asiaText = CreateTextGeometry("아시아", 2, 0.8, -2.2, "text", -90, 0 ,0)
    // scene.current?.add(asiaText);

    // //Oceania
    // const oceaniaText = CreateTextGeometry("오세아니아", 3.7, 0.7, 1.7, "text", -90, 0 ,0)
    // scene.current?.add(oceaniaText);
  };

  const Update = (time: number) => {
    time *= 0.01;
    controls.current?.update();
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

  const Render = (time: number) => {
    renderer.current?.render(scene.current!, camera.current!);
    Update(time);
    composerRef.current?.render();
    requestAnimationFrame(Render);
  };

  useEffect(() => {
    if (divContainer.current) {
      const ren = new THREE.WebGLRenderer({ antialias: true });
      ren.setPixelRatio(window.devicePixelRatio);

      // ren.shadowMap.enabled = true;
      ren.domElement.style.touchAction = 'none';
      divContainer.current.appendChild(ren.domElement);

      renderer.current = ren;

      const scn = new THREE.Scene();
      scene.current = scn;

      window.addEventListener('resize', Resize);
      SetupPicking();

      const cam = SetupCamera(
        37,
        0.1,
        50,
        new THREE.Vector3(0, 10, 6),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      );
      camera.current = cam;
      scene.current.add(cam);
      controls.current = SetupControls(
        camera.current!,
        divContainer.current!,
        50,
        50,
        0,
        0
      );

      // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);

      // hemiLight.position.set(-20, 50, 0);
      // // Add hemisphere light to scene
      // scene.current?.add(hemiLight);

      const light = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(-2, 10, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const light2 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(-2, 10, -6),
        new THREE.Vector3(0, 0, 0)
      );
      const light3 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(-2, -10, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const light4 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(-2, -10, -6),
        new THREE.Vector3(0, 0, 0)
      );

      const light5 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(2, 10, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const light6 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(2, 10, -6),
        new THREE.Vector3(0, 0, 0)
      );
      const light7 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(2, -10, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const light8 = SetupLight(
        '#0xffffff',
        0.5,
        new THREE.Vector3(2, -10, -6),
        new THREE.Vector3(0, 0, 0)
      );

      const right = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(-2, 2, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const right2 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(-2, 2, -6),
        new THREE.Vector3(0, 0, 0)
      );
      const right3 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(-2, -2, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const right4 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(-2, -2, -6),
        new THREE.Vector3(0, 0, 0)
      );

      const right5 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(2, 2, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const right6 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(2, 2, -6),
        new THREE.Vector3(0, 0, 0)
      );
      const right7 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(2, -2, 6),
        new THREE.Vector3(0, 0, 0)
      );
      const right8 = SetupLight(
        '#0xffffff',
        0.1,
        new THREE.Vector3(2, -2, -6),
        new THREE.Vector3(0, 0, 0)
      );

      scene.current.add(light.target);
      scene.current?.add(light);
      scene.current?.add(light2);
      scene.current?.add(light3);
      scene.current?.add(light4);
      scene.current?.add(light5);
      scene.current?.add(light6);
      scene.current?.add(light7);
      scene.current?.add(light8);

      scene.current?.add(right);
      scene.current?.add(right2);
      scene.current?.add(right3);
      scene.current?.add(right4);
      scene.current?.add(right5);
      scene.current?.add(right6);
      scene.current?.add(right7);
      scene.current?.add(right8);

      Background();
      SetupModel();
      SetupPostProcess();

      window.onresize = Resize;
      Resize();

      requestAnimationFrame(Render);
    }
  }, []);

  return (
    // <>
    //   {loadedAll ?  (
    <div
      className=''
      style={{ backgroundColor: 'grey', width: '100%', height: 1000 }}
      ref={divContainer}
    />
    //   ) : (
    //     <div className='w-full h-[1000px] bg-white'>
    //       < LoaderPyramid text='🧳세계 탐험 가보자고!🧳' />
    //     </div>
    //   )
    //   }
    // </>
  );
};

export default WorldMap;

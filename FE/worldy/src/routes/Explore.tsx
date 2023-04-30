import * as THREE from "three";

import { useEffect, useRef } from "react";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import bg from "../assets/images/WorldBackgrorund.jpg"
import worldmap from "../assets/lowpoly/WorldMap.glb"
import { gsap } from 'gsap';
import { Vector3 } from "@react-three/fiber";

const Explore = () => {

  const divContainer = useRef<HTMLDivElement>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls |null>(null);

  const raycasterRef = useRef<THREE.Raycaster | null>(null);

  const outlinePassRef = useRef<OutlinePass | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const effectFXAARef = useRef<ShaderPass | null>(null);
  
  const newPositionRef = useRef<Vector3 | null>(null);
  const centerBoxRef = useRef<Vector3 | null>(null);

  /** 마우스 추적 */
  const SetupPicking = () => {
    const raycaster = new THREE.Raycaster();
    // divContainer.current?.addEventListener("pointermove", OnPointerMove);
    divContainer.current?.addEventListener("dblclick", OnDblClick);
    raycasterRef.current = raycaster;
  }

  /** 마우스 더블 클릭  */
  const OnDblClick = (event:any) => {
    if (event.isPrimary === false) return;

    // 현재 마우스의 위치 찾기
    const mouse = new THREE.Vector2
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    raycasterRef.current?.setFromCamera(mouse, camera.current!)

    // 객체 이름이 continent인 객체만 고르기
    const continents:THREE.Object3D[] = [];
    scene.current?.traverse((obj3d) => {
      if (obj3d.name === "continent") {
        continents.push(obj3d);
      }
    })

    // 더블 클릭된 곳과 해당 객체의 충돌점을 찾아서 객체를 정확히 추적
    for(let i=0; i<continents.length; i++) {
      const continent = continents[i];

      const targets = raycasterRef.current?.intersectObject(continent);
      if(targets!.length > 0) {
        // 더블클릭된 차 확대 
        ZoomFit(continent, 30, 0.3)
        return;
      }
    }

    const worldmap = scene.current?.getObjectByName("worldmap");
    // // 무대 확대 코드
    ZoomFit(worldmap!, 70, 0.06)
  }

  /** 확대 실행 학수 */
  const ZoomFit = (object3d:THREE.Object3D, viewAngle:number, viewdistance:number) => {
    if (viewdistance < 0.1){
      const newPosition = new THREE.Vector3();
      newPosition.set(0, 10, 10);
      const centerBox = new THREE.Vector3();
      centerBox.set(0, 0, 0);

      newPositionRef.current = newPosition;
      centerBoxRef.current = centerBox;
    } else {

      // 객체를 감싸고 있는 box
      const box = new THREE.Box3().setFromObject(object3d);
    // 객체의 정육각형 box의 대각선 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    // box의 중앙점
    const centerBox = box.getCenter(new THREE.Vector3());

    // 처음에 설정된 벡터
    const direction = new THREE.Vector3(0, 1, 0);
    // 처음에 설정된 벡터 (0, 1, 0)을 (1, 0 ,0)방향으로 viewAngle만큼 회전한 객체
    direction.applyAxisAngle(new THREE.Vector3(1, 0, 0),
      THREE.MathUtils.degToRad(viewAngle));

    // sizebox의 절반
    const halfSizeModel = sizeBox * viewdistance;
    // 카메라 fov의 절반
    const halfFov = THREE.MathUtils.degToRad(camera.current!.fov * 0.3);
    // 모델을 확대했을 때, 거리값
    const distance = halfSizeModel / Math.tan(halfFov);
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

    // camera.current?.position.copy(newPosition);
    // 동적으로 변경
    gsap.to(camera.current!.position, {
      duration: 0.5,
      x: newPosition.x, y: newPosition.y, z: newPosition.z
    })

    // controls.current?.target.copy(centerBox);
    gsap.to(controls.current!.target, {
      duration: 0.5,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      // 매 프레임마다 카메라의 위치 추적
      onUpdate: () => {
        camera.current!.lookAt(
          controls.current!.target.x,
          controls.current!.target.y,
          controls.current!.target.z,
        )
      }
    })
    
  }

  /** 강조할 객체 추적 */
  const OnPointerMove = (event:PointerEvent) => {
    if (event.isPrimary === false) return;

    // 현재 마우스의 위치 찾기
    const mouse = new THREE.Vector2
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    raycasterRef.current?.setFromCamera(mouse, camera.current!)

    // 객체 이름이 continent인 객체만 고르기
    const continents:THREE.Object3D[] = [];
    scene.current?.traverse((obj3d) => {
      if (obj3d.name === "continent") {
        continents.push(obj3d);
      }
    })

    for(let i=0; i<continents.length; i++) {
      const continent = continents[i];
      const interescts = raycasterRef.current?.intersectObject(continent);

      if (interescts!.length > 0) {
        // 지정된 객체 중에 첫번째 선택
        const selectedObject = interescts![0].object;
        // 더 강한 효과
        outlinePassRef.current!.edgeStrength = 20;  
        outlinePassRef.current!.selectedObjects = [ selectedObject ];
      } else {
        // outlinePassRef.current!.selectedObjects = [];
      }
    }
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
        
        // SetupModel이 없는 상태에서 background를 받으려니 문제 생김!
        // => Backround를 호출할 때, 모델을 호출해주자
        SetupModel();
     })
  } 

  /** 카메라 커스텀 함수 */
  const SetupCamera = () => {
    // const width = divContainer.current?.clientWidth || 0;
    // const height = divContainer.current?.clientHeight || 0;
    const cam = new THREE.PerspectiveCamera(37, window.innerWidth / window.innerHeight, 0.1, 25);
    cam.position.set(0, 10, 10);      // 카메라의 위치는 7, 7, 0
    cam.rotation.set(0, 0, 0);
    cam.lookAt(0, 0, 0);          // 카메라가 바라보는 곳이 0, 0, 0
    
    camera.current = cam;

    scene.current?.add(cam)
  };

  /** 객체 생성 함수 */
  const CreateObject = (w:number, h:number, x:number, y:number, z:number, name:string, angleX:number, angleY:number, angleZ:number) => {
    const createGeometry = new THREE.PlaneGeometry(w, h);
    const createMaterial = new THREE.MeshBasicMaterial({
      color: "#2c3e50",
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

  /** 모델 커스텀 함수 */
  const SetupModel = () => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      worldmap,
      (glb) => {
        const root = glb.scene;
        scene.current?.add(root)
        root.name = "worldmap"
        // if (camera.current) {
        //   ZoomFit(root, camera.current)
        // }
      }
    )

    // northAmerica
    const northAmerica = CreateObject(5, 5, -8, 0.5, -3, "continent", -90, 0, 0)
    scene.current?.add(northAmerica);
    
    //southAmerica
    const southAmerica = CreateObject(3, 5, -6, 0.5, 2, "continent", -90, 0 ,0)
    scene.current?.add(southAmerica);

    //Africa
    const africa = CreateObject(4, 3.5, -2, 0.5, 0.5, "continent", -90, 0 ,-20)
    scene.current?.add(africa);

    //Europe
    const europe = CreateObject(3.5, 3.5, -1, 0.5, -3, "continent", -90, 0 ,-20)
    scene.current?.add(europe);

    //Asia
    const asia = CreateObject(5, 3, 2.5, 0.5, -2.5, "continent", -90, 0 ,70)
    scene.current?.add(asia);

    //Oceania
    const oceania = CreateObject(3, 4, 4, 0.5, 2, "continent", -90, 0 ,70)
    scene.current?.add(oceania);
  };

  /** 조명 커스텀 함수 */
  const SetupLight = () => {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);

    light.position.set(0, 5, 0);
    light.target.position.set(0, 0, 0);
    scene.current?.add(light.target);    // 조명의 위치와 조명이 가리키는 방향을 알려줌

    // scene.current?.add(light);
    // 카메라에 조명을 달았음
    camera.current?.add(light)
  };

  /** 마우스 그래그로 회전시킴 */
  const SetupControls = () => {
    if (camera.current) {
      controls.current = new OrbitControls(camera.current, divContainer.current!); // OrbitControls를 초기화합니다.
      controls.current.target.set(0, 0, 0)    // 카메라 회전점
      controls.current.enableDamping = true;        // 부드럽게 돌아가
      controls.current.minPolarAngle = THREE.MathUtils.degToRad(0);   // 0도 부터
      controls.current.maxPolarAngle = THREE.MathUtils.degToRad(60);  // 60도 까지 회전 가능
    }
  }

  const Update = (time: number) => {
    time *= 0.01;
    // cube.current!.rotation.x = time;
    // cube.current!.rotation.y = time;
    controls.current?.update()
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

      ren.shadowMap.enabled = true;
      ren.domElement.style.touchAction = "none";
      divContainer.current.appendChild(ren.domElement);

      
      renderer.current = ren;

      const scn = new THREE.Scene();
      scene.current = scn;

      window.addEventListener("resize", Resize);
      // divContainer.current.addEventListener("pointermove", OnPointerMove, false);
      SetupPicking();

      SetupCamera();
      SetupControls();
      SetupLight();
      SetupModel();
      Background();
      SetupPostProcess();
      
      window.onresize = Resize;
      Resize();

      requestAnimationFrame(Render);
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
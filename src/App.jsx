import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import SceneInit from './lib/SceneInit';
// import {TextGeometry} from './examples/jsm/geometries/TextGeometry.js'

let camera, scene, renderer;

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;


function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    let loadedModel;
    const glftLoader = new GLTFLoader();
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );


    // const grid = new THREE.GridHelper( 500, 10, 0xffffff, 0xffffff );
    // grid.material.opacity = 0.5;
    // grid.material.depthWrite = false;
    // grid.material.transparent = true;
    // test.scene.add( grid );


    test.scene.background = new THREE.Color( 0xbbbbbb );
    test.scene.environment = pmremGenerator.fromScene( environment ).texture;

    const spotLight = new THREE.SpotLight( 0xffffff,3,2 );
    spotLight.position.set( 50, 490, 40 );
    test.scene.add( spotLight );
    
    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    test.scene.add( spotLightHelper );

    const ktx2Loader = new KTX2Loader()
    .setTranscoderPath( 'js/libs/basis/' )
    .detectSupport( renderer );

    const loader = new GLTFLoader().setPath( './assets/Coffee/' );
    loader.setKTX2Loader( ktx2Loader );
    // loader.setMeshoptDecoder( MeshoptDecoder );
    loader.load( 'scene.gltf', function ( gltf ) {

      gltf.scene.position.y = -50;
      // gltf.scene.position.x = 200;
      var camera = new THREE.PerspectiveCamera(70, 
        window.innerWidth/window.innerHeight, 0.1, 1000 ); // Specify camera type like this
        camera.position.set(10,2.5,2.5); 
      test.scene.add( gltf.scene );
      
    insertText = new THREE.TextGeometry("GHello");


      test.scene.render();

  } );
  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.addEventListener( 'change', render ); // use if there is no animation loop
  // controls.minDistance = 400;
  // controls.maxDistance = 1000;
  // controls.target.set( 10, 90, - 16 );
  // controls.update();

  // window.addEventListener( 'resize', onWindowResize );

    // const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(500,50,5);

    // const lightHelper = new THREE.PointLightHelper(pointLight)
    // const gridHelper = new THREE.GridHelper(200,50);
    // test.scene.add(lightHelper,gridHelper);
    // // test.scene.add(lightHelper);
    // test.scene.add(pointLight);


    const animate = () => {
      if (test.scene) {
        // loadedModel.scene.rotation.x += 0.01;
        test.scene.rotation.y +=0.01;
        // test.scene.rotation.z +=0.01;
        // loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;

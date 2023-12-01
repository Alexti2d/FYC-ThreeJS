import * as THREE from "three";

import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
let camera, scene, renderer;
let group;

init();
render();

function init() {

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // Setting du renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // Creation du Cube
  const textureLoader = new THREE.TextureLoader();
  const geometryCube = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const materialCube = new THREE.MeshBasicMaterial({
    map: textureLoader.load("./textures/espaces.png")
  })
  const cube = new THREE.Mesh(geometryCube, materialCube);
  cube.position.set(0.7, -0.25, 0);
  scene.add(cube);


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 0;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();

  // On crée un groupe pour pouvoir controller plus facilement toutes les planches du bureau en meme temps
  group = new THREE.Group();
  scene.add(group);

  window.addEventListener("resize", onWindowResize);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}

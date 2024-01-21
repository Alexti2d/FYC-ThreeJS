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
  scene.background = new THREE.Color(0xbfe3dd);

  // Setting du renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // Creation du bureau


  window.addEventListener("resize", onWindowResize);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}

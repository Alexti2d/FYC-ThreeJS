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

  const textureLoader = new THREE.TextureLoader();
  const geometryTable = new THREE.BoxGeometry(1.5, 0.05, 0.6);
  const geometryPied = new THREE.BoxGeometry(0.05, 0.5, 0.5);
  const geometryFond = new THREE.BoxGeometry(1.4, 0.2, 0.05);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load("./textures/bois.jpg"),
  });
  const table = new THREE.Mesh(geometryTable, material);
  const pied1 = new THREE.Mesh(geometryPied, material);
  const pied2 = new THREE.Mesh(geometryPied, material);
  const fond = new THREE.Mesh(geometryFond, material);
  pied1.position.set(0.7, -0.25, 0);
  pied2.position.set(-0.7, -0.25, 0);
  fond.position.set(0, -0.2, -0.2);
  scene.add(table);
  scene.add(pied1);
  scene.add(pied2);
  scene.add(fond);


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

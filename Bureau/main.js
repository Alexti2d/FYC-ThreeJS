import * as THREE from "three";
import { Loader } from "three";

import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "./node_modules/three/examples/jsm/loaders/RGBELoader.js";
let camera, scene, renderer;
let group;

init();
render();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);
  document.addEventListener("pointermove", onPointerMove);
  // Chargement des objets 3D

  new RGBELoader()
    .setPath("textures/")
    .load("royal_esplanade_1k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;

      const gltfLoader = new GLTFLoader().setPath("obj/");

      gltfLoader.load("ecran.gltf", function (ecran) {
        ecran.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        ecran.scene.position.set(2.2, -0.87, -0.3);
        scene.add(ecran.scene);
        render();
      });

      gltfLoader.load("lampe.gltf", function (lampe) {
        lampe.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        lampe.scene.position.set(2, -0.87, -0.5);
        scene.add(lampe.scene);
        render();
      });

      gltfLoader.load("clavier.gltf", function (clavier) {
        clavier.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        clavier.scene.position.set(2.2, -0.87, -0.3);
        scene.add(clavier.scene);
        render();
      });

      gltfLoader.load("souris.gltf", function (souris) {
        souris.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        souris.scene.position.set(2.15, -0.87, -0.3);
        scene.add(souris.scene);
        render();
      });

      gltfLoader.load("tapis.gltf", function (tapis) {
        tapis.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        tapis.scene.position.set(2.15, -0.87, -0.3);
        scene.add(tapis.scene);
        render();
      });

      gltfLoader.load("potACrayon.gltf", function (potACrayon) {
        potACrayon.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
        potACrayon.scene.position.set(1.95, -0.87, -0.5);
        scene.add(potACrayon.scene);
        render();
      });
    });

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
    map: textureLoader.load("./obj/bois.jpg"),
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

  // Ajout de la lumiére

  const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
  let bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
  // let bulbMat = new THREE.MeshStandardMaterial({
  //   emissive: 0xffffee,
  //   emissiveIntensity: 1,
  //   color: 0x000000,
  // });
  // bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(0.27, 0.41, 0.02);
  bulbLight.castShadow = true;
  scene.add(bulbLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 0;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();

  group = new THREE.Group();
  scene.add(group);

  window.addEventListener("resize", onWindowResize);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selectedObject = null;
function onPointerMove(event) {
  if (selectedObject) {
    selectedObject.material.color.set("#69f");
    selectedObject = null;
  }

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObject(group, true);

  if (intersects.length > 0) {
    const res = intersects.filter(function (res) {
      return res && res.object;
    })[0];

    if (res && res.object) {
      selectedObject = res.object;
      selectedObject.material.color.set("#f00");
    }
  }
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

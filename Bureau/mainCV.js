// Bureau + CV

import * as THREE from "three";

import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "./node_modules/three/examples/jsm/loaders/RGBELoader.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js";

let camera, scene, renderer, renderer2;
let group;

var Element = function (x, y, z, ry) {
  var div = document.createElement("div");
  div.style.width = "505px";
  div.style.height = "300px";
  div.style.backgroundColor = "#000";

  var iframe = document.createElement("iframe");
  iframe.style.width = "505px";
  iframe.style.height = "300px";
  iframe.style.border = "0px";
  iframe.src = ["CV 3D/index.html"].join("");
  div.appendChild(iframe);

  var object = new CSS3DObject(div);
  object.position.set(x, y, z);
  object.rotation.y = ry;
  object.scale.set(0.001, 0.001, 0.001);

  return object;
};

var ElementFondCV = function (x, y, z, ry) {
  var fondCV = document.createElement("div");
  fondCV.style.width = "505px";
  fondCV.style.height = "300px";
  fondCV.style.backgroundColor = "#000";
  var fond = new CSS3DObject(fondCV);
  fond.rotation.y = ry;
  fond.position.set(x, y, z);
  fond.scale.set(0.001, 0.001, 0.001);
  return fond;
};

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
  camera.position.set(-1, 0.8, 0.9);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
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
  renderer.shadowMap.enabled = true;

  container.appendChild(renderer.domElement);
  container.appendChild(renderer2.domElement);

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

  CreationMurBureau();

  // Création du CV

  var group = new THREE.Group();
  group.add(new Element(-0.275, 0.26, -0.06, 0.075));
  group.add(new ElementFondCV(-0.275, 0.26, -0.062, 0.075));
  scene.add(group);

  var blocker = document.getElementById("blocker");
  blocker.style.display = "none";

  // Ajout de la lumiére

  // const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
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

  const controls = new OrbitControls(camera, renderer2.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();

  group = new THREE.Group();
  scene.add(group);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
}

function CreationMurBureau() {
  const geometryMurFond = new THREE.BoxGeometry(4.5, 2, 0.1);
  const geometrySol = new THREE.BoxGeometry(4.5, 0.2, 1.8);
  const geometryMurDroit1 = new THREE.BoxGeometry(0.1, 2, 0.4);
  const geometryMurDroit2 = new THREE.BoxGeometry(0.1, 0.6, 1.8);
  const couleur1 = new THREE.MeshBasicMaterial({
    color: 0xd9dade,
  });
  const couleur2 = new THREE.MeshBasicMaterial({
    color: 0xc7cbd1,
  });
  const couleur3 = new THREE.MeshBasicMaterial({
    color: 0xccced1,
  });
  const murFond = new THREE.Mesh(geometryMurFond, couleur2);
  const Sol = new THREE.Mesh(geometrySol, couleur1);
  const murDroit1 = new THREE.Mesh(geometryMurDroit1, couleur3);
  const murDroit2 = new THREE.Mesh(geometryMurDroit2, couleur3);
  murFond.position.set(-1, 0.5, -0.45);
  Sol.position.set(-1, -0.6, 0.4);
  murDroit1.position.set(1.2, 0.5, -0.3);
  murDroit2.position.set(1.2, -0.2, 0.4);
  scene.add(murFond);
  scene.add(Sol);
  scene.add(murDroit1);
  scene.add(murDroit2);
}

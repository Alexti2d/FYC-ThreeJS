import * as THREE from "three";

import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer;

init();

animate();

function init() {

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        20
    );
    camera.position.set(-1.8, 0.6, 2.7);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(6, 10, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);


    // Setting du renderer

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    const controls = new OrbitControls(camera, renderer.domElement);

    container.appendChild(renderer.domElement);

    // Creation du bureau
    CreationBureau();
    CreationMurBureau();

    window.addEventListener("resize", onWindowResize);
}

function CreationMurBureau() {
    const geometryMurFond = new THREE.BoxGeometry(4.5, 2, 0.1);
    const geometrySol = new THREE.BoxGeometry(4.5, 0.2, 1.8);
    const geometryMurDroit1 = new THREE.BoxGeometry(0.1, 2, 0.4);
    const geometryMurDroit2 = new THREE.BoxGeometry(0.1, 0.6, 1.8);

    // const murFond = new THREE.Mesh(geometryMurFond, couleur2);
    const murFond = new THREE.Mesh(
        geometryMurFond,
        new THREE.MeshPhongMaterial({color: 0xcccbff})
    );
    murFond.receiveShadow = true;
    // const sol = new THREE.Mesh(geometrySol, couleur1);
    const sol = new THREE.Mesh(
        geometrySol,
        new THREE.MeshPhongMaterial({color: 0xbebebe})
    );
    sol.receiveShadow = true;
    const murDroit1 = new THREE.Mesh(
        geometryMurDroit1,
        new THREE.MeshPhongMaterial({color: 0xeeeeee})
    );
    murDroit1.receiveShadow = true;
    const murDroit2 = new THREE.Mesh(
        geometryMurDroit2,
        new THREE.MeshPhongMaterial({color: 0xeeeeee})
    );
    murDroit2.receiveShadow = true;
    murFond.position.set(-1, 0.5, -0.45);
    sol.position.set(-1, -0.6, 0.4);
    murDroit1.position.set(1.2, 0.5, -0.3);
    murDroit2.position.set(1.2, -0.2, 0.4);


    scene.add(murFond);
    scene.add(sol);
    scene.add(murDroit1);
    scene.add(murDroit2);
}

function CreationBureau() {

    // On crée la géométrie
    const geometryTable = new THREE.BoxGeometry(1.5, 0.05, 0.6);
    const geometryPied = new THREE.BoxGeometry(0.05, 0.5, 0.5);
    const geometryFond = new THREE.BoxGeometry(1.4, 0.2, 0.05);

    // On crée un material
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({
        map: textureLoader.load("./textures/bois.jpg"),
    });

    // Création des Mesh
    const table = new THREE.Mesh(
        geometryTable,
        material
    );
    const pied1 = new THREE.Mesh(
        geometryPied,
        material
    );
    const pied2 = new THREE.Mesh(
        geometryPied,
        material
    );
    const fond = new THREE.Mesh(
        geometryFond,
        material
    );

    // positionement des Mesh
    pied1.position.set(0.7, -0.25, 0);
    pied2.position.set(-0.7, -0.25, 0);
    fond.position.set(0, -0.2, -0.2);

    // On veut qu'il reçoive les ombres et qu'il en émette
    table.castShadow = true;
    table.receiveShadow = true;
    pied1.castShadow = true;
    pied1.receiveShadow = true;
    pied2.castShadow = true;
    pied2.receiveShadow = true;

    //  On les ajoute à la scène
    scene.add(table);
    scene.add(pied1);
    scene.add(pied2);
    scene.add(fond);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
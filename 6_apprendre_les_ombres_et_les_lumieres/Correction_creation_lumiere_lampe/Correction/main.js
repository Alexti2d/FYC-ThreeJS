import * as THREE from "three";

import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import {RGBELoader} from "./node_modules/three/examples/jsm/loaders/RGBELoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

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

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(6, 10, 10);

    // Permet que la lumiére crée des ombres

    dirLight.castShadow = true;
    scene.add(dirLight);


    // Setting du renderer

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setPixelRatio(window.devicePixelRatio);
    const controls = new OrbitControls(camera, renderer.domElement);

    container.appendChild(renderer.domElement);

    // Creation du bureau
    CreationBureau();
    CreationMurBureau();
    ImportObjet();

    // Ajout d'une lumiére de lampe
    const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
    let bulbLight = new THREE.PointLight(0xffee88, 1, 100, 1);
    let bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000,
    });
    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
    bulbLight.position.set(0.27, 0.41, 0.02);
    bulbLight.castShadow = true;
    scene.add(bulbLight);

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

function ImportObjet() {
    new RGBELoader()
        .setPath("textures/")
        .load("royal_esplanade_1k.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;

            const gltfLoader = new GLTFLoader().setPath("obj/");

            gltfLoader.load("ecran.gltf", function (ecran) {
                ecran.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                ecran.scene.position.set(2.2, -0.87, -0.3);
                ecran.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(ecran.scene);
            });

            gltfLoader.load("lampe.gltf", function (lampe) {
                lampe.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                lampe.scene.position.set(2, -0.87, -0.5);
                lampe.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(lampe.scene);
            });

            gltfLoader.load("clavier.gltf", function (clavier) {
                clavier.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                clavier.scene.position.set(2.2, -0.87, -0.3);
                clavier.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(clavier.scene);
            });

            gltfLoader.load("souris.gltf", function (souris) {
                souris.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                souris.scene.position.set(2.15, -0.87, -0.3);
                souris.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(souris.scene);
            });

            gltfLoader.load("tapis.gltf", function (tapis) {
                tapis.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                tapis.scene.position.set(2.15, -0.87, -0.3);
                tapis.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(tapis.scene);
            });

            gltfLoader.load("potACrayon.gltf", function (potACrayon) {
                potACrayon.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
                potACrayon.scene.position.set(1.95, -0.87, -0.5);
                potACrayon.scene.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
                scene.add(potACrayon.scene);
            });
        });
}

function CreationBureau() {

    // On crée la géométrie
    const geometryTable = new THREE.BoxGeometry(1.5, 0.05, 0.6);
    const geometryPied = new THREE.BoxGeometry(0.05, 0.5, 0.5);
    const geometryFond = new THREE.BoxGeometry(1.4, 0.2, 0.05);

    // On crée un matériaux
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

    // On veut qu'il recoivent les ombre et qu'il en emmete
    table.castShadow = true;
    table.receiveShadow = true;
    pied1.castShadow = true;
    pied1.receiveShadow = true;
    pied2.castShadow = true;
    pied2.receiveShadow = true;

    //  On les ajoutes a la scéne
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
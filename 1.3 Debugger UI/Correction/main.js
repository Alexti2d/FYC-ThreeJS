import {
    BoxGeometry,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
    BufferGeometry,
    Line
} from 'Three';

import {OrbitControls} from "three/addons/controls/OrbitControls"
import * as dat from "dat.gui";

const renderer = new WebGLRenderer();
const scene = new Scene();
const gui = new dat.GUI();
let camera;
camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 50 );
camera.lookAt( 0, 0, 0 );

let cube;
let line1;
let line2;
let controls;

let params = {
    rotationIncrementCube: 0.01,
    rotationIncrementLine1: 0.01,
    rotationIncrementLine2: 0.01,
}

const animateCubeAndLine = () => {
    cube.rotation.x += params.rotationIncrementCube;
    cube.rotation.y += params.rotationIncrementCube;

    line1.rotation.x += params.rotationIncrementLine1;
    line2.rotation.y += params.rotationIncrementLine2;

    requestAnimationFrame(animateCubeAndLine);
    renderer.render(scene, camera);
}


const setUpForCube = () => {
    const boxGeometry = new BoxGeometry(5, 5, 5);
    const materialCube = new MeshBasicMaterial({ color: 0x00aa00 });
    cube = new Mesh(boxGeometry, materialCube);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    const cubeFolder = gui.addFolder('Design du cube')

    const cubeOptions = {
        color: "#000",
        visible: true,
        wireframe: false,
        x: 0,
        y: 0,
        z: 0,
    }

    cubeFolder.addColor(cubeOptions, 'color').onChange(function(e) {
        cube.material.color.set(e)
    })

    cubeFolder.add(cubeOptions, 'visible').onChange(function(e) {
        cube.material.visible = e
    })

    cubeFolder.add(cubeOptions, 'wireframe').onChange(function(e) {
        cube.material.wireframe = e
    })

    cubeFolder.add(cubeOptions, 'x', -10, 10).onChange(function(e) {
        cube.position.x = e
    })

    cubeFolder.add(cubeOptions, 'y', -10, 10).onChange(function(e) {
        cube.position.y = e
    })

    cubeFolder.add(cubeOptions, 'z', -10, 10).onChange(function(e) {
        cube.position.z = e
    })

} 

const setUpForLine = () => {
    const materialLine = new LineBasicMaterial({color: 0x00aaddd});
    const materialLine2 = new LineBasicMaterial({color: 0x00aaddd});

    const points = [];
    points.push(new Vector3(-5, -5, 0));
    points.push(new Vector3(-5, 5, 0));
    points.push(new Vector3(5, 5, 0));
    points.push(new Vector3(5, -5, 0));
    points.push(new Vector3(-5, -5, 0));

    const bufferGeometry = new BufferGeometry().setFromPoints(points);

    line1 = new Line(bufferGeometry, materialLine);
    line2 = new Line(bufferGeometry, materialLine2);

    line2.rotation.set(0, 0, 15);

    scene.add(line1);
    scene.add(line2);

    const line1Folder = gui.addFolder("Design de la ligne 1")
    const line2Folder = gui.addFolder("Design de la ligne 2")

    const line1Options = {
        color: '#000' 
    }

    const line2Options = {
        color: '#000' 
    }

    line1Folder.addColor(line1Options, 'color').onChange(function(e) {
        line1.material.color.set(e)
    })

    line2Folder.addColor(line2Options, 'color').onChange(function(e) {
        line2.material.color.set(e)
    })

}



const setUpCustomThings = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement)
}

setUpForLine();
setUpForCube();
setUpCustomThings();
animateCubeAndLine();
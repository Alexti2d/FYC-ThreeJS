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

const renderer = new WebGLRenderer();
const scene = new Scene();
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



const setUpForCube = () => {
    const boxGeometry = new BoxGeometry(5, 5, 5);
    const materialCube = new MeshBasicMaterial({ color: 0x00aa00 });
    cube = new Mesh(boxGeometry, materialCube);
    cube.position.set(0, 0, 0);
    scene.add(cube);
} 

const setUpForLine = () => {
    const materialLine = new LineBasicMaterial({color: 0x00aaddd});

    const points = [];
    points.push(new Vector3(-5, -5, 0));
    points.push(new Vector3(-5, 5, 0));
    points.push(new Vector3(5, 5, 0));
    points.push(new Vector3(5, -5, 0));
    points.push(new Vector3(-5, -5, 0));

    const bufferGeometry = new BufferGeometry().setFromPoints(points);

    line1 = new Line(bufferGeometry, materialLine);
    line2 = new Line(bufferGeometry, materialLine);

    line2.rotation.set(0, 0, 15);

    scene.add(line1);
    scene.add(line2);

}



const setUpCustomThings = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement)
    renderer.render(scene, camera);
}

setUpForLine();
setUpForCube();
setUpCustomThings();
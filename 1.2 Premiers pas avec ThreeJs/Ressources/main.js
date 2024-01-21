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

const renderer = new WebGLRenderer();
const scene = new Scene();
let camera;
camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 50 );
camera.lookAt( 0, 0, 0 );
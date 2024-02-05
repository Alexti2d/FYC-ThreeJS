import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.shadowMap.enabled = true;

	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();

	{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );

		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.receiveShadow = true;
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		scene.add( mesh );

	}

	{

		const color = 0xFFFFFF;
		const intensity = 100;
		const light = new THREE.PointLight( color, intensity );
		light.castShadow = true;
		light.position.set( 0, 10, 0 );
		scene.add( light );

		const helper = new THREE.PointLightHelper( light );
		scene.add( helper );

	}

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render() {

		resizeRendererToDisplaySize( renderer );

		{

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;

		}

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();

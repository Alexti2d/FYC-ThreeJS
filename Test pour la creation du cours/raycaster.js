import * as THREE from 'three';
		import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


			let camera, scene, renderer, controls, container;

			let maLampe;
			const amount = 2;

			const raycaster = new THREE.Raycaster();
			const mouse = new THREE.Vector2( 1, 1 );

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.set( amount, amount, amount );
				camera.lookAt( 0, 0, 0 );

				scene = new THREE.Scene();

				const light = new THREE.HemisphereLight( 0xffffff, 0x888888, 3 );
				light.position.set( 0, 1, 0 );
				scene.add( light );

				container = document.createElement("div");
        		document.body.appendChild(container);



            const gltfLoader = new GLTFLoader().setPath("obj/");


            gltfLoader.load("lampe.gltf", function (lampe) {
              lampe.scene.rotation.set(0, (Math.PI / 2) * 90, 0);
              lampe.scene.position.set(2, -0.87, -0.5);
              lampe.scene.traverse(function (object) {
                if (object.isMesh) object.castShadow = true;
              });
            maLampe = lampe.scene
            scene.add(maLampe);
              
            });

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.enableZoom = false;
				controls.enablePan = false;

				window.addEventListener( 'resize', onWindowResize );
				document.addEventListener( 'mousemove', onMouseMove );

				window.addEventListener("click", (event) => {
					const intersection2 = raycaster.intersectObject( maLampe );
					if ( intersection2.length > 0) {
						console.log("laaaapme")
					}		
				  });

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				// On bouge le raycaster selon la position de la camera
				raycaster.setFromCamera( mouse, camera );
				
				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
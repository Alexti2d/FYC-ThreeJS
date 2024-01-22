import * as THREE from "three";

      import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
      import { RGBELoader } from "./node_modules/three/examples/jsm/loaders/RGBELoader.js";
      import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
      import {
        CSS3DRenderer,
        CSS3DObject,
      } from "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js";
			import { FBXLoader } from "three/addons/loaders/FBXLoader.js";


      let camera, scene, renderer, renderer2, parentHolo;

      init();
      animate();

      function init() {
        const container = document.createElement("div");
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.set(2, 3, -6);
        camera.lookAt(0, 1, 0);

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

        // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

        // ground

        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(200, 200),
          new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -0.5
        mesh.receiveShadow = true;
        scene.add(mesh);

        parentHolo = new THREE.Object3D();
				scene.add( parentHolo );

        // Chargement des objets sur le bureau

        const FBXloader = new FBXLoader();


				FBXloader.load( './obj/globe.fbx', function ( globe ) {

					const positions = combineBuffer( globe, 'position' );
					createHolo( positions, scene, 0.0075, 0.55, 0.03, 0.15, 0x44ddff );
					
				} );

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

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer2 = new CSS3DRenderer();
        renderer2.setSize(window.innerWidth, window.innerHeight);
        const controls = new OrbitControls(camera, renderer2.domElement);
        

        container.appendChild(renderer.domElement);
        container.appendChild(renderer2.domElement);


        window.addEventListener("resize", onWindowResize);

        // Creation du bureau

        CreationBureau()

        let bulbLight = new THREE.PointLight(0xffee88, 1, 100, 1);
        // let bulbMat = new THREE.MeshStandardMaterial({
        //   emissive: 0xffffee,
        //   emissiveIntensity: 1,
        //   color: 0x000000,
        // });
        // bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
        bulbLight.position.set(0.27, 0.41, 0.02);
        // bulbLight.castShadow = true;
        scene.add(bulbLight);

        CreationMurBureau();

        CreationCV();
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

      function CreationCV() {
      var CV = function (x, y, z, ry) {
        var div = document.createElement("div");
        div.style.width = "505px";
        div.style.height = "303px";
        div.style.backgroundColor = "#000";

        var iframe = document.createElement("iframe");
        iframe.style.width = "505px";
        iframe.style.height = "303px";
        iframe.style.border = "0px";
        iframe.src = ["CV-3D/index.html"].join("");
        div.appendChild(iframe);

        var object = new CSS3DObject(div);
        object.position.set(x, y, z);
        object.rotation.y = ry;
        object.scale.set(0.001, 0.001, 0.001);
        console.log(object)
        return object;
      };
        var group = new THREE.Group();
        group.add(new CV(-0.275, 0.26, -0.061, 0.075));
    var FondCV = function (x, y, z, ry) {
        var fondCV = document.createElement("div");
        fondCV.style.width = "505px";
        fondCV.style.height = "303px";
        fondCV.style.backgroundColor = "#000";
        var fond = new CSS3DObject(fondCV);
        fond.rotation.y = ry;
        fond.position.set(x, y, z);
        fond.scale.set(0.001, 0.001, 0.001);
        return fond;
    };
  group.add(new FondCV(-0.275, 0.26, -0.061, 0.077));
  scene.add(group);

  var blocker = document.getElementById("blocker");
  blocker.style.display = "none";
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
            new THREE.MeshPhongMaterial({ color: 0xbebebe})
        );
        sol.receiveShadow = true;
        const murDroit1 = new THREE.Mesh(
            geometryMurDroit1,
            new THREE.MeshPhongMaterial({ color: 0xeeeeee})
        );
        murDroit1.receiveShadow = true;
        const murDroit2 = new THREE.Mesh(
            geometryMurDroit2,
            new THREE.MeshPhongMaterial({ color: 0xeeeeee})
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

      function combineBuffer( model, bufferName ) {

				let count = 0;

				model.traverse( function ( child ) {

					if ( child.isMesh ) {

						const buffer = child.geometry.attributes[ bufferName ];
						count += buffer.array.length;

					}

				} );

				const combined = new Float32Array( count );

				let offset = 0;

				model.traverse( function ( child ) {

					if ( child.isMesh ) {

						const buffer = child.geometry.attributes[ bufferName ];

						combined.set( buffer.array, offset );
						offset += buffer.array.length;

					}

				} );

				return new THREE.BufferAttribute( combined, 3 );

			}

			function createHolo( positions, scene, scale, x, y, z, color ) {

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', positions );

				let meshHolo = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 0.015, color: color } ) );

				// On défini la taille
				meshHolo.scale.x = meshHolo.scale.y = meshHolo.scale.z = scale;

        // La rotation
				meshHolo.rotation.x = 4.7


				// La position
				meshHolo.position.x = x;
				meshHolo.position.y = y;
				meshHolo.position.z = z;

				parentHolo.add( meshHolo );

				
			}

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer2.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        renderer2.render(scene, camera);
      }

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        renderer2.render(scene, camera);
      }
import { OBJLoader } from './jsLibraries/OBJLoader.js';
import { MTLLoader } from './jsLibraries/MTLLoader.js';

// setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//creating geometry
var mtlLoader = new MTLLoader();
mtlLoader.load("obj/cubo.mtl", function (materials) {
    console.log(materials);
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.load("obj/cubo.obj", function (object) {
        console.log(object);

        object.position.y = 1;
        object.rotation.x = 1;
        object.rotation.y = 1;
        object.rotation.z = 1;

        //creating img material
        var texture = new THREE.TextureLoader();
        texture.load("textures/cellos.jpg", function (t) {
          t.wrapS = THREE.RepeatWrapping;
          t.wrapT = THREE.RepeatWrapping;
          materials.materials.Material.map = t;
          object.children[0].material = materials.materials.Material;
          // object.children[0].material.map = t;
          console.log(t);

          objLoader.setMaterials(materials);
          scene.add(object);
          console.log(scene);

        });
    });
});

var light = new THREE.HemisphereLight(0xffff)
console.log(light);
scene.add(light);

camera.position.set(0,0,10);

scene.background = new THREE.Color(1,1,1)


//animation
function animate() {
  requestAnimationFrame( animate );
  renderer.render(scene,camera)
}
animate();

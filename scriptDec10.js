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
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.load("obj/cubo.obj", function (object) {
        console.log(object);
        object.position.y = 1;
        object.rotation.x = 1;
        object.rotation.y = 1;
        object.rotation.z = 1;

        //creating video material
        const video = document.createElement('video');
        video.src = "textures/00.mov";
        video.loop = true;
        video.muted = true;
        video.autoplay = true;

        let texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        materials.materials.Material.map = texture;
        object.children[0].material = materials.materials.Material;

        objLoader.setMaterials(materials);
        scene.add(object);
        console.log(object);
    });
});


var light = new THREE.HemisphereLight(0xffff)
// console.log(light);
scene.add(light);

camera.position.set(0,0,10);

scene.background = new THREE.Color(1,1,1)


//animation
function animate() {
  requestAnimationFrame( animate );

  scene.rotation.x += 1 * 0.010;
  scene.rotation.y += 2 * 0.010;

  renderer.render(scene,camera);
}
animate();

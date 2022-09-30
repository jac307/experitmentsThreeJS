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

//creating video texture
const video = document.createElement('video');
video.src = "t/static.mov";
video.loop = true;
video.muted = true;
video.autoplay = true;

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.wrapS = THREE.RepeatWrapping;
videoTexture.wrapT = THREE.RepeatWrapping;


//creating geometry
var mtlLoader = new MTLLoader();
mtlLoader.load("t/cubo.mtl", function (materials) {
    console.log(JSON.stringify(materials))
    materials.preload();

    console.log(JSON.stringify(materials))

    var objLoader = new OBJLoader();
    objLoader.load("t/cubo.obj", function (object) {
        object.position.y = 1;
        object.rotation.x = 1;
        object.rotation.y = 1;
        object.rotation.z = 1;

        materials.materials.Material.map = videoTexture;
        object.children[0].material = materials.materials.Material;

        // objLoader.setMaterials(materials);

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

  if( video.readyState === video.HAVE_ENOUGH_DATA ) videoTexture.needsUpdate	= true;

  renderer.render(scene,camera);
}
animate();


// events for running video
document.onkeydown = function (e)  {
  if (e.keyCode === 80) {
    // p key - play video
    video.play();
  } else if (e.keyCode === 32) {
    // spacebar - pause video
    video.pause();
  } else if (e.keyCode === 83) {
    // s key - stop video
    video.pause();
    video.currentTime = 0;
  } else if (e.keyCode === 82) {
    // r key - rewind video
    video.currentTime = 0;
  }
}

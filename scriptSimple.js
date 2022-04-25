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
video.src = "textures/04.mov";
video.loop = true;
video.muted = true;
video.autoplay = true;
video.play();
console.log(video);

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.wrapS = THREE.RepeatWrapping;
videoTexture.wrapT = THREE.RepeatWrapping;
console.log(videoTexture);

const texture = new THREE.TextureLoader().load( "textures/cellos.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );


// const video = document.getElementById( 'video' );
// const texture = new THREE.VideoTexture( video );


// creating geometry, mapping texture and adding to the scene
var mtlLoader = new MTLLoader();
mtlLoader.load("obj/exp.mtl", function (materials) {
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.load("obj/exp.obj", function (object) {
        object.position.y = 0;
        object.rotation.x = 1;
        object.rotation.y = 1;
        object.rotation.z = 0.5;

        // add video material for ico - [0], ico2 needs element [1], globe nees the element [0]
        materials.materials.None.map = videoTexture;
        object.children[1].material = materials.materials.None;
        console.log(materials);
        // add video material for cube
        // materials.materials.Material.map = videoTexture;
        // object.children[0].material = materials.materials.Material;

        objLoader.setMaterials(materials);
        scene.add(object);
        console.log(object);
    });
});


// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { map: videoTexture } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


var light = new THREE.HemisphereLight(0xffff)
// console.log(light);
scene.add(light);

camera.position.set(0,0,6);

scene.background = new THREE.Color(0,0,0);

//animation
function animate() {
  requestAnimationFrame( animate );

  scene.rotation.x += 1 * 0.0010;
  scene.rotation.z += 2 * 0.0010;

  if( video.readyState === video.HAVE_ENOUGH_DATA ) videoTexture.needsUpdate	= true;

  renderer.render(scene,camera);
}
animate();


// events for running video
document.onkeydown = function (e)  {
  if (e.keyCode === 80) {
    // p key - play video
    video.play();
  }}

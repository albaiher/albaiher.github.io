import * as THREE from "../lib/three.module.js";
import { GLTFLoader } from "../lib/GLTFLoader.module.js";
import { OrbitControls } from "../lib/OrbitControls.module.js";
import { D6 } from "./Dice/D6.js";

var renderer, scene, camera, d6 = new D6(scene);
var cameraControls
var angulo = -0.1
var clock = new THREE.Clock(true)
var loader = new GLTFLoader()

init()
loadD6()
render()

function init()
{
  renderer = new THREE.WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( new THREE.Color(0xFFFFFF) )
  document.getElementById('container').appendChild( renderer.domElement )

  scene = new THREE.Scene()

  var aspectRatio = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 100 )
  camera.position.set( 1, 1.5, 2 )
  camera.lookAt(0,0,0)

  cameraControls = new OrbitControls(camera, renderer.domElement)
  cameraControls.target.set( 0, 0, 0 )

  window.addEventListener('resize', updateAspectRatio )
  clock.start()
}

function loadD6(){
  d6.loadDice();
}
function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

function update()
{
    // Cambios para actualizar la camara segun mvto del raton
    cameraControls.update()

    let deltaTime = clock.getDelta()
    d6.standbyAnimation(deltaTime)
}

function render()
{
	requestAnimationFrame( render )
	update()
	renderer.render( scene, camera )
}
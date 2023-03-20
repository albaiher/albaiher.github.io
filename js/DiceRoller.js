import * as THREE from "../lib/three.module.js";
import { GLTFLoader } from "../lib/GLTFLoader.module.js";
import { OrbitControls } from "../lib/OrbitControls.module.js";
import { D6 } from "./Dice/D6.js";
import { D4 } from "./Dice/D4.js";
import { D8 } from "./Dice/D8.js";
import { D10 } from "./Dice/D10.js";
import { D12 } from "./Dice/D12.js";
import { D20 } from "./Dice/D20.js";
import { Vec3 } from "../lib/cannon-es.module.js";

var renderer, scene, camera
var d4Menu, d6Menu, d10Menu, d8Menu, d12Menu, d20Menu
var dices
var cameraControls
var angulo = -0.1
var clock = new THREE.Clock(true)
var loader = new GLTFLoader()

initializeEnvironment()
loadMenu()
render()

function initializeEnvironment()
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

  d4Menu = new D4(scene);
  d6Menu = new D6(scene);
  d8Menu = new D8(scene);
  d10Menu = new D10(scene);
  d12Menu = new D12(scene);
  d20Menu = new D20(scene);
}

function loadMenu(){
  loadDiceMenu()
  d6Menu.loadDice();
}

function loadDiceMenu(){
  let position = new THREE.Vector3(0, 0 ,0)
  d4Menu.loadDice(position)
  d6Menu.loadDice(position.add(new THREE.Vector3(2, 0 ,0)))
  d8Menu.loadDice(position.add(new THREE.Vector3(2, 0 ,0)));
  d10Menu.loadDice(position.add(new THREE.Vector3(2, 0 ,0)));
  d12Menu.loadDice(position.add(new THREE.Vector3(2, 0 ,0)));
  d20Menu.loadDice(position.add(new THREE.Vector3(2, 0 ,0)));
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
    animateMenu(deltaTime);
}

function animateMenu(deltaTime) {

  d4Menu.standbyAnimation(deltaTime);
  d6Menu.standbyAnimation(deltaTime);
  d8Menu.standbyAnimation(deltaTime);
  d10Menu.standbyAnimation(deltaTime);
  d12Menu.standbyAnimation(deltaTime);
  d20Menu.standbyAnimation(deltaTime);

}

function render()
{
	requestAnimationFrame( render )
	update()
	renderer.render( scene, camera )
}
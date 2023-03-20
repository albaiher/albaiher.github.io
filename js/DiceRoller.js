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

  initializeCameras();
  initializeLights()

  window.addEventListener('resize', updateAspectRatio )
  clock.start()

  d4Menu = new D4(scene);
  d6Menu = new D6(scene);
  d8Menu = new D8(scene);
  d10Menu = new D10(scene);
  d12Menu = new D12(scene);
  d20Menu = new D20(scene);
}

function initializeCameras() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 100);
  camera.position.set(1, 1.5, 2);
  camera.lookAt(0, 0, 0);

  cameraControls = new OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(0, 0, 0);
}

function initializeLights() {
  const ambiental = new THREE.AmbientLight(0x222222);
  scene.add(ambiental);
  const direccional = new THREE.DirectionalLight(0xFFFFFF,0.3);
  direccional.position.set(-1,1,-1);
  direccional.castShadow = true;
  scene.add(direccional);
  const puntual = new THREE.PointLight(0xFFFFFF,0.5);
  puntual.position.set(2,7,-4);
  scene.add(puntual);
  const focal = new THREE.SpotLight(0xFFFFFF,0.3);
  focal.position.set(-2,7,4);
  focal.target.position.set(0,0,0);
  focal.angle= Math.PI/7;
  focal.penumbra = 0.3;
  focal.castShadow= true;
  focal.shadow.camera.far = 20;
  focal.shadow.camera.fov = 80;
  scene.add(focal);
  scene.add(new THREE.CameraHelper(focal.shadow.camera));
}
function loadMenu(){
  loadDiceMenu()
}

function loadDiceMenu(){
  let position = new THREE.Vector3(0, 0 ,0)
  let increment = new THREE.Vector3(2, 0 ,0)

  d4Menu.loadDice(position)
  position.add(increment)
  d6Menu.loadDice(position)
  position.add(increment)
  d8Menu.loadDice(position)
  position.add(increment)
  d10Menu.loadDice(position)
  position.add(increment)
  d12Menu.loadDice(position)
  position.add(increment)
  d20Menu.loadDice(position)
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
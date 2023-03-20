import * as THREE from "../lib/three.module.js";
import { GLTFLoader } from "../lib/GLTFLoader.module.js";
import { OrbitControls } from "../lib/OrbitControls.module.js";
import * as CANNON from "../lib/cannon-es.module.js"
import { D6 } from "./Dice/D6.js";
import { D4 } from "./Dice/D4.js";
import { D8 } from "./Dice/D8.js";
import { D10 } from "./Dice/D10.js";
import { D12 } from "./Dice/D12.js";
import { D20 } from "./Dice/D20.js";

const pathImages = "../images/"

var renderer, scene, camera, world
var d4Menu, d6Menu, d10Menu, d8Menu, d12Menu, d20Menu
var dices
var cameraControls
var clock = new THREE.Clock(true)
var loader = new GLTFLoader()
var suelo


initializeEnvironment()
//loadMenu()
render()

function initializeEnvironment()
{
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( new THREE.Color(0xFFFFFF) )
  document.getElementById('container').appendChild( renderer.domElement )

  scene = new THREE.Scene()

  world = new CANNON.World()
  world.gravity.set(0, -9.8 , 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 16;

  const ground = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  });

	ground.position.y = -0.25;
  ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  world.addBody(ground);

  initializeScene();
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

function initializeScene() {
  suelo = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 1, 1), new THREE.MeshNormalMaterial());
  suelo.rotation.x = -Math.PI / 2;
  suelo.position.y = -0.25;
  scene.add(suelo);

  let newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});

  loader.load("../models/wooden_table/scene.gltf", (gltf) => {
    gltf.scene.position.x = 0
    gltf.scene.position.z = 0
    gltf.scene.position.y = 0
    gltf.scene.scale.x = 4
    gltf.scene.scale.z = 4
    gltf.scene.scale.y = 4
    scene.add(gltf.scene)
  }, 
  undefined, 
  function (error) {
      console.log(error)
  });

  loader.load("../models/table_top/scene.gltf", (gltf) => {
    gltf.scene.position.x = 0
    gltf.scene.position.z = 0
    gltf.scene.position.y = 2
    gltf.scene.scale.x = 2
    gltf.scene.scale.z = 2
    gltf.scene.scale.y = 2
    scene.add(gltf.scene)
  }, 
  undefined, 
  function (error) {
      console.log(error)
  });

  loader.load("../models/dwarf/scene.gltf", (gltf) => {
    gltf.scene.position.x = -0.25
    gltf.scene.position.z = 1.25
    gltf.scene.position.y = 2.25
    gltf.scene.scale.x = 0.003
    gltf.scene.scale.z = 0.003
    gltf.scene.scale.y = 0.003
    let model = gltf.scene
    model.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
    scene.add(gltf.scene)
  }, 
  undefined, 
  function (error) {
      console.log(error)
  });

  loader.load("../models/twinkle/scene.gltf", (gltf) => {
    gltf.scene.position.x = 0
    gltf.scene.position.z = -1.25
    gltf.scene.position.y = 2.25
    gltf.scene.scale.x = 0.0015
    gltf.scene.scale.z = 0.0015
    gltf.scene.scale.y = 0.0015
    let model = gltf.scene
    model.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
    scene.add(model)
  }, 
  undefined, 
  function (error) {
      console.log(error)
  });

  loader.load("../models/elven_archer/scene.gltf", (gltf) => {
    gltf.scene.position.x = -1.25
    gltf.scene.position.z = 0
    gltf.scene.position.y = 2.25
    gltf.scene.scale.x = 0.0075
    gltf.scene.scale.z = 0.0075
    gltf.scene.scale.y = 0.0075
    gltf.scene.rotation.z = 0.0075
    scene.add(gltf.scene)
  }, 
  undefined, 
  function (error) {
      console.log(error)
  });
  createRoom();
}

function createRoom() {
  const walls = [];
  const size = 60;
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "px.png")
  }));
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "nx.png")
  }));
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "py.png")
  }));
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "ny.png")
  }));
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "pz.png")
  }));
  walls.push(new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.TextureLoader().load(pathImages + "nz.png")
  }));
  const room = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), walls);
  scene.add(room);
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

  const ambiental = new THREE.AmbientLight(0xFFFFFF)
  scene.add(ambiental)

  
  const direccional = new THREE.DirectionalLight(0xFFFFFF, 1)
  direccional.position.set(5,10,0)
  direccional.castShadow = true
  scene.add(direccional);
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
    world.fixedStep()
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
import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
[3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];

export class D6 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 6]
        this.mass = 1
        this.inertia = 13
        this.scale = 1
    }

    clone(deployPosition,material){
        let clone = new D6(this.scene)
        clone.threeDice = this.threeDice.clone()
        let radius = this.scale * 0.9
        clone.createCannonBody(vertices, faces, radius, material, deployPosition)
        return clone
    }

    loadDice(deployPosition, material){
        console.log(deployPosition)
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let radius = this.scale * 0.9
        let size = 0.01
        let scaleVector = new THREE.Vector3(size,size,size)

        this.loader.load("../../models/dices/d6/d6.gltf", (gltf) => {
            gltf.scene.position.x = position.x
            gltf.scene.position.y = position.y
            gltf.scene.position.z = position.z
            gltf.scene.scale.copy(scaleVector)
            this.threeDice = gltf.scene
            this.scene.add(this.threeDice)
        }, 
        undefined, 
        function (error) {
            console.log(error)
        });
        this.createCannonBody(vertices, faces, radius, material, deployPosition)
    } 
}
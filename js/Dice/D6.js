import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D6 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 6]
        this.mass = 1
        this.inertia = 13
        this.scale = 1
    }

    getDiceValue() {}

    loadDice(deployPosition, material){
        console.log(deployPosition)
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
        let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
                [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
        let radius = this.scale * 0.9
        let scaleVector = new THREE.Vector3(0.1,0.1,0.1)
        
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
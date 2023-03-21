import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D4 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 4]
        this.mass = 1
        this.inertia = 5
        this.scale = 1
    }

    getDiceValue() {}

    loadDice(deployPosition, material){
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
        let faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
        let radius = this.scale * 1.2

        this.loader.load("../../models/dices/d4/d4a.gltf", (gltf) => {
            gltf.scene.position.x = position.x
            gltf.scene.position.y = position.y
            gltf.scene.position.z = position.z
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
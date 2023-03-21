import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D8 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 8]
        this.mass = 2
        this.inertia = 10
        this.scale = 50
    }

    getDiceValue() {}

    loadDice(deployPosition){
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let vertices = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
        let faces = [[0, 2, 4, 1], [0, 4, 3, 2], [0, 3, 5, 3], [0, 5, 2, 4], [1, 3, 4, 5],
                [1, 4, 2, 6], [1, 2, 5, 7], [1, 5, 3, 8]];
        let radius = this.scale * 0.9

        this.loader.load("../../models/dices/d8/d8.gltf", (gltf) => {
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
        this.cannonBody = this.createCannonShape(vertices, faces, radius)
    } 
}
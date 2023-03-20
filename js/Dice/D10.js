import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D10 extends Dice {
    
    constructor(scene){
        super()
        this.threeDice = new THREE.Object3D()
        this.valueRange = [1, 6]
        this.mass = 300
        this.inertia = 13
        this.scale = 50
        this.scene = scene
        this.cannonDice
    }

    getDiceValue() {}

    loadDice(){
        let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
        let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
                [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
        let radius = this.scale * 0.9

        this.loader.load("../../models/dices/d10/d10.gltf", (gltf) => {
            this.threeDice = gltf.scene
            this.scene.add(this.threeDice)
        }, 
        undefined, 
        function (error) {
            console.log(error)
        });
        this.cannonDice = this.createCannonShape(vertices, faces, radius)
    } 
}
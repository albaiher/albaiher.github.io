import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

let t = (1 + Math.sqrt(5)) / 2;
let vertices = [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
[0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
[t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
let faces = [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
[1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
[3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
[4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]];

export class D20 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 20]
        this.mass = 3
        this.inertia = 6
        this.scale = 1
    }

    clone(deployPosition,material){
        let clone = new D20(this.scene)
        clone.threeDice = this.threeDice.clone()
        clone.threeDice.position.copy(deployPosition)
        const radius = this.scale
        clone.createCannonBody(vertices, faces, radius, material, deployPosition)
        this.scene.add(clone.threeDice)
        return clone
    }

    loadDice(deployPosition, material){
        let position = new THREE.Vector3()
        position.add(deployPosition)

        const radius = this.scale
        let size = 0.035
        let scaleVector = new THREE.Vector3(size,size,size)
        


        this.loader.load("../../models/dices/d20/d20.gltf", (gltf) => {
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
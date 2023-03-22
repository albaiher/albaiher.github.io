import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";
import * as SkeletonUtils from "../../lib/SkeletonUtils.js";

let p = (1 + Math.sqrt(5)) / 2, q = 1 / p;
const vertices = [[0, q, p], [0, q, -p], [0, -q, p], [0, -q, -p], [p, 0, q],
[p, 0, -q], [-p, 0, q], [-p, 0, -q], [q, p, 0], [q, -p, 0], [-q, p, 0],
[-q, -p, 0], [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1],
[-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];

export class D12 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 12]
        this.mass = 2
        this.inertia = 8
        this.scale = 1
    }

    clone(deployPosition,material){
        let clone = new D12(this.scene)
        clone.threeDice = SkeletonUtils.clone(this.threeDice)
        clone.threeDice.position.copy(deployPosition)
        let radius = 0.0001
        clone.createCannonBody(vertices, radius, material, deployPosition)
        this.scene.add(clone.threeDice)
        return clone
    }

    loadDice(deployPosition, material){
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let radius = 0.035
        let scaleVector = new THREE.Vector3(radius,radius,radius)

        this.loader.load("../../models/dices/d12/d12.gltf", (gltf) => {
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
        this.createCannonBody(vertices, 0.01, material, deployPosition)
    } 
}
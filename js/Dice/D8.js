import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";
import * as SkeletonUtils from "../../lib/SkeletonUtils.js";

const vertices = [[0, 1.4, 0], [0, -1.4, 0],[-1.25, 0, -1.25], [1.25, 0, -1.25], [-1.25, 0, 1.25], [1.25, 0, 1.25]];

export class D8 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 8]
        this.mass = 1
        this.inertia = 10
        this.scale = 1
    }

    clone(deployPosition,material){
        let clone = new D8(this.scene)
        clone.threeDice = SkeletonUtils.clone(this.threeDice)
        clone.threeDice.position.copy(deployPosition)
        let radius = 0.025
        clone.createCannonBody(vertices, radius, material, deployPosition)
        this.scene.add(clone.threeDice)
        return clone
    }

    loadDice(deployPosition, material){
        let position = new THREE.Vector3()
        position.add(deployPosition)
        let radius = 0.035
        let scaleVector = new THREE.Vector3(radius,radius,radius)

        this.loader.load("../../models/dices/d8/d8.gltf", (gltf) => {
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
        this.createCannonBody(vertices, 0.025, material, deployPosition)
    } 
}
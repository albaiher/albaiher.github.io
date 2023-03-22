import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";
import * as SkeletonUtils from "../../lib/SkeletonUtils.js";

let a = Math.PI * 2 / 10, k = Math.cos(a), h = 0.105, adjust = 1.4;
let vertices = [];
for (let i = 0, b = 0; i < 10; ++i, b += a)
    vertices.push([Math.cos(b) * adjust,  h * (i % 2 ? 1 : -1) * adjust, Math.sin(b) * adjust]);
vertices.push([0, -1.4, 0]); vertices.push([0, 1.4, 0]);


export class D10 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 10]
        this.mass = 2
        this.inertia = 9
        this.scale = 1
    }

    clone(deployPosition,material){
        let clone = new D10(this.scene)
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


        this.loader.load("../../models/dices/d10/d10.gltf", (gltf) => {
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
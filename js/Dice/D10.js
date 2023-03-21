import * as THREE from "../../lib/three.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D10 extends Dice {
    
    constructor(scene){
        super(scene)
        this.valueRange = [1, 10]
        this.mass = 2
        this.inertia = 9
        this.scale = 1
    }

    getDiceValue() {}

    loadDice(deployPosition, material){
        let position = new THREE.Vector3()
        position.add(deployPosition)

        let a = Math.PI * 2 / 10, k = Math.cos(a), h = 0.105, v = -1;
        let vertices = [];
        for (let i = 0, b = 0; i < 10; ++i, b += a)
            vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
        vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);

        let faces = [[5, 7, 11, 0], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
                [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
                [1, 0, 2, v], [1, 2, 3, v], [3, 2, 4, v], [3, 4, 5, v], [5, 4, 6, v],
                [5, 6, 7, v], [7, 6, 8, v], [7, 8, 9, v], [9, 8, 0, v], [9, 0, 1, v]];

        let radius = this.scale * 0.9
        let scaleVector = new THREE.Vector3(0.1,0.1,0.1)


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
        this.createCannonBody(vertices, faces, radius, material, deployPosition)
    } 
}
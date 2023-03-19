import * as THREE from "../../lib/three.module.js";
import { GLTFLoader } from "../../lib/GLTFLoader.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"

export class Dice {
    
    constructor(){
        this.loader = new GLTFLoader()
        this.threeDice
        this.valueRange
        this.mass
        this.inertia
        this.scale
        this.cannonDice
    }

    createCannonShape(vertices, faces, radius) {
        let shapeVertices = new Array(vertices.length)
        let shapeFaces = new Array(faces.length);

        for (let i = 0; i < vertices.length; ++i) {
            let v = vertices[i];
            shapeVertices[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
        }
        for (let i = 0; i < faces.length; ++i) {
            shapeFaces[i] = faces[i].slice(0, faces[i].length - 1);
        }

        return new CANNON.ConvexPolyhedron(shapeVertices, shapeFaces);
    }

    getDiceValue() {}

    loadDice() {}
}
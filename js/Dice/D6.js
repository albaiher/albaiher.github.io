import * as THREE from "../../lib/three.module.js";
import { GLTFLoader } from "../../lib/GLTFLoader.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"
import { Dice } from "./Dice.js";

export class D6 extends Dice {
    
    constructor(){
        super()
        this.valueRange = [1, 6]
        this.mass = 300
        this.inertia = 13
        this.scale = 50
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

    loadDice(){
        let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
        let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
                [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
        let radius = this.scale * 0.9

        this.loader.load("../../models/dices/d6/d6.gltf", function (gltf) {
            
            this.dice = gltf.scene
            this.cannonDice = createCannonShape(vertices, faces, radius)
        }, function (xhr) {
        
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        
        }, function (error) {
            
            console.log(error)
        });
    }
}
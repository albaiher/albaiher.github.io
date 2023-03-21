import * as THREE from "../../lib/three.module.js";
import { GLTFLoader } from "../../lib/GLTFLoader.module.js";
import * as CANNON from "../../lib/cannon-es.module.js"

export class Dice {
    
    constructor(scene){
        this.loader = new GLTFLoader()
        this.threeDice = new THREE.Object3D()
        this.scene = scene
        this.valueRange
        this.mass
        this.inertia
        this.scale
        this.cannonBody
        this.shape
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


        return new CANNON.Sphere(radius);
    }

    createCannonBody(vertices, faces, radius, material, position){
        this.shape = this.createCannonShape(vertices, faces, radius);
        this.cannonBody = new CANNON.Body( {mass: this.mass, material: material} );
        this.cannonBody.addShape( this.shape );
        this.cannonBody.position.copy( position );
        this.threeDice.position.copy( this.cannonBody.position );
    }

    throwDice(direction){
        
        this.cannonBody.applyImpulse(direction);
    }

    standbyAnimation(deltaTime){
        this.threeDice.rotation.y += 0.1 * deltaTime
    }
}

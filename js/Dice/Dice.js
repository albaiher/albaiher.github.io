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
        this.shapeOffset
    }

    createCannonShapeOffset(vertices, radius) {
        let shapeVertices = new Array(vertices.length)

        for (let i = 0; i < vertices.length; ++i) {
            let v = vertices[i];
            shapeVertices[i] = new CANNON.Vec3(v[0] * radius, v[1] * radius, v[2] * radius);
        }

        return shapeVertices;
    }

    createCannonBody(vertices, radius, material, position){
        this.shapeOffset = this.createCannonShapeOffset(vertices, radius);
        this.cannonBody = new CANNON.Body( {mass: this.mass, material: material} );

        let sphere = new CANNON.Sphere(radius)
        this.cannonBody.addShape(sphere);
        let visual = new THREE.Mesh( new THREE.SphereGeometry( radius ), new THREE.MeshBasicMaterial( {wireframe: true } ) );
        visual.position.copy(position)
        this.scene.add(visual)

        for(let offset of this.shapeOffset){
            sphere = new CANNON.Sphere(radius / 100)
            this.cannonBody.addShape( sphere, offset );
            visual = new THREE.Mesh( new THREE.SphereGeometry( radius / 100 ), new THREE.MeshBasicMaterial( {wireframe: true } ) );
            visual.position.copy(offset)
            this.scene.add(visual)
        }
        
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

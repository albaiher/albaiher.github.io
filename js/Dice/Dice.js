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

        let normals = computeFaceNormals(vertices,faces)

        return new CANNON.ConvexPolyhedron(shapeVertices, shapeFaces, normals);
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

// Código extraido de:  https://github.com/tomo0613/offroadJS_v2/blob/355b6aabf0446deefffba6d60e24a257836916ea/src/mapModules/baseMapElementComponents.ts#L172
const tmp_vec_1 = new CANNON.Vec3();
const tmp_vec_2 = new CANNON.Vec3();
const centroid = new CANNON.Vec3();

function computeFaceNormals(vertices, faces) {
    calculateCentroid(vertices);


    return faces.map((faceVertexIndices) => {
        const A = vertices[faceVertexIndices[0]];
        const A_to_B = tmp_vec_1.copy(vertices[faceVertexIndices[1]]);
        const A_to_C = tmp_vec_2.copy(vertices[faceVertexIndices[2]]);
        A_to_B.vsub(A, A_to_B);
        A_to_C.vsub(A, A_to_C);

        const faceNormal = new CANNON.Vec3().copy(A_to_B);
        faceNormal.cross(A_to_C, faceNormal).normalize();

        const centroid_to_A = tmp_vec_1.copy(A);
        A.vsub(centroid, centroid_to_A);

        if (faceNormal.dot(centroid_to_A) < 0) {
            faceNormal.negate();
        }

        return faceNormal;
    });
}

function calculateCentroid(vertices) {
    const { length: vertexCount } = vertices;

    centroid.set(0, 0, 0);

    for (let i = 0; i < vertexCount; i++) {
        centroid.vadd(vertices[i], centroid);
    }

    centroid.scale(1 / vertexCount, centroid);
}

"use strict"

import * as THREE from '.././node_modules/three/src/Three.js';

main();

function main() {
    
    const canvas =  document.getElementById('canvas');

    const renderer = new THREE.WebGLRenderer( {canvas} );

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 5);
    camera.position.z = 4;

    const light = new THREE.DirectionalLight(0xfff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
  

    const geometry = new THREE.TorusBufferGeometry(1);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00aa,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    /**
     * 
     * @param {number} time - time from requestAnimationFrame
     */
    function animate(time) {
        requestAnimationFrame(animate);
        time *= 0.001;

        mesh.rotation.x = time;
        mesh.rotation.z = time;


        renderer.render(scene, camera);
        
    }
    requestAnimationFrame(animate);
}




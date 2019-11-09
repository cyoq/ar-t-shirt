
// import * as THREE from '.././node_modules/three/src/Three.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.js';


function main() {
    
    const canvas =  document.getElementById('canvas');

    const renderer = new THREE.WebGLRenderer( {canvas} );

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 5);
    camera.position.z = -2;

    const light = new THREE.DirectionalLight(0xfff, 2);
    light.position.set(1, 2, -3);
    scene.add(light);

    const geometry = new THREE.TorusBufferGeometry(1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x404040,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer.render(scene, camera);
}
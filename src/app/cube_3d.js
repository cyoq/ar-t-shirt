
import { Scene, WebGLRenderer, 
         PerspectiveCamera, DirectionalLight,
         TorusBufferGeometry, MeshPhongMaterial,
         Mesh } from 'three';
import $ from './utils.js';

export function main() {

    const canvas =  $('canvas');

    const renderer = new WebGLRenderer( {canvas} );

    const scene = new Scene();

    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 5);
    camera.position.z = 4;

    const light = new DirectionalLight(0xfff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
  

    const geometry = new TorusBufferGeometry(1);
    const material = new MeshPhongMaterial({
        color: 0xffffaa,
    });

    const mesh = new Mesh(geometry, material);

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


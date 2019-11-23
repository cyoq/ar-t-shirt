
"use strict"

import './../styles/main.css';
import Hiro from './../../data/patterns/hiro.patt';
import CameraParam from './../../data/camera_para.dat';
// import $ from './utils.js';
import * as signals from 'signals';
import * as THREE from 'three';
import * as AFRAME from 'aframe';
// import './libs/aframe.min.js';
// import './libs/aframe-ar.min.js';

// import * as aframe from './libs/aframe-ar.js';
// import * as ARController from 'jsartoolkit5';



// var param = new ARController.ARCameraParam();
 
//   param.onload = function () {
//     var img = document.getElementById('img');
//     var ar = new ARController.ARController(img.width, img.height, param);
 
//     // Set pattern detection mode to detect both pattern markers and barcode markers.
//     // This is more error-prone than detecting only pattern markers (default) or only barcode markers.
//     //
//     // For barcode markers, use artoolkit.AR_MATRIX_CODE_DETECTION
//     // For pattern markers, use artoolkit.AR_TEMPLATE_MATCHING_COLOR
//     //
//     ar.setPatternDetectionMode(ARController.artoolkit.AR_TEMPLATE_MATCHING_COLOR_AND_MATRIX);
    
//     ar.addEventListener('markerNum', function (ev) {
//       console.log('got markers', markerNum);
//     });
//     ar.addEventListener('getMarker', function (ev) {
//       console.log('found marker?', ev);
//     });
//     ar.loadMarker(Hiro, function (marker) {
//       console.log('loaded marker', marker);
//       ar.process(img);
//     });
// };
 
//   param.src = CameraParam;

// main();

// function main() {

//     const canvas =  $('canvas');

//     const renderer = new THREE.WebGLRenderer( {canvas} );

//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 5);
//     camera.position.z = 4;

//     const light = new THREE.DirectionalLight(0xfff, 1);
//     light.position.set(-1, 2, 4);
//     scene.add(light);
  

//     const geometry = new THREE.TorusBufferGeometry(1);
//     const material = new THREE.MeshPhongMaterial({
//         color: 0xffffaa,
//     });

//     const mesh = new THREE.Mesh(geometry, material);

//     scene.add(mesh);

//     /**
//      * 
//      * @param {number} time - time from requestAnimationFrame
//      */
//     function animate(time) {
//         requestAnimationFrame(animate);
//         time *= 0.001;

//         mesh.rotation.x = time;
//         mesh.rotation.z = time;


//         renderer.render(scene, camera);
        
//     }
//     requestAnimationFrame(animate);
// }




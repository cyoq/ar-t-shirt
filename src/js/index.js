
"use strict"

import './../styles/main.css';
import CameraData from './../../assets/data/camera_para.dat';
import Pattern from './../../assets/data/patterns/pattern-fascinated-white.patt';


const Utils = {
    screen: function () {
        const width = Math.max(0, window.screen.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0);
        const height = Math.max(0, window.screen.innerHeight || document.body.clientHeight || document.documentElement.clientHeight || 0);

        return {
            width,
            height,
            ratio: width / height
        };
    }
};

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});


renderer.setClearColor(new THREE.Color('lightgrey'), 0)
const pixelRatio = window.devicePixelRatio | 0;
renderer.setPixelRatio(pixelRatio);
var height = Math.max(0, window.screen.innerHeight || document.body.clientHeight || document.documentElement.clientHeight || 0);
renderer.setSize(640, 480);
renderer.domElement.style.position = 'absolute'
// renderer.domElement.style.display = 'block';
// renderer.domElement.style.width = '100%';
// renderer.domElement.style.height = '100%';
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
document.body.appendChild(renderer.domElement);

window.r = renderer;

// array of functions for the rendering loop
var onRenderFcts = [];

// init scene and camera
var scene = new THREE.Scene();

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic camera
//////////////////////////////////////////////////////////////////////////////////

// Create a camera
var camera = new THREE.Camera();
scene.add(camera);


var arToolkitSource = new THREEx.ArToolkitSource({
    // to read from the webcam
    sourceType: 'webcam',
})

function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        console.log("called");
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
}


arToolkitSource.init(function onReady() {
    onResize()
})



// handle resize
window.addEventListener('resize', function () {
    onResize()
})



////////////////////////////////////////////////////////////////////////////////
//          initialize arToolkitContext
////////////////////////////////////////////////////////////////////////////////


// create atToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: CameraData,
    patternRatio: 0.7,
    detectionMode: 'mono',
    maxDetectionRate: 60,
    canvasWidth: 80 * 3,
    canvasHeight: 60 * 3,
    
})
// initialize it
arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
})

// update artoolkit on every frame
onRenderFcts.push(function () {
    if (arToolkitSource.ready === false) return

    arToolkitContext.update(arToolkitSource.domElement)
})


////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

var markerRoot = new THREE.Group();
scene.add(markerRoot)
var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type: 'pattern',
    patternUrl: Pattern
})

// build a smoothedControls
var smoothedRoot = new THREE.Group()
scene.add(smoothedRoot)
var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
    lerpPosition: 0.4,
    lerpQuaternion: 0.3,
    lerpScale: 1,
})
onRenderFcts.push(function (delta) {
    smoothedControls.update(markerRoot)
})
//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

var arWorldRoot = smoothedRoot

// add a torus knot
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.y = geometry.parameters.height / 2
arWorldRoot.add(mesh);

var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
var material = new THREE.MeshNormalMaterial();
var mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5
arWorldRoot.add(mesh);

onRenderFcts.push(function () {
    mesh.rotation.x += 0.1
})


// render the scene
onRenderFcts.push(function () {
    renderer.render(scene, camera);
})

// run the rendering loop
var lastTimeMsec = null
requestAnimationFrame(function animate(nowMsec) {
    // keep looping
    requestAnimationFrame(animate);

    // measure time
    lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec = nowMsec
    // call each update function
    onRenderFcts.forEach(function (onRenderFct) {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
    })
})

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
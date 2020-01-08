
"use strict"

import './../styles/main.css';
import CameraData from './../../assets/data/camera_para.dat';
import Pattern from './../../assets/data/patterns/pattern-fascinated-white.patt';


var arToolkitSource, arToolkitContext;
var markerRoot;
(function () {

    var _w = window,
        _s = window.screen,
        _b = document.body,
        _d = document.documentElement;

    window.Utils = {

        // screen info 
        screen: function () {
            var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0);
            var height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0);

            return {
                width: width,
                height: height,
                centerx: width / 2,
                centery: height / 2,
                ratio: width / height,
            };
        },
    };
})();


(function () {

    var screen = Utils.screen(),
        renderer = null,
        camera = null,
        scene = null,
        to = { px: 0, py: 0, pz: 2 },
        fireworks = [];

    try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        camera = new THREE.Camera();
        scene = new THREE.Scene();
    }
    catch (e) {
        alert("THREE.JS Error: " + e.toString());
        return;
    }
    function setup() {
        camera.position.set(0, 0, 0);
        camera.rotation.set(0, 0, 0);

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.sortObjects = true;
        renderer.setSize(640, 480);
        renderer.domElement.style["display"] = "block";
        renderer.domElement.style["position"] = "fixed";
        //renderer.domElement.style["position"] = "absolute";
        renderer.domElement.style["width"] = "100%";
        renderer.domElement.style["height"] = "100%";
        renderer.domElement.style["z-index"] = "-1";
        //
        renderer.domElement.style["top"] = '0px';
        renderer.domElement.style["left"] = '0px';

        document.body.appendChild(renderer.domElement);
        ////////////////////////////////////////////////////////////
        // setup arToolkitSource
        ////////////////////////////////////////////////////////////

         // add a torus knot
         var geometry = new THREE.CubeGeometry(1, 1, 1);
         var material = new THREE.MeshNormalMaterial({
             transparent: true,
             opacity: 0.5,
             side: THREE.DoubleSide
         });
         var mesh = new THREE.Mesh(geometry, material);
         mesh.position.y = geometry.parameters.height / 2
         scene.add(mesh);
         var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
         var material = new THREE.MeshNormalMaterial();
         var mesh = new THREE.Mesh(geometry, material);
         mesh.position.y = 0.5
         scene.add(mesh);
 

        arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam',
        });

        function onResize() {
            console.log('onResize');
            arToolkitSource.onResize()
            arToolkitSource.copySizeTo(renderer.domElement)
            if (arToolkitContext.arController !== null) {
                arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
            }
        }

        arToolkitSource.init(function onReady() {
            onResize()
        });

        // handle resize event
        window.addEventListener('resize', function () {
            onResize()
        });

        ////////////////////////////////////////////////////////////
        // setup arToolkitContext
        ////////////////////////////////////////////////////////////	

        // create atToolkitContext
        arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: CameraData,
            detectionMode: 'mono',
            patternRatio: 0.7
        });

        // copy projection matrix to camera when initialization complete
        arToolkitContext.init(function onCompleted() {
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });

        ////////////////////////////////////////////////////////////
        // setup markerRoots
        ////////////////////////////////////////////////////////////


        // build markerControls
        markerRoot = new THREE.Object3D();
        scene.add(markerRoot);
        let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
            type: 'pattern', patternUrl: Pattern,
        })

       
        // onRenderFcts.push(function(delta){
        //     mesh.rotation.x += Math.PI*delta
        // })

    };


    // animation loop 
    function draw() {
        requestAnimationFrame(draw);
        // add fireworks 

        if (arToolkitSource.ready !== false) {
            console.log('ready');
            arToolkitContext.update(arToolkitSource.domElement);
        }



        // render 
        renderer.render(scene, camera);
    };


    setup();
    draw();
})();
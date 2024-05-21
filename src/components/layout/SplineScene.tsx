"use client";
// https://app.spline.design/file/49135fdc-18b5-40cc-a9be-8a71de8150ef

// import React, { useEffect, useRef } from "react";
// import { Application } from '@splinetool/runtime';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import SplineLoader from '@splinetool/loader';

export const SplineScene = () => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   if (!canvasRef.current) return;

  //   const loadSplinetool = async () => {
  //     const { Application } = await import('@splinetool/runtime')
  //     const canvas = canvasRef.current;
  //     if (canvas) {
  //       const app = new Application(canvas);
  //       app.load('https://prod.spline.design/3hTFcoEPy7XXr9It/scene.splinecode');
  //     }
  //   };

  //   loadSplinetool();

  //   return () => {
  //     if (canvasRef.current) {
  //       canvasRef.current.removeEventListener('click', handleClick);
  //     }
  //   };
  // }, []);

  // camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 10000);
  camera.position.set(-323.8, 682.67, 735.02);
  camera.quaternion.setFromEuler(new THREE.Euler(-0.77, -0.01, -0.01));

  // scene
  const scene = new THREE.Scene();

  // spline scene
  const loader = new SplineLoader();
  loader.load(
    'https://prod.spline.design/3hTFcoEPy7XXr9It/scene.splinecode',
    (splineScene) => {
      scene.add(splineScene);
    }
  );

  // renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  // scene settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  scene.background = new THREE.Color('#72cc4f');
  renderer.setClearAlpha(1);

  // orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.125;

  window.addEventListener('resize', onWindowResize);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    controls.update();
    renderer.render(scene, camera);
  }


  return (
    <div className='w-full h-[80vh]'>
      {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.3.7/build/spline-viewer.js"></script>
      <spline-viewer url="https://prod.spline.design/3hTFcoEPy7XXr9It/scene.splinecode"></spline-viewer> */}
      <canvas ref={canvasRef} className='w-full'></canvas>
    </div>
  );
};

export default SplineScene;

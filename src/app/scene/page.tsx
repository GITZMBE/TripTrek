'use client';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Container } from '@/src/components/layout';
import React, { useEffect, useRef } from 'react';

export const ScenePage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(0, 0, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0x555D6B, side: THREE.DoubleSide });
    const obj = new THREE.Mesh(geometry, material);
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    const spotLight = new THREE.SpotLight(0xFFFFFF, 3);
    const loader = new GLTFLoader().setPath('/models_3D/hut/');
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.5;
    controls.autoRotate = false;
    controls.target = new THREE.Vector3(0, 1, 0);
    controls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x222831);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    ref.current && ref.current.appendChild( renderer.domElement );

    camera.position.set(45, 0, 0);
    geometry.rotateX(-Math.PI / 2);
    obj.castShadow = false;
    obj.receiveShadow = true;

    spotLight.position.set(0, 10, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.angle = Math.PI / 4;

    scene.add(ambientLight);
    scene.add(obj);
    scene.add(spotLight);

    loader.load('Gazebo.gltf', (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      })
      model.position.set(0, 1.05, -1);
      model.scale.set(1, 1, 1);
      scene.add(model);
    });

    const animation = () => {
      requestAnimationFrame(animation);
      controls.update();
      renderer.render(scene, camera);
    };

    animation();

    return () => {
      if (ref.current) {
        ref.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={ref} className='w-full max-h-[100vh] overflow-hidden'></div>
  )
}

export default ScenePage;
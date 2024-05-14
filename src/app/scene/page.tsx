"use client";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Container } from "@/src/components/layout";
import React, { useEffect, useRef } from "react";

export const ScenePage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // const geometry = new THREE.PlaneGeometry(0, 0);
    // const material = new THREE.MeshStandardMaterial({ color: 0x555D6B, side: THREE.DoubleSide });
    // const ground = new THREE.Mesh(geometry, material);
    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    const spotLight = new THREE.SpotLight(0xffffff, 100);
    const loader = new GLTFLoader();
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = -30;
    controls.maxDistance = 40;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = 3 * Math.PI / 4;
    controls.autoRotate = true;
    controls.rotateSpeed = .3;
    controls.target = new THREE.Vector3(0, -5, 0);
    controls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x222831);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    ref.current && ref.current.appendChild(renderer.domElement);

    camera.position.set(5, -5, 10);
    // ground.position.set(0, -25, 0);
    // ground.rotation.x = -Math.PI / 2;
    // ground.castShadow = false;
    // ground.receiveShadow = true;

    spotLight.position.set(-5, 0, -5);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.angle = Math.PI / 4;

    // scene.add(ground);
    scene.add(ambientLight);
    scene.add(spotLight);

    loader.load("models_3D/hut.glb", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model.position.set(0, -8, 0);
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

  return <div ref={ref} className='w-full max-h-[100vh] overflow-hidden'></div>;
};

export default ScenePage;

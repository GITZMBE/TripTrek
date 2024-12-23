"use client";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import React, { ComponentPropsWithRef, useEffect, useRef } from "react";

interface SceneProps extends ComponentPropsWithRef<"div"> {
  path: string;
  full?: boolean;
  half?: boolean;
}

/**
 * 3D object
 * @param path local path to glb or gltf file inside directory /public/models_3D
 * @param full set the width of the scene to the width of the window
 * @param half set the width of the scene to half of the window screen
 * @return A canvas with an interactable 3D object
 */
export const Scene = ({ path, full, half, className, ...props }: SceneProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, full ? 2 * window.innerWidth / window.innerHeight : half ? (window.innerWidth / 2) / (2 * window.innerHeight / 6) : window.innerWidth / window.innerHeight, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.PlaneGeometry(0, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0x555D6B, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(geometry, material);
    const ambientLight = new THREE.AmbientLight(0x404040, 50);
    const spotLight = new THREE.SpotLight(0xffffff, 500);
    const loader = new GLTFLoader();
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = -500;
    controls.maxDistance = 1000;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = 3 * Math.PI / 4;
    controls.autoRotate = true;
    controls.rotateSpeed = .3;
    controls.enableZoom = false;
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.update();

    renderer.setSize(half ? window.innerWidth / 2 : window.innerWidth, half ? 2 * window.innerHeight / 6 : full ? window.innerHeight / 2 : window.innerHeight);
    renderer.setClearColor(0x222831);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    ref.current && ref.current.appendChild(renderer.domElement);

    camera.position.set(-180, 50, 0);
    ground.position.set(0, -25, 0);
    ground.rotation.x = -Math.PI / 2;
    ground.castShadow = false;
    ground.receiveShadow = true;

    spotLight.position.set(0, 6, 6);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.angle = Math.PI / 4;

    scene.add(ground);
    scene.add(ambientLight);
    scene.add(spotLight);

    let model: THREE.Group<THREE.Object3DEventMap>;

    const rotate = () => {
      if (!ref.current || !model) return;
      const windowHeight = window.innerHeight;
      const rect = ref.current.getBoundingClientRect();
      const rectFromTop = rect.y;
      const rectHeight = rect.height;
      
      const isOnScreen = rectFromTop < windowHeight && rectFromTop > -rectHeight;
      if (isOnScreen) {
        const scrollPath = (windowHeight - rectFromTop) / (windowHeight + rectHeight);
        const rotation = Math.PI * scrollPath;
        model.rotation.set(0, rotation, 0);
      }
    };

    loader.load("models_3D" + path, (gltf) => {
      model = gltf.scene;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model.position.set(0, 0, 0);
      if (ref.current) rotate();
      model.scale.set(1, 1, 1);
      scene.add(model);
    });

    const animation = () => {
      requestAnimationFrame(animation);
      controls.update();
      renderer.render(scene, camera);
    };

    animation();

    // document.addEventListener('scroll', rotate);

    return () => {
      if (ref.current) {
        ref.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`w-full max-h-[100vh] overflow-hidden ${className}`} {...props}></div>
  );
};

export default Scene;

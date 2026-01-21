"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface SpaceSceneProps {
  mousePosition: { x: number; y: number };
}

export function SpaceScene({ mousePosition }: SpaceSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(100, 1, 0.5, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 0.8, 10);
    blueLight.position.set(2, 1, 2);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa78bfa, 0.8, 10);
    purpleLight.position.set(-2, -1, 2);
    scene.add(purpleLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
    );

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const modelUrl = "/computer.glb";

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        model.scale.set(0.8, 0.8, 0.8);
        model.rotation.x = THREE.MathUtils.degToRad(10);

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        const modelGroup = new THREE.Group();
        modelGroup.add(model);
        scene.add(modelGroup);
        modelRef.current = modelGroup;

        setModelLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Erro ao carregar modelo:", error);
        setModelError(true);
      },
    );

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.4;
        modelRef.current.rotation.y += 0.001;
      }

      blueLight.intensity = 0.8 + Math.sin(Date.now() * 0.002) * 0.5;
      purpleLight.intensity = 0.8 + Math.sin(Date.now() * 0.002 + Math.PI) * 1;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      dracoLoader.dispose();
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current); // ✅ cancela animação antiga
      }
    };
  }, []);

  useEffect(() => {
    if (modelRef.current && modelLoaded) {
      const targetX = mousePosition.y * 0.2 + THREE.MathUtils.degToRad(23.5);
      const targetZ = mousePosition.x * 0.2;
      modelRef.current.rotation.x +=
        (targetX - modelRef.current.rotation.x) * 0.05;
      modelRef.current.rotation.z +=
        (targetZ - modelRef.current.rotation.z) * 0.05;
    }
  }, [mousePosition, modelLoaded]);

  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: isGrabbing ? "grabbing" : "grab",
      }}
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)}
    >
      {modelError && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "rgba(0,0,0,1)",
            color: "white",
            padding: "5px",
            fontSize: "12px",
            borderRadius: "3px",
          }}
        >
          Usando globo alternativo. O modelo original não pôde ser carregado.
        </div>
      )}
    </div>
  );
}

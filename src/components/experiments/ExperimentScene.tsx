/**
 * ExperimentScene – Base Three.js scene for WebGL experiments.
 * Replace the default mesh / material with your own to try ideas for the landing.
 */

import * as THREE from "three";
import React, { useEffect, useRef } from "react";

export function ExperimentScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a12, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // —— Default experiment: simple torus (replace with your own geometry / shader) ——
    const geometry = new THREE.TorusGeometry(1, 0.3, 32, 64);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const animate = (t: number) => {
      rafRef.current = requestAnimationFrame(animate);
      mesh.rotation.x = t * 0.0002;
      mesh.rotation.y = t * 0.0003;
      rendererRef.current?.render(scene, cameraRef.current!);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      geometry.dispose();
      (material as THREE.Material).dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="experiment-scene" style={{ width: "100%", height: "100%" }} />;
}

export default ExperimentScene;

import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Modal from './Modal.jsx';


export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.setZ(30);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- OBJECTS ---
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff6347,
      clearcoat: 1,
      clearcoatRoughness: 1,
      metalness: 0.5,
      roughness: 0.0,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x055ddd,
      metalness: 0.7,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-10, 0, 30);
    scene.add(sphere);

    // --- LIGHTING ---
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(15, 15, 15);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(pointLight, ambientLight);

    // --- CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);

    // --- RAYCASTER + MOUSE ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownPos = { x: 0, y: 0 };

    function onMouseDown(event) {
      mouseDownPos.x = event.clientX;
      mouseDownPos.y = event.clientY;
    }

    function onMouseUp(event) {
      const dx = event.clientX - mouseDownPos.x;
      const dy = event.clientY - mouseDownPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(sphere);

        if (intersects.length > 0) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      }
    }

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // --- ANIMATION LOOP ---
    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <canvas id="bg" ref={canvasRef}></canvas>
      {showPopup && <Modal onClose={() => setShowPopup(false)} />}
    </>
  );
}

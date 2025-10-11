import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// --- OBJECTS ---

// Donut
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xff6347,
  clearcoat: 1,
  clearcoatRoughness: 1,
  metalness: 0.5,
  roughness: 0.0
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x055ddd, metalness: 0.7, roughness: 0.2 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 0, 30);
scene.add(sphere);

// --- LIGHTS ---
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 15, 15);

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// --- CONTROLS ---
const controls = new OrbitControls(camera, renderer.domElement);

// --- MOUSE DETECTION---
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(sphere);

  if (intersects.length > 0) {
    window.open('https://www.google.com/?zx=1760219980799&no_sw_cr=1', '_blank');
  }
});

// --- RAYCASTER CLICK DETECTION ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(sphere);

  if (intersects.length > 0) {
    window.open('https://www.google.com/?zx=1760219980799&no_sw_cr=1', '_blank');
  }
});

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

// --- REACT RENDER ---
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

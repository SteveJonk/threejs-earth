import * as THREE from 'three';
import './style.css';

//Loading
const textureLoader = new THREE.TextureLoader();
const textureLoader2 = new THREE.TextureLoader();

const normalTexture = textureLoader.load('/public/NormalMap.png');
const alphaMap = textureLoader2.load('/public/AlphaMap.jpg');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(1, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
  alphaMap: alphaMap,
  normalMap: normalTexture,
  transparent: true,
});
material.metalness = 0.8;
material.roughness = 0.35;

material.color = new THREE.Color(0xffffff);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.AmbientLight(0x404040, 1);

scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 0.3);
pointLight2.position.set(4, 4, 4);
pointLight2.intensity = 1;

scene.add(pointLight2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Event listener mouseMove
 */
const mouseMoveEvent = (event) => {
  const maxI = 5;
  const minI = 2;

  const r = 0.5 + event.clientX * 0.0005;
  const i = (window.innerHeight - event.clientY) * 0.001 * (maxI - minI + 1) + minI;

  pointLight2.color.setRGB(r, 0, 0);
  pointLight2.intensity = i;
};

document.addEventListener('mousemove', mouseMoveEvent);
/**
 * Event listener scroll
 */

const onScroll = (event) => {
  sphere.position.y = window.scrollY * 0.003;
  sphere.position.z = window.scrollY * 0.001;
};

document.addEventListener('scroll', onScroll);

/**
 * Animate
 */

const MOUSE_FACTOR = 0.001;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // targetX = mouseX * MOUSE_FACTOR;
  // targetY = mouseY * MOUSE_FACTOR;

  // Update objects
  sphere.rotation.y = 0.6 * elapsedTime;
  sphere.rotation.x = 0.1 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

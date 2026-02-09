/**
 * globe.js – Globus terraqüi wireframe 3D (Three.js)
 * Paral·lels i meridians amb línies corbes i gruixudes, rotació horitzontal.
 */

import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

const RADIUS = 1;
const SPHERE_RADIUS = 0.998;
const PARALLELS = 12;
const MERIDIANS = 16;
const SEGMENTS_PER_CURVE = 48;
const LINE_WIDTH = 10;
const GLOBE_FILL_COLOR = 0x0a0a12;
const POLE_EPSILON = 0.02;
const RIM_SEGMENTS = 64;
const PIXEL_SCALE = 0.22;

function pointOnSphere(lat, lon, radius = RADIUS) {
  const y = Math.sin(lat);
  const r = Math.cos(lat);
  return new THREE.Vector3(
    r * Math.cos(lon) * radius,
    y * radius,
    r * Math.sin(lon) * radius
  );
}

function createParallel(lat, material) {
  const points = [];
  for (let i = 0; i <= SEGMENTS_PER_CURVE; i++) {
    const lon = (i / SEGMENTS_PER_CURVE) * Math.PI * 2;
    points.push(pointOnSphere(lat, lon));
  }
  const geometry = new LineGeometry().setFromPoints(points);
  return new Line2(geometry, material);
}

function createMeridian(lon, material) {
  const points = [];
  for (let i = 0; i <= SEGMENTS_PER_CURVE; i++) {
    const t = i / SEGMENTS_PER_CURVE;
    const lat = -Math.PI / 2 + POLE_EPSILON + t * (Math.PI - 2 * POLE_EPSILON);
    points.push(pointOnSphere(lat, lon));
  }
  const geometry = new LineGeometry().setFromPoints(points);
  return new Line2(geometry, material);
}

function getSilhouettePoints(globe, camera) {
  globe.updateMatrixWorld(true);
  const cameraLocal = new THREE.Vector3();
  camera.getWorldPosition(cameraLocal);
  cameraLocal.applyMatrix4(
    new THREE.Matrix4().copy(globe.matrixWorld).invert()
  );
  const camLenSq = cameraLocal.lengthSq();
  if (camLenSq <= 1) return [];
  const camLen = Math.sqrt(camLenSq);
  const center = cameraLocal.clone().divideScalar(camLenSq);
  const radius = Math.sqrt(Math.max(0, 1 - 1 / camLenSq));
  const camNorm = cameraLocal.clone().normalize();
  const temp = Math.abs(camNorm.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(camNorm, temp).normalize();
  const v = new THREE.Vector3().crossVectors(camNorm, u).normalize();
  const points = [];
  for (let i = 0; i <= RIM_SEGMENTS; i++) {
    const t = (i / RIM_SEGMENTS) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        center.x + radius * (Math.cos(t) * u.x + Math.sin(t) * v.x),
        center.y + radius * (Math.cos(t) * u.y + Math.sin(t) * v.y),
        center.z + radius * (Math.cos(t) * u.z + Math.sin(t) * v.z)
      )
    );
  }
  return points;
}

function init(canvas) {
  const container = canvas.parentElement;
  if (!container) return () => {};

  const fillColorAttr = canvas.getAttribute("data-fill-color");
  const sphereColor = fillColorAttr
    ? parseInt(fillColorAttr.replace("#", ""), 16)
    : GLOBE_FILL_COLOR;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  function getFitSize() {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    return Math.max(1, Math.min(cw, ch));
  }

  const pixelW = Math.max(1, Math.floor(getFitSize() * PIXEL_SCALE));
  const pixelH = Math.max(1, Math.floor(getFitSize() * PIXEL_SCALE));
  const renderTarget = new THREE.WebGLRenderTarget(pixelW, pixelH, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
  });

  function applyCanvasSize(size) {
    const s = Math.max(1, size);
    canvas.style.width = s + "px";
    canvas.style.height = s + "px";
    renderer.setSize(s, s);
    renderer.setPixelRatio(1);
  }
  applyCanvasSize(getFitSize());
  renderer.setClearColor(0x000000, 0);

  const material = new LineMaterial({
    color: 0xffffff,
    linewidth: LINE_WIDTH,
    resolution: new THREE.Vector2(pixelW, pixelH),
    depthTest: true,
    depthWrite: true,
  });

  const globe = new THREE.Group();

  const sphereGeom = new THREE.SphereGeometry(SPHERE_RADIUS, 48, 48);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: sphereColor,
    side: THREE.FrontSide,
    depthWrite: true,
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.renderOrder = 0;
  globe.add(sphere);

  const linesGroup = new THREE.Group();
  linesGroup.renderOrder = 1;

  for (let i = 1; i < PARALLELS; i++) {
    const lat = -Math.PI / 2 + (i / PARALLELS) * Math.PI;
    linesGroup.add(createParallel(lat, material));
  }

  for (let i = 0; i < MERIDIANS; i++) {
    const lon = (i / MERIDIANS) * Math.PI * 2;
    linesGroup.add(createMeridian(lon, material));
  }

  const rimGeometry = new LineGeometry();
  const rimLine = new Line2(rimGeometry, material);
  linesGroup.add(rimLine);

  globe.add(linesGroup);
  globe.rotation.x = 0.2;
  scene.add(globe);

  const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const screenScene = new THREE.Scene();
  const screenGeom = new THREE.PlaneGeometry(2, 2);
  const screenMat = new THREE.MeshBasicMaterial({
    map: renderTarget.texture,
    depthTest: false,
    depthWrite: false,
    transparent: true,
  });
  renderTarget.texture.minFilter = THREE.NearestFilter;
  renderTarget.texture.magFilter = THREE.NearestFilter;
  const screenQuad = new THREE.Mesh(screenGeom, screenMat);
  screenScene.add(screenQuad);

  const lineGeometries = linesGroup.children.map((line) => line.geometry);

  let isDragging = false;
  let lastPointerX = 0;
  const ROTATE_SPEED = 0.005;

  function onPointerDown(e) {
    isDragging = true;
    lastPointerX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - lastPointerX;
    lastPointerX = e.clientX;
    globe.rotation.y += dx * ROTATE_SPEED;
  }

  function onPointerUp(e) {
    if (isDragging) {
      isDragging = false;
      canvas.releasePointerCapture(e.pointerId);
    }
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.style.touchAction = "none";

  function updateLineResolution() {
    const s = Math.max(1, canvas.clientWidth);
    const pw = Math.max(1, Math.floor(s * PIXEL_SCALE));
    const ph = Math.max(1, Math.floor(s * PIXEL_SCALE));
    material.resolution.set(pw, ph);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) globe.rotation.y -= 0.002;
    const rimPoints = getSilhouettePoints(globe, camera);
    if (rimPoints.length > 0) {
      rimGeometry.setFromPoints(rimPoints);
    }
    renderer.setRenderTarget(renderTarget);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(screenScene, screenCamera);
  }
  animate();

  function onResize() {
    const size = getFitSize();
    applyCanvasSize(size);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    const pw = Math.max(1, Math.floor(size * PIXEL_SCALE));
    const ph = Math.max(1, Math.floor(size * PIXEL_SCALE));
    renderTarget.setSize(pw, ph);
    updateLineResolution();
  }

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(container);
  onResize();

  return () => {
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    resizeObserver.disconnect();
    lineGeometries.forEach((g) => g.dispose());
    sphereGeom.dispose();
    sphereMat.dispose();
    screenGeom.dispose();
    screenMat.dispose();
    renderTarget.dispose();
    material.dispose();
    renderer.dispose();
  };
}

const canvas = document.getElementById("globe");
if (canvas) {
  init(canvas);
}

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui"

let fov = 35;
// fov - maximum angle which can be seen throught the lens of the camera
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
renderer = new THREE.WebGLRenderer();

const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// camera.position.z = 10;
// camera.position.y = 2;
camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.rotation.x = 5;
box.rotation.y = 5;

// pass second parameter to break even into smaller squares
// const grid = new THREE.GridHelper(30, 100)
const grid = new THREE.GridHelper(30);
scene.add(grid);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.4
  // wireframe: true
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)

const gui = new dat.GUI;
const options = {
  sphereColor: "#ffae00",
  wireframe: false
}
gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function(e) {
  sphere.material.wireframe = e;
})
 
const light = new THREE.PointLight('white', 1, 100)
light.position.set(10, 10, 10)
light.intensity = 1.20

scene.add(light)


function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

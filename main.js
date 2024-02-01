import './style.css'
import {sizes} from "./constants.js";
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import * as THREE from 'three';
import {OrbitControls} from "three/addons";

// scene
const scene = new THREE.Scene();

let mesh;

// sphere
const sphereGeo = new THREE.SphereGeometry(3, 64, 64);
const sphereMat = new THREE.MeshStandardMaterial({
    color: '#00ff83'
})

const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// light
const light = new THREE.PointLight('#ffffff', 80, 50);
light.position.set(0, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, .1, 100);
camera.position.z = 15;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop)
}
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(sphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
tl.fromTo('.name h1', { opacity: 0, y: '100px' }, { opacity: 1, y: 0 });

gsap.fromTo('.intro p', { opacity: 0 }, {
    opacity: 1,
    scrollTrigger: {
        trigger: '.intro p',
        start: 'top 70%',
        end: 'bottom center',
        scrub: 1,
    },
});

let rgb = [12, 23, 55];
window.addEventListener('mousemove', (e) => {
        rgb = [
            Math.round((e.pageX / sizes.width ) * 255),
            Math.round((e.pageY / sizes.height ) * 255),
            150
        ]
        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
        gsap.to(sphere.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        })
})

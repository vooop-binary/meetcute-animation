import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg')
scene.background = spaceTexture

let logo

// GLTF Model
const loader = new GLTFLoader()
loader.load('./assets/Wifi_Test.glb', (gltf) => {
    logo = gltf.scene
    logo.scale.set(3, 3, 3)
    scene.add(logo)
})

// Point Light
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5, 5, 5)

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight, ambientLight)

// Speech Recognition
// if ("webkitSpeechRecognition" in window) {
//     let speechRecognition = new webkitSpeechRecognition();
//     speechRecognition.continuous = true;
//     speechRecognition.interimResults = true;
//     speechRecognition.start()
//     speechRecognition.onresult = e => {
//     };
// } else {
//   console.error("Speech Recognition Not Available")
// }

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)

const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

// Array(100).fill().forEach(addStar)

const animate = () => {
    requestAnimationFrame(animate)

    controls.update()
    logo.rotation.y += 0.02
    
    renderer.render(scene, camera)
}

animate()

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// here is the stuff to load model files
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//continuing with what was already here




// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );


//texture
//const texture = new THREE.TextureLoader().load("C:/Users/13163/Documents/GitHub/learning-node.js/code/three-js/designcourseyt/src/textures/water.jpg")


// Materials

const material = new THREE.MeshBasicMaterial({color:0xff75fc})
const material1 = new THREE.MeshBasicMaterial({color:0xfffff})
material.color = new THREE.Color(0xffffff)
material1.color = new THREE.Color(0xff75a3)

// Mesh
const torus = new THREE.Mesh(geometry,material)
const torus2 = new THREE.Mesh(geometry,material1)
scene.add(torus)
scene.add(torus2)

// Lights

const pointLight = new THREE.PointLight(0xff0000, 0.1)
pointLight.position.x = 3
pointLight.position.y = 3
pointLight.position.z = 3
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torus.rotation.y = 1 * elapsedTime
    torus2.rotation.y = -3.141595 * elapsedTime
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
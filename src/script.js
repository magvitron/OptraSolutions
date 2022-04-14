import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// loading
const textureloader = new THREE.TextureLoader()
const normalTexture = textureloader.load('/textures/NormalMap.png')
// Debug panels
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusKnotGeometry(10,5,100,100)
// TorusKnotGeometry( 10, 3, 100, 16 );
const geometry = new THREE.SphereBufferGeometry(0.5,64,64);
// const geometry = new THREE.CubeGeometry(10, 10)
// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness =0.7;
material.roughness =0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//pointlight 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(1.7,-2.1,0);
pointLight2.intensity =5
scene.add(pointLight2)

const light1Folder =gui.addFolder('Light1')
light1Folder.add(pointLight2.position,'y').min(-3).max(3).step(0.1)
light1Folder.add(pointLight2.position,'x').min(-6).max(6).step(0.1)
light1Folder.add(pointLight2.position,'z').min(-2).max(2).step(0.1)
light1Folder.add(pointLight2,'intensity').min(1).max(10).step(0.1)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper,1)
//pointlight 3
const pointLight3 = new THREE.PointLight(0x0000ff, 2)
pointLight3.position.set(-6,3,-2);
pointLight3.intensity =6
scene.add(pointLight3)

const light3Folder =gui.addFolder('Light3')
light3Folder.add(pointLight3.position,'y').min(-3).max(3).step(0.1)
light3Folder.add(pointLight3.position,'x').min(-6).max(6).step(0.1)
light3Folder.add(pointLight3.position,'z').min(-2).max(2).step(0.1)
light3Folder.add(pointLight3,'intensity').min(1).max(10).step(0.1)

const light3Color ={
    color :0xff0000
}
light3Folder.addColor(light3Color,'color')
.onChange(()=> {
pointLight3.color.set(light3Color.color)
}
)
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointLightHelper3,1)
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove',onDocumentMouseMove);
document.addEventListener('touchmove',onDocumentTouchMove);

let mouseX =0
let mouseY =0

let targetX =0
let targetY =0

const windowHalfX = window.innerWidth/2;
const windowHalfY = window.innerHeight/2;


function onDocumentMouseMove(event) {
    mouseX = (event.clientX -windowHalfX)
    mouseY = (event.clientY -windowHalfY)
}

function onDocumentTouchMove(event){
    mouseX = (event.targetTouches[0].pageX / window.innerWidth)
    mouseY = (event.targetTouches[0].pageY / window.innerWidth)
}

const updateSphere = (event)=> {
    sphere.position.y=window.scrollY * 0.001
}
document.addEventListener('scroll',updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += 0.5*(targetX - sphere.rotation.y);
    sphere.rotation.x += 0.5*(targetY - sphere.rotation.x);
    sphere.position.z += -0.5*(targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
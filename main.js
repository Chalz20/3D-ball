import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

//scene
const scene = new THREE.Scene();

//creating a sphere
const geometry = new THREE.SphereGeometry(4,64,64);
const material = new THREE.MeshStandardMaterial({
  color: "grey",
  roughness: 0.5
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Light source 
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1,1,1)
scene.add(light) 

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth , window.innerHeight)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener("resize", () =>{
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth , window.innerHeight)
})

const loop = () =>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline Magic
const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale, {z:0, x:0 , y:0} , {z:1 , x:1 , y:1})
t1.fromTo("nav",{y:"-100%"},{y:"0%"})
t1.fromTo(".title", {opacity:0},{opacity:1})


//Change color 
let mouseDown = false
let rgb = []
window.addEventListener("mousedown",() => (mouseDown = true))
window.addEventListener("mouseup",() => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / window.innerWidth)* 255),
      Math.round((e.pageY / window.innerHeight)* 255),
      150,
    ]
    //Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g:newColor.g,
      b:newColor.b,
    })
  }
})

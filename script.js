import * as THREE from 'https://cdn.skypack.dev/three@0.136.0'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'
import { Vector3 } from 'https://cdn.skypack.dev/three@0.136.0'
import { VRButton } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/webxr/VRButton.js';

//Loading
const textureLoader = new THREE.TextureLoader()
const sunTexture = textureLoader.load('./textures/sun.jpg')
const mercureTexture = textureLoader.load('./textures/mercure.jpg')
const venusTexture = textureLoader.load('./textures/venus.jpg')
const earthTexture = textureLoader.load('./textures/earth.jpg')
const marsTexture = textureLoader.load('./textures/mars.jpg')
const jupiterTexture = textureLoader.load('./textures/jupiter.jpg')
const saturnTexture = textureLoader.load('./textures/saturne.jpg')
const ringTexture = textureLoader.load('./textures/satRing.jpg')
const uranusTexture = textureLoader.load('./textures/uranus.jpg')
const neptuneTexture = textureLoader.load('./textures/neptune.jpg')
const shadowTexture = textureLoader.load('./textures/shadow.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 400)
camera.position.x = 0
camera.position.y = -.1
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true,
    antialias : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//VR
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true

// Objects
const astre = new THREE.SphereBufferGeometry(1,32,16);
const asteroids = new THREE.RingBufferGeometry(1.1,1.8,128,32);
const planeShadow = new THREE.PlaneGeometry(3,3)
const wallBox = new THREE.BoxGeometry(1,1,1)
const points = []
  points.push(new THREE.Vector3(0,10,0))
  points.push(new THREE.Vector3(0,0,0))
const geometry = new THREE.BufferGeometry().setFromPoints(points)

// Materials
const materialSun = new THREE.MeshStandardMaterial()
  materialSun.emissiveMap = sunTexture
  materialSun.emissive = new THREE.Color(0xffff00)
  materialSun.map = sunTexture

const materialMercure = new THREE.MeshStandardMaterial()
  materialMercure.map = mercureTexture

const materialVenus = new THREE.MeshStandardMaterial()
  materialVenus.map = venusTexture

const materialEarth = new THREE.MeshStandardMaterial()
  materialEarth.map = earthTexture

const materialMars = new THREE.MeshStandardMaterial()
  materialMars.map = marsTexture

const materialJupiter = new THREE.MeshStandardMaterial()
  materialJupiter.map = jupiterTexture

const materialSaturn = new THREE.MeshStandardMaterial()
  materialSaturn.roughness = .8
  materialSaturn.map = saturnTexture
  materialSaturn.color = new THREE.Color(0xffddaa)

const materialRing = new THREE.MeshStandardMaterial()
  materialRing.side = 2
  materialRing.map = ringTexture
  materialRing.alphaMap = ringTexture
  materialRing.alpha = .1
  materialRing.color = new THREE.Color(0xffffff)

const materialUranus = new THREE.MeshStandardMaterial()
  materialUranus.map = uranusTexture

const materialNeptune = new THREE.MeshStandardMaterial()
  materialNeptune.map = neptuneTexture

const materialWall = new THREE.MeshStandardMaterial()
  materialWall.roughness = 0.2
  materialWall.color = new THREE.Color(0xffffff)

const materialSupport = new THREE.LineBasicMaterial( { color: 0x292929 } )

const materialGlass = new THREE.MeshPhysicalMaterial({
  metalness: .9,
  roughness: .05,
  envMapIntensity: 0.9,
  clearcoat: 1,
  transparent: true,
  // transmission: .95,
  opacity: .5,
  reflectivity: 0.2,
  refractionRatio: 0.985,
  ior: 0.9,
  side: THREE.BackSide,
})

// Mesh

//Creating planets and sun
const sun = new THREE.Mesh(astre.clone(),materialSun)
  sun.scale.set(1.5,1.5,1.5)
  sun.position.set(0,1,0)
  scene.add(sun)

const mercure = new THREE.Mesh(astre.clone(),materialMercure)
  mercure.scale.set(.1,.1,.1)
  mercure.position.set(1.2,0.5,1.2)
  scene.add(mercure)

const venus = new THREE.Mesh(astre.clone(),materialVenus)
  venus.scale.set(.2,.2,.2)
  venus.position.set(.7,0.5,1.8)
  scene.add(venus)

const terre = new THREE.Mesh(astre.clone(),materialEarth)
  terre.scale.set(.3,.3,.3)
  terre.position.set(-0.5,0.5,2.5)
  scene.add(terre)

const mars = new THREE.Mesh(astre.clone(),materialMars)
  mars.scale.set(.2,.2,.2)
  mars.position.set(-2,0.5,2.75)
  scene.add(mars)

const jupiter = new THREE.Mesh(astre.clone(),materialJupiter)
  jupiter.scale.set(.75,.75,.75)
  jupiter.position.set(-2,2,-1.2)
  jupiter.castShadow = true
  jupiter.receiveShadow = true
  scene.add(jupiter)

const saturn = new THREE.Mesh(astre.clone(),materialSaturn)
  saturn.scale.set(.5,.5,.5)
  saturn.position.set(-1,2,-2.8)
  saturn.castShadow = true
  saturn.receiveShadow = true
  scene.add(saturn)

const ring = new THREE.Mesh(asteroids, materialRing)
  ring.scale.set(.5,.5,.5)
  ring.position.set(-1,2,-2.8)
  ring.rotation.x=-1.4;
  ring.rotation.y=0.5;
  ring.castShadow = true
  ring.receiveShadow = true
  scene.add(ring)

const uranus = new THREE.Mesh(astre.clone(),materialUranus)
  uranus.scale.set(.35,.35,.35)
  uranus.position.set(0.2,2,-3.5)
  uranus.castShadow = true
  uranus.receiveShadow = true
  scene.add(uranus)

const neptune = new THREE.Mesh(astre.clone(),materialNeptune)
  neptune.scale.set(.34,.34,.34)
  neptune.position.set(1.3,2,-3.9)
  neptune.castShadow = true
  neptune.receiveShadow = true
  scene.add(neptune)

//Creating supports for planets
const lineSun = new THREE.Line(geometry, materialSupport)
  scene.add(lineSun)

const lineMercure = new THREE.Line(geometry, materialSupport)
  lineMercure.position.set(1.2,0.5,1.2)
  scene.add(lineMercure)

const lineVenus = new THREE.Line(geometry, materialSupport)
  lineVenus.position.set(.7,0.5,1.8)
  scene.add(lineVenus)

const lineEarth = new THREE.Line(geometry, materialSupport)
  lineEarth.position.set(-0.5,0.5,2.5)
  scene.add(lineEarth)

const lineMars = new THREE.Line(geometry, materialSupport)
  lineMars.position.set(-2,0.5,2.75)
  scene.add(lineMars)

  const lineJupiter = new THREE.Line(geometry, materialSupport)
    lineJupiter.position.set(-2,2,-1.2)
    scene.add(lineJupiter)

  const lineSaturn = new THREE.Line(geometry, materialSupport)
    lineSaturn.position.set(-1,2,-2.8)
    scene.add(lineSaturn)

  const lineUranus = new THREE.Line(geometry, materialSupport)
    lineUranus.position.set(0.2,2,-3.5)
    scene.add(lineUranus)

  const lineNeptune = new THREE.Line(geometry, materialSupport)
    lineNeptune.position.set(1.3,2,-3.9)
    scene.add(lineNeptune)

//Creating the 3D Museum

const ground = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  ground.scale.set(20,0.1,30)
  ground.position.set(0,-2,0)
  scene.add(ground)

const wallLeft = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  wallLeft.scale.set(10,0.1,30)
  wallLeft.position.set(-10,3,0)
  wallLeft.rotation.z= Math.PI /2
  scene.add(wallLeft)

const wallRight = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  wallRight.scale.set(10,0.1,30)
  wallRight.position.set(10,3,0)
  wallRight.rotation.z= Math.PI /2
  scene.add(wallRight)

const wallFront = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  wallFront.scale.set(14,0.1,10)
  wallFront.position.set(-3,3,-15)
  wallFront.rotation.x= Math.PI /2
  scene.add(wallFront)

const wallBack = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  wallBack.scale.set(20,0.1,10)
  wallBack.position.set(0,3,15)
  wallBack.rotation.x= Math.PI /2
  scene.add(wallBack)

const socleCentral = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socleCentral.scale.set(6.5,0.5,10)
  socleCentral.position.set(0,-1.75,0)
  scene.add(socleCentral)

const soclePlafond = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  soclePlafond.scale.set(6.5,4,10)
  soclePlafond.position.set(0,8,0)
  scene.add(soclePlafond)

const glass = new THREE.Mesh(wallBox.clone(), materialGlass.clone())
    glass.scale.set(6,10,9.5)
    glass.position.set(0,2.5,0)
    scene.add(glass)

//Creating second set planets on supports

const mercure2 = new THREE.Mesh(astre.clone(),materialMercure)
  mercure2.scale.set(.1,.1,.1)
  mercure2.position.set(-2,1,10)
  scene.add(mercure2)

const venus2 = new THREE.Mesh(astre.clone(),materialVenus)
  venus2.scale.set(.2,.2,.2)
  venus2.position.set(-6,1,10)
  scene.add(venus2)

const terre2 = new THREE.Mesh(astre.clone(),materialEarth)
  terre2.scale.set(.3,.3,.3)
  terre2.position.set(2,1,10)
  scene.add(terre2)

const mars2 = new THREE.Mesh(astre.clone(),materialMars)
  mars2.scale.set(.2,.2,.2)
  mars2.position.set(6,1,10)
  scene.add(mars2)

const jupiter2 = new THREE.Mesh(astre.clone(),materialJupiter)
  jupiter2.scale.set(.75,.75,.75)
  jupiter2.position.set(-2,1,-10)
  jupiter2.castShadow = true
  jupiter2.receiveShadow = true
  scene.add(jupiter2)

const saturn2 = new THREE.Mesh(astre.clone(),materialSaturn)
  saturn2.scale.set(.5,.5,.5)
  saturn2.position.set(-6,1,-10)
  saturn2.castShadow = true
  saturn2.receiveShadow = true
  scene.add(saturn2)

const ring2 = new THREE.Mesh(asteroids, materialRing)
  ring2.scale.set(.5,.5,.5)
  ring2.position.set(-6,1,-10)
  ring2.rotation.x=-1.4;
  ring2.rotation.y=0.5;
  ring2.castShadow = true
  ring2.receiveShadow = true
  scene.add(ring2)

const uranus2 = new THREE.Mesh(astre.clone(),materialUranus)
  uranus2.scale.set(.35,.35,.35)
  uranus2.position.set(2,1,-10)
  uranus2.castShadow = true
  uranus2.receiveShadow = true
  scene.add(uranus2)

const neptune2 = new THREE.Mesh(astre.clone(),materialNeptune)
  neptune2.scale.set(.34,.34,.34)
  neptune2.position.set(6,1,-10)
  neptune2.castShadow = true
  neptune2.receiveShadow = true
  scene.add(neptune2)

const socle1 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle1.scale.set(1,2,1)
  socle1.position.set(-2,-1,10)
  scene.add(socle1)

const socle2 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle2.scale.set(1,2,1)
  socle2.position.set(-6,-1,10)
  scene.add(socle2)

const socle3 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle3.scale.set(1,2,1)
  socle3.position.set(2,-1,10)
  scene.add(socle3)

const socle4 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle4.scale.set(1,2,1)
  socle4.position.set(6,-1,10)
  scene.add(socle4)

const socle5 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle5.scale.set(1,2,1)
  socle5.position.set(-2,-1,-10)
  scene.add(socle5)

const socle6 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle6.scale.set(1,2,1)
  socle6.position.set(-6,-1,-10)
  scene.add(socle6)

const socle7 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle7.scale.set(1,2,1)
  socle7.position.set(2,-1,-10)
  scene.add(socle7)

const socle8 = new THREE.Mesh(wallBox.clone(), materialWall.clone())
  socle8.scale.set(1,2,1)
  socle8.position.set(6,-1,-10)
  scene.add(socle8)

//------END 3D-----------

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.x = 2
  pointLight.position.y = 3.5
  pointLight.position.z = 4
  scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffeeee, .8)
  pointLight2.position.x = -5
  pointLight2.position.y = -3.5
  pointLight2.position.z = -4
  scene.add(pointLight2)

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    saturn.rotation.y = .5 * elapsedTime

    ring.rotation.z = 1* elapsedTime

//Partie VR
    renderer.setAnimationLoop( function () {

    	renderer.render( scene, camera );

    } );

    // Update Orbital Controls
controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

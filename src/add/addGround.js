import * as THREE from 'three'
import * as CANNON from 'cannon'

import { scene, world } from '../index'

export const addGround = function () {
  const groundSize = 10
  const groundSegments = 100 // resolution of the ground. higher = better shadow quality
  const bounds = 50 // if an ob
  // THREE
  // https://stackoverflow.com/a/52726872/2255980
  const innerGeo = new THREE.PlaneGeometry(groundSize, groundSize, groundSegments, groundSegments)
  const innerMat = new THREE.MeshLambertMaterial({ color: 'blue' })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  innerMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
  innerMesh.receiveShadow = true
  scene.add(innerMesh)

  const outerGeo = new THREE.PlaneGeometry(bounds, bounds)
  const outerMat = new THREE.MeshLambertMaterial({ color: 'white' })
  const outerMesh = new THREE.Mesh(outerGeo, outerMat)
  outerMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
  outerMesh.position.y = -0.1
  outerMesh.receiveShadow = true
  scene.add(outerMesh)


  // CANNON
  // Create a plane
  // const shape = new CANNON.Plane() 
  const shape = new CANNON.Box(new CANNON.Vec3(bounds / 2, bounds / 2, 0.1))
  const body = new CANNON.Body({ mass: 0, shape }) // mass = 0 which makes it static
  body.position.set(0, -0.2, 0)
  body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.add(body)
}

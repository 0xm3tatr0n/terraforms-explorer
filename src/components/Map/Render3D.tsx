import React, { useState, useEffect, useRef } from 'react'
import { Grid, Slider, Box, Stack, Drawer } from '@mui/material'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { fallbackColor } from './utils/index'

import { IRender3DProps } from './interfaces'

function Render3D(props: IRender3DProps) {
  const {
    dataToRender,
    testState,
    colorDimension,
    colorMap,
    cameraState,
    setCameraState,
    spaceSlider,
    spaceSliderHorizontal,
  } = props

  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('init map: ', dataToRender)
    if (!mount || !mount.current) return
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId: number | null

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(18, width / height, 0.1, 1000000)

    if (cameraState.length === 3) {
      camera.position.x = cameraState[0]
      camera.position.y = cameraState[1]
      camera.position.z = cameraState[2]
    } else {
      camera.position.x = 174
      camera.position.y = 174
      camera.position.z = 174
    }
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const controls = new OrbitControls(camera, renderer.domElement)
    const geometry = new THREE.BoxBufferGeometry(1, 0.5, 1)
    const material = new THREE.MeshLambertMaterial({ color: 0xff00ff })

    // add color to edges of material

    // add axes helper
    const axesHelper = new THREE.AxesHelper(150)
    scene.add(axesHelper)
    // camera

    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(40, 80, 50)
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 80, 50)
    scene.add(directionalLight2)

    // const helper = new THREE.DirectionalLightHelper(directionalLight, 5)
    // scene.add(helper)

    // const helper2 = new THREE.DirectionalLightHelper(directionalLight2, 5)
    // scene.add(helper2)

    // loop over level data
    for (let i = 0; i < dataToRender.length; i++) {
      const block = dataToRender[i]

      const {
        tokenId: id,
        xCoordinate: x,
        yCoordinate: y,
        level,
        biome,
        zoneName: zone,
        elevation,
      } = block

      let materialColored

      switch (colorDimension) {
        case 'level':
          materialColored = new THREE.MeshLambertMaterial({
            color: fallbackColor(colorMap[level]),
          })
          break
        case 'biome':
          materialColored = new THREE.MeshLambertMaterial({
            color: fallbackColor(colorMap[biome]),
          })
          break
        case 'zone':
          materialColored = new THREE.MeshLambertMaterial({
            color: fallbackColor(colorMap[zone]),
          })
          break
        case 'mine':
          materialColored = new THREE.MeshLambertMaterial({
            color: fallbackColor(colorMap[id]),
          })
          break
        default:
          materialColored = new THREE.MeshLambertMaterial({
            color: '#ff00ff',
          })
          break
      }

      const geometry = new THREE.BoxBufferGeometry(1, elevation, 1)

      const plot = new THREE.Mesh(geometry, materialColored)
      plot.position.set(
        x * spaceSliderHorizontal,
        level * spaceSlider,
        y * spaceSliderHorizontal,
      )
      scene.add(plot)
    }

    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    const handleResize = () => {
      // @ts-ignore
      width = mount.current.clientWidth
      // @ts-ignore
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }

    const animate = () => {
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      // @ts-ignore
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()

    // @ts-ignore
    controls.current = { start, stop }

    return () => {
      setCameraState([camera.position.x, camera.position.y, camera.position.z])
      stop()
      window.removeEventListener('resize', handleResize)
      // @ts-ignore
      mount.current.removeChild(renderer.domElement)

      scene.remove()
      geometry.dispose()
      material.dispose()
    }
  }, [
    dataToRender,
    colorMap,
    colorDimension,
    spaceSlider,
    spaceSliderHorizontal,
    testState,
  ])

  return (
    <Grid item xs={9}>
      <div className="vis" ref={mount} />
    </Grid>
  )
}

export default Render3D

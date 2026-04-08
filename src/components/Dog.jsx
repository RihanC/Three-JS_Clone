import React from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { normalMap } from 'three/tsl'

const Dog = () => {

    const model = useGLTF("/models/dog.drc.glb")


    useThree(({camera,scene, gl}) =>{

        camera.position.z = 0.7
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace

    })


    const texture = useTexture({
        normalMap: "/models/dog_normals.jpg",
        sampleMatCap : "/matcap/mat-19.jpg"
    }, (texture)=>{

    })

    texture.normalMap.flipY = false
    texture.sampleMatCap.colorSpace = THREE.SRGBColorSpace

    model.scene.traverse((child) => {
        if(child.name.includes("DOG")){
            child.material = new THREE.MeshMatcapMaterial({
                normalMap: texture.normalMap,
                matcap: texture.sampleMatCap
            })
        }
    })

    return (
        <>
        <primitive object={model.scene} position={[0.2, -0.5, 0]} rotation={[0, Math.PI/3.7, 0]} />
        <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
        <OrbitControls />
        </>


    )
}

export default Dog

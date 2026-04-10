import React, { use } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture , useAnimations} from '@react-three/drei'
import { normalMap } from 'three/tsl'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Dog = () => {

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(useGSAP())

    const model = useGLTF("/models/dog.drc.glb")


    useThree(({camera,scene, gl}) =>{

        camera.position.z = 0.7
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace

    })

    const { actions } = useAnimations(model.animations, model.scene)

    useEffect(() => {
        actions["Take 001"].play()
    }, [actions])


    const[normalMap, sampleMatCap] = useTexture([
        "/models/dog_normals.jpg",
        "/matcap/mat-19.jpg",
        "/models/branches_diffuse.jpeg",
        "/models/branches_normals.jpeg"
    ]).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const [branchMap, branchNormalMap] = useTexture([
        "/models/branches_diffuse.jpeg",
        "/models/branches_normals.jpeg"
    ]).map((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    //const normalMap = texture.normalMap

    const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        matcap: branchMap
    })


    model.scene.traverse((child) => {
        if(child.name.includes("DOG")){
            child.material = new THREE.MeshMatcapMaterial({
                normalMap: normalMap,
                matcap: sampleMatCap
            })
        }
        else{
            child.material = branchMaterial
        }
    })

    const dogModel = useRef(model);

    useGSAP(() =>{

        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                markers: true,
                scrub: true,
            }
        })

        tl
        .to(dogModel.current.scene.position,{
            z:"-=0.35",
            y:"+=0.2",
        })

        .to(dogModel.current.scene.rotation,{
            x:`+=${Math.PI/15}`,
        })

        .to(dogModel.current.scene.rotation,{
            y:`-=${Math.PI}`,
        }, "third")

        .to(dogModel.current.scene.position,{
            x:"-=0.4",
            z:"+=0.35",
            y:"-=0.1",
        }, "third")
    } ,[])


    return (
        <>
        <primitive object={model.scene} position={[0.2, -0.5, 0]} rotation={[0, Math.PI/3.7, 0]} />
        <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
        </>


    )
}

export default Dog

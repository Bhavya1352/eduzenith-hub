import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, OrbitControls } from '@react-three/drei'
import { Mesh, Group } from 'three'

function FloatingShapes() {
  const groupRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.5 + Math.random() * 1,
      color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#a855f7' : '#06b6d4'
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            {i % 3 === 0 && <boxGeometry args={[1, 1, 1]} />}
            {i % 3 === 1 && <sphereGeometry args={[0.7]} />}
            {i % 3 === 2 && <octahedronGeometry args={[0.8]} />}
            <meshStandardMaterial color={shape.color} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function AnimatedRings() {
  const ringRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={ringRef} position={[3, 1, -2]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.3} />
        
        <FloatingShapes />
        <AnimatedRings />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
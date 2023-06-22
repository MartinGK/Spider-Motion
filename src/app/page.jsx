"use client";

import css from "./Home.module.css";
import Box from "../components/Box";
import LightBulb from "../components/LightBulb";
import Floor from "../components/Floor";
import OrbitControls from "../components/OrbitControls";
import Draggable from "../components/Draggable";
import { Suspense } from "react";
import Example from "../components/Example";
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Rainbow } from '../components/Rainbow'

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <Scene />
    </Canvas>
  )
}

function Scene() {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.z += delta / 5))
  return <Rainbow ref={ref} startRadius={0} endRadius={0.65} fade={0} />
}

// export default function Home() {
//   return (
//     <div className={css.scene}>
      
//     <Canvas>
//       <color attach="background" args={['black']} />
//       <Scene />
//     </Canvas>
//       {/* <Example /> */}
//       {/* <Canvas
//         shadows
//         className={css.canvas}
//         camera={{
//           position: [-6, 7, 7],
//         }}
//       >
//         <ambientLight color={"white"} intensity={0.3} />
//         <LightBulb position={[0, 3, 0]} />
//         <Draggable>
//           <Suspense fallback={null}>
//             <Box rotateX={3} rotateY={0.2} />
//           </Suspense>
//         </Draggable>
//         <Floor position={[0, -1, 0]} />
//         <OrbitControls />
//       </Canvas> */}
//     </div>
//   );
// }

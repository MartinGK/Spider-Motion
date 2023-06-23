"use client";

import css from "./Home.module.css";
import Box from "../components/Box";
import LightBulb from "../components/LightBulb";
import Floor from "../components/Floor";
import OrbitControls from "../components/OrbitControls";
import Draggable from "../components/Draggable";
import { Suspense } from "react";
import Example from "../components/Example";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Rainbow } from "../components/Rainbow";
import * as THREE from "three";

function init() {
  //creating scene
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a3b4c);

  //add camera
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );

  //renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //add geometry
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  var cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  camera.position.z = 5;

  //animation
  var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}

export default function App() {
  return <div className="App">{init()}</div>;
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

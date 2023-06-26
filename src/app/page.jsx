"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { BoxGeometry, TextureLoader, RepeatWrapping } from "three";
import * as THREE from "three";
import "../app/globals.css";
import CardsGroup from "../components/CardsGroup";
import Portrait from "../components/Portrait";
import Controls from "../components/Controls";

const Room = () => {
  const texture = useLoader(TextureLoader, "textura.jpg");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  const [pathCompleted, setPathCompleted] = useState(false);
  texture.repeat.set(4, 4); // Ajusta estos valores según el tamaño de tus cuadrados y la geometría

  const mesh = useRef();
  useFrame(({ camera }) => {
    // Código para mover la cámara hacia adelante, pero sin llegar al final
    // Mueve la habitación hacia atrás para crear la ilusión de movimiento hacia adelante
    // Cuando la habitación se ha alejado lo suficiente, la reseteamos a la posición original
    if (mesh.current.position.z > -30) {
      if (mesh.current.position.z < -28) {
        mesh.current.material.opacity -= 0.005;
      }
      if (mesh.current.position.z < -29) {
        mesh.current.position.z -= 0.01;
      } else {
        mesh.current.position.z -= 0.01;
        if (mesh.current.material.opacity < 1) {
          mesh.current.material.opacity += 0.005;
        }
      }
    } else {
      mesh.current.position.z = 0;
      mesh.current.material.opacity = 0;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <boxGeometry args={[50, 50, 50]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  );
};

const App = () => (
  <>
    <Portrait />
    <div className="w-screen h-screen absolute">
      <CardsGroup />
      <Canvas>
        <Room />
        <Controls />
      </Canvas>
    </div>
  </>
);

export default App;

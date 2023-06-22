"use client";

import css from "./Home.module.css";
import { Canvas } from "@react-three/fiber";
import Box from "../components/Box";
import LightBulb from "../components/LightBulb";
import Floor from "../components/Floor";
import OrbitControls from "../components/OrbitControls";
import Draggable from "../components/Draggable";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={css.scene}>
      <Canvas
        shadows
        className={css.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        <ambientLight color={"white"} intensity={0.3} />
        <LightBulb position={[0, 3, 0]} />
        <Draggable>
          <Suspense fallback={null}>
            <Box rotateX={3} rotateY={0.2} />
          </Suspense>
        </Draggable>
        <Floor position={[0, -1, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

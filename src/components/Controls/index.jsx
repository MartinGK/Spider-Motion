"use client";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // This reference will give us direct access to the mesh
  const controlsRef = useRef();
  useFrame((state) => controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
};

export default Controls;

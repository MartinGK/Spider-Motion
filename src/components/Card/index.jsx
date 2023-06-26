"use client";
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import ImagePlane from "../ImagePlane";

const Card = ({ imageUrl, ...props }) => {
  const mesh = useRef();
  useFrame(() => {
    // return (mesh.current.position.z += 0.001);
  }); // Esta línea crea la animación

  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <>
      <ImagePlane url={imageUrl} position={[0, 0, -5]} />

      {/* <mesh ref={mesh} {...props}>
        <boxGeometry args={[1, 1, 0]} />
        <meshBasicMaterial map={texture} />
      </mesh> */}
    </> 
  );
};

export default Card;

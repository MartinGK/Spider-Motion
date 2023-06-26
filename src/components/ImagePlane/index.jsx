import { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

function ImagePlane({ url, mousePosition, ...props }) {
  const texture = useLoader(TextureLoader, url);

  // Ref para acceder a la malla
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      const [mouseX, mouseY] = mousePosition;
      meshRef.current.rotation.z = 0;

      // console.log(mousePosition)
      // Configura la rotación en función de la posición del mouse
      // meshRef.current.rotation.x = (mouseY / window.innerHeight) * Math.PI * 0.25;
      // meshRef.current.rotation.y = (mouseX / window.innerWidth) * Math.PI * 0.25;
      meshRef.current.rotation.x = props.rotation.x;
      meshRef.current.rotation.y = props.rotation.y;

      
      // meshRef.current.rotation.x =
      //   (mouseY /
      //     (mouseY > window.innerHeight / 2
      //       ? window.innerHeight
      //       : window.innerHeight / 2)) *
      //   Math.PI *
      //   0.25;
      // meshRef.current.rotation.y =
      //   (mouseX / window.innerWidth) * Math.PI * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} {...props} >
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material">
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
}

export default ImagePlane;

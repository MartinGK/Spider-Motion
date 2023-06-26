import { useRef, useState } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame, extend } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Link from "next/link";

extend({ Link });

function ImagePlane({ url, mousePosition, ...props }) {
  const router = useRouter();
  const texture = useLoader(TextureLoader, url);
  const [dataBeforeClicked, setDataBeforeClicked] = useState(null);
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

      // Ajusta la opacidad basándose en la posición Z del mesh
      const zPosition = meshRef.current.position.z;
      const opacity = 2 / Math.abs(zPosition); // Opacidad inversamente proporcional a la distancia a Z=0
      meshRef.current.material.opacity = 1;
    }
  });

  const handleClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    router.push(`/spider/${props.spiderId}`);
  };

  const handlePointerLeave = () => {
    if (dataBeforeClicked) {
      meshRef.current.position.x = dataBeforeClicked.x;
      meshRef.current.position.y = dataBeforeClicked.x;
      meshRef.current.position.z = dataBeforeClicked.z;
      meshRef.current.material.opacity = dataBeforeClicked.op;
    }
  };

  return (
      <mesh
        ref={meshRef}
        {...props}
        onClick={handleClick}
        onPointerOut={handlePointerLeave}
        className="imagePlane"
      >
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" transparent>
          <primitive attach="map" object={texture} />
        </meshBasicMaterial>
      </mesh>
  );
}

export default ImagePlane;

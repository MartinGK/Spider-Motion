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
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = 0;
      meshRef.current.rotation.x = props.rotation.x;
      meshRef.current.rotation.y = props.rotation.y;
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

"use client";
import useImagesVariables from "../../stores/ImagesVariables.jsx";
import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import ImagePlane from "../ImagePlane";

export default function CardsGroup() {
  const { data, fetch, plusZAxis, minusZAxis, lookMousePosition } =
    useImagesVariables();
  const [scrollMult, setScrollMult] = useState(1);
  const [mousePositionX, setMousePositionX] = useState(0);
  const [mousePositionY, setMousePositionY] = useState(0);

  useEffect(() => {
    setScrollMult(window.innerHeight / 2);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleWheelCapture = (e) => {
    if (e.deltaY > 0) {
      plusZAxis();
    } else {
      minusZAxis();
    }
  };

  const handleMouseMove = (e) => {
    lookMousePosition({ mouseX: e.pageX, mouseY: e.pageY });
    setMousePositionX(e.pageX);
    setMousePositionY(e.pageY);
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (scrollMult > e.touches[0].clientY) {
        plusZAxis();
      } else {
        minusZAxis();
      }
      setScrollMult(e.touches[0].clientY);
    },
    [scrollMult]
  );

  return (
    <div
      className="absolute z-30 w-screen h-screen"
      onWheelCapture={handleWheelCapture}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[1, 1, 1]} />
        {data.map((cardInfo, i) => {
          return (
            <ImagePlane
              key={`card-${i}`}
              url={cardInfo.imgUrl}
              mousePosition={[mousePositionX, mousePositionY]}
              spiderId={cardInfo.id}
              rotation={cardInfo.rotation}
              position={[cardInfo.x, cardInfo.y, cardInfo.z]}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

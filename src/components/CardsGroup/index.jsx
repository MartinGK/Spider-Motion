"use client";
import useMarvelStore from "../../api/index.jsx";
import useImagesVariables from "../../stores/ImagesVariables.jsx";
import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import ImagePlane from "../ImagePlane";
import Card from "../Card/index.jsx";

export default function CardsGroup() {
  // const { fetch, data } = useMarvelStore();
  const { data, loading, fetch, plusZAxis, minusZAxis, lookMousePosition } =
    useImagesVariables();
  const [scrollMult, setScrollMult] = useState(1);
  const [isMobile, setIsMobile] = useState(true);
  const [mousePositionX, setMousePositionX] = useState(0);
  const [mousePositionY, setMousePositionY] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setScrollMult(window.innerHeight / 2);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleWheelCapture = (e) => {
    console.log(scrollMult);
    // checkZAxis(scrollMult);
    // if(isMobile){
    //   return;
    // }
    if (e.deltaY > 0) {
      plusZAxis();
      // setScrollMult(scrollMult + 0.02);
    } else {
      minusZAxis();
      // setScrollMult(scrollMult - 0.02);
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

  const handleMouseOver = () => {
    console.log("IM HEREE");
  };

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
          if (
            // cardInfo.imgUrl ===
            // "http://i.annihil.us/u/prod/marvel/i/mg/2/30/531771c2ab020.jpg"
            i === 9
          ) {
            // console.log(cardInfo.name);
            // console.log("cardInfo.x", cardInfo.x);
            // console.log("cardInfo.y", cardInfo.y);
            // console.log("cardInfo.z", cardInfo.z);
            // console.log(cardInfo);
          }

          return (
            <ImagePlane
              key={`card-${i}`}
              url={cardInfo.imgUrl}
              mousePosition={[mousePositionX, mousePositionY]}
              spiderId={cardInfo.id}
              // rotation={[
              //   Math.PI /
              //     (mousePositionY / (mousePositionY > screenHeight ? 10 : -10)),
              //   Math.PI /
              //     (mousePositionX / (mousePositionX > screenWidth ? 10 : -10)),
              //   // Math.PI / (mousePositionY > screenHeight / 2 ? 10 : -10),
              //   // Math.PI / (mousePositionX > screenWidth / 2 ? 10 : -10),
              //   0,
              // ]}
              onPointerOver={handleMouseOver}
              rotation={cardInfo.rotation}
              position={[cardInfo.x, cardInfo.y, cardInfo.z]}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

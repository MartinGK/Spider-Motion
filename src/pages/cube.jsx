"use client";
import { useEffect, useState, useCallback } from "react";
import * as THREE from "three";

export default function Cube() {
  const [innerHeight, setInnerHeight] = useState(1);
  const [innerWidth, setInnerWidth] = useState(1);

  const init = useCallback(() => {
    //creating scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c);

    //add camera
    var camera = new THREE.PerspectiveCamera(75, innerHeight / innerWidth);

    //renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerHeight, innerWidth);
    document.body.appendChild(renderer.domElement);

    //add geometry
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({
      color: 0xff2200,
      wireframe: true,
    });
    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 2;

    //animation
    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();
  }, [innerWidth, innerHeight]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return <div id="Cube" className="w-screen h-screen absolute" />;
}

"use client";
import { useState, useEffect } from "react";

export default function Portriat() {
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setClose(true);
    }, 1100);
  }, [loading]);

  return (
    <div
      className={`absolute w-screen bg-red-900 flex align-center justify-center z-50 transition-all duration-1000 ease-out ${
        close ? "h-0" : "h-screen"
      }`}
    >
      <div className="text-black self-center justify-center flex flex-col gap-5 items-center">
        <p className="text-4xl font-bold font-Spider uppercase">Welcome to</p>
        <p className="text-4xl font-bold font-Spider uppercase">
          the Spider-Verse
        </p>
        <img
          className={`w-28 self-center transition-all duration-1000 ease-out ${
            !close ? "h-32" : "h-0"
          }`}
          src="/logo.png"
        ></img>
      </div>
      <div
        className={`bg-black absolute bottom-0 left-0 h-3 transition-all duration-1000 ease-out  ${
          !loading ? "w-screen" : "w-0"
        }`}
      />
    </div>
  );
}

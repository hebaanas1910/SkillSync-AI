import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const LiveBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8e44ad,
          shininess: 80,
          waveHeight: 22,
          waveSpeed: 0.6,
          zoom: 0.9,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="fixed inset-0 -z-10">
      <div ref={vantaRef} className="w-full h-full" />
      {/* Optional dark overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 backdrop-blur-sm" />
    </div>
  );
};

export default LiveBackground;

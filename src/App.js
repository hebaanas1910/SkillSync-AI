import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import "./App.css";

function App() {
  const bgRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    bgRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      starField.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      bgRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <div ref={bgRef} className="absolute inset-0 z-0" />
      <header className="relative z-10 flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">Quadropic UI</h1>
        <nav className="space-x-6">
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#features" className="hover:text-gray-400">Features</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
        </nav>
      </header>
      
      <main className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Quadropic UI
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 max-w-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Building intelligent, futuristic user interfaces with modern web technologies.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </main>
    </div>
  );
}

export default App;

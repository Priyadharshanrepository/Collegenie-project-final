
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface TypeResponseCubeProps {
  isTyping: boolean;
  inputLength: number;
}

const TypeResponseCube: React.FC<TypeResponseCubeProps> = ({ isTyping, inputLength }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [cube, setCube] = useState<THREE.Mesh | null>(null);
  
  // Create scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Initialize scene
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x202030);
    
    // Initialize camera
    const newCamera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    newCamera.position.z = 5;
    
    // Initialize renderer
    const newRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(newRenderer.domElement);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0x404040);
    newScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x3d85c6, 1);
    directionalLight.position.set(1, 1, 1);
    newScene.add(directionalLight);
    
    // Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x3d85c6,
      shininess: 100,
      specular: 0x111111,
    });
    const newCube = new THREE.Mesh(geometry, material);
    newScene.add(newCube);
    
    // Set states
    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);
    setCube(newCube);
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !newRenderer || !newCamera) return;
      
      newCamera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current && newRenderer) {
        mountRef.current.removeChild(newRenderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer || !cube) return;
    
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Adjust rotation speed based on typing state and input length
      const baseSpeed = 0.005;
      const typingMultiplier = isTyping ? 2 + (inputLength * 0.05) : 1;
      
      cube.rotation.x += baseSpeed * typingMultiplier;
      cube.rotation.y += baseSpeed * typingMultiplier;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, camera, renderer, cube, isTyping, inputLength]);
  
  return (
    <div 
      ref={mountRef} 
      className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 opacity-70 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default TypeResponseCube;

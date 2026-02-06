import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

// Define the shader material
const WaveShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture(),
        uResolution: new THREE.Vector2(0, 0),
        uWaveStrength: 0.002, // Much subtler strength
        uWaveFrequency: 1.5,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uWaveStrength;
    uniform float uWaveFrequency;
    uniform vec2 uResolution;
    
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate aspect ratio correction
      float imageAspect = 1920.0 / 1080.0; // Assuming standardized HD, adjusted via cover logic if needed
      float screenAspect = uResolution.x / uResolution.y;
      
      // Simple sine wave displacement on U coordinates based on V
      float wave = sin(uv.y * uWaveFrequency + uTime) * uWaveStrength;
      uv.x += wave;
      
      vec4 textureColor = texture2D(uTexture, uv);
      gl_FragColor = textureColor;
    }
  `
);

// Register the component in R3F
extend({ WaveShaderMaterial });

// Add type definition for the custom shader material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            waveShaderMaterial: any;
        }
    }
}



// Full screen aligned plane that scales 'cover' style
const FullScreenPlane = ({ imagePath }: { imagePath: string }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(imagePath);
    const { viewport, size } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    // Scale logic to mimic object-fit: cover
    // Image aspect ratio (assuming standard landscape or passed as prop)
    // Here we'll just cover the viewport
    return (
        <mesh scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
            <planeGeometry args={[1, 1]} />
            {/* @ts-ignore */}
            <waveShaderMaterial ref={materialRef} uTexture={texture} />
        </mesh>
    )
}

import { useThree } from '@react-three/fiber';

export const WaveBackground = ({ imagePath }: { imagePath: string }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <FullScreenPlane imagePath={imagePath} />
            </Canvas>
        </div>
    );
};

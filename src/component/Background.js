import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Chessboard from "./Chessboard";

const Scene = () => {
  const background = useGLTF("./background_scene/scene.gltf");
  return (
    <>
      <primitive
        object={background.scene}
        scale={1}
        position-y={0}
        rotation-y={0}
      />
      <Chessboard />
    </>
  );
};
const Background = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 10,
        far: 200,
        position: [15, 25, 20],
      }}
    >
      <Suspense>
        <OrbitControls
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 8}
        />

        <Scene />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};
export default Background;

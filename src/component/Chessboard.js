import React, { useState, useCallback, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls,Text} from "@react-three/drei";
import ChessPiece from "./Chesspiece";

const Chessboard = () => {
  const mountRef = useRef(null);
  const boardSize = 5;
  const tileSize = 0.85;
  const borderWidth = 0.1;
  // const [pieces, setPieces] = useState([]);
  const [camera, setCamera] = useState(null);
  const labels = [];
  const letters = 'ABCDE';
  const numbers = '12345';
  for (let i = 0; i < boardSize; i++) {
    labels.push(
      <Text rotation={[-Math.PI / 2, 0, Math.PI/4]} color="gray"  position={[i - Math.floor(boardSize / 2) + 0.1, 0.3,  Math.floor(boardSize / 2) + 1]}direction="ltr" fontSize={0.3} key={`bottom-${i}`}>
        {letters[4-i]}
      </Text>,
      
      <Text rotation={[-Math.PI / 2, 0, Math.PI / 4]}  color="gray"  position={[Math.floor(boardSize / 2) + 1, 0.3, i - Math.floor(boardSize / 2) + 0.1]} fontSize={0.3}  key={`left-${i}`}>
        {numbers[4-i]}
      </Text>,
      
    );
  }
  useEffect(() => {
    if (mountRef.current) {
      const camera = new THREE.PerspectiveCamera(
        50,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 5);
      camera.lookAt(0, 0, 0);
      setCamera(camera);
    }
  }, []);

  const createTile = useCallback(
    (x, z) => (
      <group position={[x, 0, z]} key={`${x}-${z}`}>
        {/* Border */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry
            args={[tileSize + borderWidth * 2, 0.29, tileSize + borderWidth * 2]}
          />
          <meshStandardMaterial color={"#000000"} /> {/* Border color */}
        </mesh>

        {/* Tile */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[tileSize, 0.3, tileSize]} />
          <meshStandardMaterial color={"#cef614"} /> {/* Tile color */}
        </mesh>
      </group>
    ),
    []
  );

  const tiles = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      tiles.push(
        createTile(i - Math.floor(boardSize / 2), j - Math.floor(boardSize / 2))
      );
    }
  }

  const pieces = [
    <ChessPiece position={[-1, 0.41, -1]} color="red" key="red" />,
    <ChessPiece position={[-1, 0.91, -1]} color="blue" key="blue" />,
    <ChessPiece position={[0, 0.41, -1]} color="blue" key="blue" />,
    <ChessPiece position={[-1, 0.41, 0]} color="blue" key="blue" />,
    <ChessPiece position={[-2, 0.41, -1]} color="blue" key="blue" />,
    <ChessPiece position={[-1, 0.41, -2]} color="blue" key="blue" />,
    <ChessPiece position={[0, 0.91, -1]} color="blue" key="blue" />,
    <ChessPiece position={[-1, 0.91, 0]} color="blue" key="blue" />,
    <ChessPiece position={[-2, 0.91, -1]} color="blue" key="blue" />,
    <ChessPiece position={[-1, 0.91, -2]} color="blue" key="blue" />,
    <ChessPiece position={[0, 0.41, 0]} color="blue" key="blue" />,
    <ChessPiece position={[0, 0.91, 0]} color="blue" key="blue" />,
    <ChessPiece position={[0, 1.41, 0]} color="blue" key="blue" />,
    <ChessPiece position={[0, 1.91, 0]} color="blue" key="blue" />,
  ];
  

  return (
    <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={camera}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {tiles}
        {labels}
        {pieces}
      </Canvas>
    </div>
  );
};

export default Chessboard;

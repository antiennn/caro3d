import React, { useState, useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, Text } from "@react-three/drei";
import ChessPiece from "./Chesspiece";
import { initArray, initLocation, mappingToLocation } from "../utils/constants";

const Chessboard = () => {
  const mountRef = useRef(null);
  const boardSize = 5;
  const tileSize = 2.5;
  const borderWidth = 0.5;
  const [isMyTurn, setIsMyTurn] = useState([1]);
  const [hover, setHover] = useState(false);
  const [chessPositionSuggest, setChessPositionSuggest] = useState();
  const [location, setlocation] = useState(initLocation);
  const [pieces, setPieces] = useState([]);
  const [board, setBoard] = useState(initArray);
  const [camera, setCamera] = useState(null);
  const labels = [];
  const letters = "ABCDE";
  const numbers = "12345";

  for (let i = 0; i < boardSize; i++) {
    labels.push(
      <Text
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        color="white"
        position={[
          i * 3 - Math.floor(boardSize),
          4.3,
          Math.floor(boardSize * 1.5) + 3,
        ]}
        direction="ltr"
        fontSize={1}
        key={`bottom-${i}`}
      >
        {letters[4 - i]}
      </Text>,

      <Text
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        color="white"
        position={[
          Math.floor(boardSize * 1.5) + 3,
          4.3,
          i * 3 - Math.floor(boardSize),
        ]}
        fontSize={1}
        key={`left-${i}`}
      >
        {numbers[4 - i]}
      </Text>
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
  const handlehover = (x, z) => {
    setChessPositionSuggest([x, 5, z]);
    setHover(true);
  };
  const handlemoveout = () => {
    setHover(false);
  };

  const handleClick = (x, z) => {
    let x_location = mappingToLocation(x);
    let z_location = mappingToLocation(z);
    let temp_location = location;
    temp_location[x_location + 2][z_location + 2] += 1;
    setlocation(temp_location);
    let temp_isMyturn = isMyTurn;
    temp_isMyturn[0] = -temp_isMyturn[0];
    setIsMyTurn(temp_isMyturn);
    const element = (
      <ChessPiece
        position={[
          x_location,
          location[x_location + 2][z_location + 2] - 1,
          z_location,
        ]}
        color={isMyTurn[0] === -1 ? "red" : "blue"}
        key={`node-${x}-${z}`}
        handlehover={handlehoverPieces}
        handlemoveout={handlemoveroverPieces}
        handleClick={handleClickPieces}
      />
    );
    setPieces((prev) => [...prev, element]);
  };
  const handlehoverPieces = (position) => {
    let x_location = mappingToLocation(position[0]);
    let z_location = mappingToLocation(position[2]);
    let clone = [...position];
    clone[1] = location[x_location + 2][z_location + 2] * 1.5 + 5;
    setChessPositionSuggest(clone);
    setHover(true);
  };
  const handlemoveroverPieces = () => {
    setHover(false);
  };
  const handleClickPieces = (x, z) => {
    let x_location = mappingToLocation(x);
    let z_location = mappingToLocation(z);
    let temp_location = location;
    temp_location[x_location + 2][z_location + 2] += 1;
    setlocation(temp_location);
    let temp_isMyturn = isMyTurn;
    temp_isMyturn[0] = -temp_isMyturn[0];
    setIsMyTurn(temp_isMyturn);
    const element = (
      <ChessPiece
        position={[
          x_location,
          location[x_location + 2][z_location + 2] - 1,
          z_location,
        ]}
        color={isMyTurn[0] === -1 ? "red" : "blue"}
        key={`node-${x}-${z}`}
        handlehover={handlehoverPieces}
        handlemoveout={handlemoveroverPieces}
        handleClick={handleClickPieces}
      />
    );
    setPieces((prev) => [...prev, element]);
  };

  const createTile = useCallback(
    (x, z) => (
      <group position={[x, 4, z]} key={`${x}-${z}`}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry
            args={[
              tileSize + borderWidth * 2,
              0.29,
              tileSize + borderWidth * 2,
            ]}
          />
          <meshStandardMaterial color={"#000000"} /> {/* Border color */}
        </mesh>
        <mesh
          position={[0, 0.01, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(x, z);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            handlehover(x, z);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            handlemoveout();
          }}
        >
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
        createTile(i * 3 - Math.floor(boardSize), j * 3 - Math.floor(boardSize))
      );
    }
  }

  return (
    <mesh camera={camera}>
      <pointLight
        position={[10, 15, 10]}
        intensity={1}
        decay={2}
        power={2000}
        distance={20}
      />
      <pointLight
        position={[-10, 15, 10]}
        intensity={1}
        decay={2}
        power={2000}
        distance={20}
      />
      <pointLight
        position={[0, 15, 0]}
        intensity={1}
        decay={2}
        power={2000}
        distance={20}
      />
      <pointLight
        position={[-10, 15, -10]}
        intensity={1}
        decay={2}
        power={2000}
        distance={20}
      />
      <pointLight
        position={[10, 15, -10]}
        intensity={1}
        decay={2}
        power={2000}
        distance={20}
      />
      <OrbitControls minDistance={24} maxDistance={38} />
      {tiles}
      {labels}
      {pieces}
      {hover && (
        <mesh position={chessPositionSuggest}>
          <cylinderGeometry args={[0.8 + 0.4, 0.8 + 0.4, 1.5 - 0.01, 5]} />
          <meshStandardMaterial
            color={"aqua"}
            transparent={true}
            opacity={0.7}
          />
          <lineSegments>
            <edgesGeometry
              attach="geometry"
              args={[
                new THREE.CylinderGeometry(0.8 + 0.4, 0.8 + 0.4, 1.5 - 0.01, 5),
              ]}
            />
            <lineBasicMaterial attach="material" color="black" />
          </lineSegments>
        </mesh>
      )}
    </mesh>
  );
};

export default Chessboard;

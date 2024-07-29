import React, { useState, useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, Text } from "@react-three/drei";
import ChessPiece from "./Chesspiece";

const Chessboard = () => {
  const mountRef = useRef(null);
  const boardSize = 5;
  const tileSize = 2.5;
  const borderWidth = 0.5;
  const [hover, setHover] = useState(false);
  const [chessPositionSuggest,setChessPositionSuggest] = useState();
  const [location, setlocation] = useState([]);
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
  const handlehover = useCallback((x, z) => {
    return () => {
      console.log(x,z)
      setChessPositionSuggest([x, 5, z]);
      setHover(true);
    };
  }, []);
  const handlemoverover = useCallback(() =>{
    return () => {
      setHover(false)
    }
  },[])
  const handlehoverPieces =(position)=>{
    setChessPositionSuggest(position);
    setHover(true);
  }
  const handlemoveroverPieces=()=>{
    setHover(false);
  }

  const createTile = useCallback(
    (x, z) => (
      <group position={[x, 4, z]} key={`${x}-${z}`} >
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
        <mesh position={[0, 0.01, 0]} onPointerOver={handlehover(x,z)} onPointerOut={handlemoverover()}>
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

  const pieces = [
    <ChessPiece position={[0, 0, 0]} color="red" key="red" handlehover={handlehoverPieces} handlemoverover={handlemoveroverPieces}/>,
    <ChessPiece position={[0, 1, 0]} color="blue" key="blue" handlehover={handlehoverPieces} handlemoverover={handlemoveroverPieces}/>,
    <ChessPiece position={[0, 2, 0]} color="blue" key="blue" handlehover={handlehoverPieces} handlemoverover={handlemoveroverPieces}/>,
    <ChessPiece position={[0, 3, 0]} color="blue" key="blue" handlehover={handlehoverPieces} handlemoverover={handlemoveroverPieces}/>,
    <ChessPiece position={[0, 4, 0]} color="blue" key="blue" handlehover={handlehoverPieces} handlemoverover={handlemoveroverPieces}/>,
    // <ChessPiece position={[1, 0, 0]} color="red" key="red" />,
    // <ChessPiece position={[1, 1, 0]} color="blue" key="blue" />,
    // <ChessPiece position={[1, 2, 0]} color="blue" key="blue" />,
  ];

  return (
    <mesh camera={camera} >
      <pointLight position={[5, 15, 5]} intensity={1} decay={2} power={1500} distance={20}/>
      <pointLight position={[-5, 15, 5]} intensity={1} decay={2} power={1500} distance={20}/>
      <pointLight position={[-5, 15, -5]} intensity={1} decay={2} power={1500} distance={20} />
      <pointLight position={[5, 15, -5]} intensity={1} decay={2} power={1500} distance={20}/>
      <OrbitControls
        minDistance={24}
        maxDistance={38}
      />
      {tiles}
      {labels}
      {pieces}
      {hover && (
        <mesh position={chessPositionSuggest}>
          <cylinderGeometry
            args={[0.8 + 0.4,  0.8 + 0.4, 1.5 - 0.01, 5]}
          />
          <meshStandardMaterial color={"aqua"} transparent={true} opacity={0.7}/>
          <lineSegments>
          <edgesGeometry
            attach="geometry"
            args={[
              new THREE.CylinderGeometry(
                0.8 + 0.4,
                0.8 + 0.4,
                1.5 - 0.01,
                5
              ),
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

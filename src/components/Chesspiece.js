import { useFrame } from "@react-three/fiber";
import React, {useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ChessPiece = ({ position, color,handlehover,handlemoverover }) => {
  const radiusTop = 0.8;
  const radiusBottom = 0.8;
  const height = 1.5;
  const radialSegments = 64;
  const [newPosition, setNewPosition] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const meshRef1 = useRef();
  const meshRef2 = useRef();

  const [yPosition, setYPosition] = useState(position[1] * 1.5 + 10);

  useFrame(() => {
    if (isAnimating) {
      // Update yPosition
      setYPosition((prev) => {
        const newPosition = prev - 0.05;

        if (newPosition < position[1] * 1.5 + 5) {
          setIsAnimating(false);
          return prev;
        }
        return newPosition;
      });

      // Apply translation
      if (meshRef1.current && meshRef2.current) {
        meshRef1.current.position.y = yPosition;
        meshRef2.current.position.y = yPosition;
      }
    }
  });

  useEffect(() => {
    const getNewPosition = () => {
      let arr = [];
      for (let e = 0; e < position.length; e++) {
        if (e === 1) {
          setNewPosition(arr.push(position[e] * 1.5 + 5));
        } else {
          setNewPosition(arr.push((position[e] + 1) * 3 - Math.floor(2.5)));
        }
      }
      setNewPosition(arr);
    };
    getNewPosition();
  }, [position]);

  return (
    <>
      <mesh ref={meshRef1} position={newPosition}>
        <cylinderGeometry
          args={[radiusTop, radiusBottom, height, radialSegments]}
        />
        <meshStandardMaterial color={"black"} />
      </mesh>
      <mesh
        ref={meshRef2}
        position={newPosition}
        onPointerOver={(e)=>{
          e.stopPropagation();
          let suggest = newPosition;
          suggest[1] += 1.5;
          handlehover(suggest)
        }}
        onPointerLeave={(e)=>{
          e.stopPropagation()
          handlemoverover();
        }}
      >
        <cylinderGeometry
          args={[radiusTop + 0.45, radiusBottom + 0.45, height - 0.01, 5]}
        />
        <meshStandardMaterial color={color === "red" ? "#f78ca0" : "#6fbcf3"} />
        <lineSegments>
          <edgesGeometry
            attach="geometry"
            args={[
              new THREE.CylinderGeometry(
                radiusTop + 0.45,
                radiusBottom + 0.45,
                height - 0.01,
                5
              ),
            ]}
          />
          <lineBasicMaterial attach="material" color="black" />
        </lineSegments>
      </mesh>
    </>
  );
};

export default ChessPiece;

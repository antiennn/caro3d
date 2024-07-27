import React, { useEffect, useState } from "react";
import * as THREE from "three";

const ChessPiece = ({ position, color }) => {
  const radiusTop = 1;
  const radiusBottom = 1;
  const height = 1.5;
  const radialSegments = 64;
  const [newPosition,setNewPosition] = useState([]);

  useEffect(()=>{
    const getNewPosition = ()=>{
      let arr = []
      for (let e = 0; e < position.length;e++){
        if(e === 1){
          setNewPosition(arr.push(position[e]*1.5 +5))
        }else{
          setNewPosition(arr.push((position[e]+1)*3- Math.floor(2.5)))
        }
      }
      setNewPosition(arr)
    }
    getNewPosition();
  },[position]);
  return (
    <>
      <mesh position={newPosition}>
        <cylinderGeometry
          args={[radiusTop, radiusBottom, height, radialSegments]}
        />
        <meshStandardMaterial color={"black"} />
      </mesh>
      <mesh position={newPosition}>
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

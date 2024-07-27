import React from "react";
import * as THREE from "three";

const ChessPiece = ({ position, color }) => {
  const radiusTop = 0.3;
  const radiusBottom = 0.3;
  const height = 0.5;
  const radialSegments = 64;

  return (
    <>
      <mesh position={position}>
        <cylinderGeometry
          args={[radiusTop, radiusBottom, height, radialSegments]}
        />
        <meshStandardMaterial color={"black"} />
      </mesh>
      <mesh position={position}>
        <cylinderGeometry
          args={[radiusTop + 0.15, radiusBottom + 0.15, height - 0.01, 5]}
        />
        <meshStandardMaterial color={color === "red" ? "#f78ca0" : "#6fbcf3"} />
        <lineSegments>
          <edgesGeometry
            attach="geometry"
            args={[
              new THREE.CylinderGeometry(
                radiusTop + 0.15,
                radiusBottom + 0.15,
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

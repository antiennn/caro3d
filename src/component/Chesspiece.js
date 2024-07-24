import React from 'react';

const ChessPiece = ({ position, color }) => (
  <mesh position={position}>
    <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default ChessPiece;
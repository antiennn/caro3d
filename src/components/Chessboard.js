import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import * as THREE from "three";
import { OrbitControls, Text } from "@react-three/drei";
import ChessPiece from "./Chesspiece";
import {
  getCurrentTime,
  initArray,
  initLocation,
  mappingToLocation,
  mapToLocationInLayout,
  mapValueToLocation,
} from "../utils/constants";
import { lightFixture } from "../utils/specifications";
import { MyHistoryContext, MyStateContext } from "../configs/MyContext";

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
  const [bestMove, setBestMove] = useState(null);
  const [history, dispatchHistory] = useContext(MyHistoryContext);

  const labels = [];
  const letters = "EDCBA";
  const numbers = "54321";

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
  useEffect(() => {
    if (isMyTurn[0] === -1) {
      const worker = new Worker(
        new URL("../workers/findmove.js", import.meta.url)
      );
      worker.postMessage({
        board:board,
        depth:0,
        isMaximizingPlayer:true
      }); // Gửi dữ liệu tới Web Worker

      worker.onmessage = function (e) {
        setBestMove(e.data); // Nhận kết quả từ Web Worker
      };

      return () => {
        worker.terminate(); // Hủy Worker khi component unmount
      };
    }
  }, [isMyTurn[0]]);
  useEffect(() => {
    if (bestMove !== null) {
      botGo(mapValueToLocation(bestMove.x), mapValueToLocation(bestMove.z));
    }
  }, [bestMove]);
  const handlehover = (x, z) => {
    setChessPositionSuggest([x, 5, z]);
    setHover(true);
  };
  const handlemoveout = () => {
    setHover(false);
  };

  const botGo = (x, z) => {
    let x_location = mappingToLocation(x);
    let z_location = mappingToLocation(z);
    let temp_location = location;
    temp_location[x_location + 2][z_location + 2] += 1;
    setlocation(temp_location);

    dispatchHistory({
      type: "add_infomation",
      payload: {
        date: getCurrentTime(),
        content: `${
          isMyTurn[0] === 1 ? "You" : "Opponent"
        } moved to position ${mapToLocationInLayout(x, z)}`,
      },
    });

    let temp_board = board;
    board[x_location + 2][location[x_location + 2][z_location + 2] - 1][
      z_location + 2
    ] = isMyTurn[0];
    setBoard(temp_board);
    const element = (
      <ChessPiece
        position={[
          x_location,
          location[x_location + 2][z_location + 2] - 1,
          z_location,
        ]}
        color={isMyTurn[0]}
        key={`node-${x}-${z}`}
        handlehover={handlehoverPieces}
        handlemoveout={handlemoveroverPieces}
        handleClick={handleClickPieces}
        board={board}
      />
    );
    setPieces((prev) => [...prev, element]);

    let temp_isMyturn = isMyTurn;
    temp_isMyturn[0] = -temp_isMyturn[0];
    setIsMyTurn(temp_isMyturn);
  };

  const handleClick = (x, z) => {
    if (isMyTurn[0] !== 1) {
      return;
    }
    let x_location = mappingToLocation(x);
    let z_location = mappingToLocation(z);
    let temp_location = location;
    temp_location[x_location + 2][z_location + 2] += 1;
    setlocation(temp_location);

    dispatchHistory({
      type: "add_infomation",
      payload: {
        date: getCurrentTime(),
        content: `${
          isMyTurn[0] === 1 ? "You" : "Opponent"
        } moved to position ${mapToLocationInLayout(x, z)}`,
      },
    });

    let temp_board = board;
    board[x_location + 2][location[x_location + 2][z_location + 2] - 1][
      z_location + 2
    ] = isMyTurn[0];
    setBoard(temp_board);
    const element = (
      <ChessPiece
        position={[
          x_location,
          location[x_location + 2][z_location + 2] - 1,
          z_location,
        ]}
        color={isMyTurn[0]}
        key={`node-${x_location}-${location[x_location + 2][z_location + 2] - 1}-${z_location}`}
        handlehover={handlehoverPieces}
        handlemoveout={handlemoveroverPieces}
        handleClick={handleClickPieces}
        board={board}
      />
    );
    setPieces((prev) => [...prev, element]);

    let temp_isMyturn = isMyTurn;
    temp_isMyturn[0] = -temp_isMyturn[0];
    setIsMyTurn(temp_isMyturn);
  };
  const handlehoverPieces = (position) => {
    let x_location = mappingToLocation(position[0]);
    let z_location = mappingToLocation(position[2]);
    if (location[x_location + 2][z_location + 2] === 5) {
      return;
    }
    let clone = [...position];
    clone[1] = location[x_location + 2][z_location + 2] * 1.5 + 5;
    setChessPositionSuggest(clone);
    setHover(true);
  };
  const handlemoveroverPieces = () => {
    setHover(false);
  };
  const handleClickPieces = (x, z) => {
    if (isMyTurn[0] !== 1) {
      return;
    }
    let x_location = mappingToLocation(x);
    let z_location = mappingToLocation(z);
    if (location[x_location + 2][z_location + 2] === 5) {
      return;
    }

    let temp_location = location;
    temp_location[x_location + 2][z_location + 2] += 1;
    setlocation(temp_location);

    dispatchHistory({
      type: "add_infomation",
      payload: {
        date: getCurrentTime(),
        content: `${
          isMyTurn[0] === 1 ? "You" : "Opponent"
        } moved to position ${mapToLocationInLayout(x, z)}`,
      },
    });

    let temp_board = board;
    board[x_location + 2][location[x_location + 2][z_location + 2] - 1][
      z_location + 2
    ] = isMyTurn[0];
    setBoard(temp_board);

    const element = (
      <ChessPiece
        position={[
          x_location,
          location[x_location + 2][z_location + 2] - 1,
          z_location,
        ]}
        color={isMyTurn[0]}
        key={`node-${x}-${z}`}
        handlehover={handlehoverPieces}
        handlemoveout={handlemoveroverPieces}
        handleClick={handleClickPieces}
        board={board}
      />
    );
    setPieces((prev) => [...prev, element]);

    let temp_isMyturn = isMyTurn;
    temp_isMyturn[0] = -temp_isMyturn[0];
    setIsMyTurn(temp_isMyturn);
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
      {lightFixture.map((e) => {
        return (
          <pointLight
            position={e}
            intensity={1}
            decay={2}
            power={2000}
            distance={25}
          />
        );
      })}

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

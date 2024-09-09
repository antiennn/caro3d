import { randInt } from "three/src/math/MathUtils.js";
import { checkAll, evalute } from "./constants";

function findLowestY(board, x, z) {
  for (let y = 0; y < 5; y++) {
    if (board[x][y][z] === 0) {
      return y;
    }
  }
  return -1;
}
export function findLimitdepth(array) {
  var count = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (array[i][j][k] !== 0) {
          count++;
        }
      }
    }
  }
  return count > 10 ? 6 : 5;
}
function findbesttempmove(board, bestMoves) {
  let count = 0;
  for (let y = 0; y < 4; y++) {
    do {
      count++;
      var x = randInt(1, 3);
      var z = randInt(1, 3);
      if (count >= 10) {
        break;
      }
      if (count >= 20) {
        return { x: randInt(0, 4), z: randInt(0, 4) };
      }
    } while (
      board[x][y][z] !== 0 ||
      (x + z) % 2 !== 0 ||
      y !== findLowestY(board, x, z)
    );
    if (count < 20) {
      return { x, z };
    }
  }
}

let MAX = 1000;
let MIN = -1000;

export function minimax(board, depth, isMaximizingPlayer, alpha, beta,limitdepth) {
  if (checkAll(board) || depth >= limitdepth) {
    var score = evalute(board);
    return {
      x: -1,
      z: -1,
      bestScore: isMaximizingPlayer
        ? score + depth / 1000
        : score - depth / 1000,
    };
  }
  let bestMoves = [];

  if (isMaximizingPlayer) {
    let obj = {
      x: -1,
      z: -1,
      bestScore: MIN,
    };
    let order = [1, 2, 3, 0, 4];
    for (let temp_x = 0; temp_x < 5; temp_x++) {
      for (let temp_z = 0; temp_z < 5; temp_z++) {
        let x = order[temp_x];
        let z = order[temp_z];

        let y = findLowestY(board, x, z);
        if (y !== -1) {
          board[x][y][z] = -1; // Maximizing player
          let newobj = minimax(board, depth + 1, false, alpha, beta,limitdepth);
          
          board[x][y][z] = 0;
          if (obj.bestScore < newobj.bestScore) {
            bestMoves = [{ x, z }];
            obj.bestScore = newobj.bestScore;
            obj.z = z;
            obj.x = x;
          } else if (newobj.bestScore === obj.bestScore) {
            bestMoves = [...bestMoves, { x, z }];
          }
          alpha = Math.max(alpha, obj.bestScore);
          if (beta <= alpha) break;
        }
      }
    }
    if (depth === 0 && bestMoves.length === 25) {
      let res = findbesttempmove(board, bestMoves);
      obj.x = res.x;
      obj.z = res.z;
    }
    return obj;
  } else {
    let obj = {
      x: -1,
      z: -1,
      bestScore: MAX,
    };
    for (let x = 0; x < 5; x++) {
      for (let z = 0; z < 5; z++) {
        let y = findLowestY(board, x, z);
        if (y !== -1) {
          board[x][y][z] = 1; // Minimizing player
          let newobj = minimax(board, depth + 1, true, alpha, beta,limitdepth);
          board[x][y][z] = 0;
          if (obj.bestScore > newobj.bestScore) {
            obj.bestScore = newobj.bestScore;
            obj.x = x;
            obj.z = z;
          }
          beta = Math.min(beta, obj.bestScore);
          if (beta <= alpha) break;
        }
      }
    }
    return obj;
  }
}

export function findBestMove(board, depth, isMaximizingPlayer) {
  var res = minimax(board, depth, isMaximizingPlayer, -1000, 1000);
  console.log(res);

  return res;
}
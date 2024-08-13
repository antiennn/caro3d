export const initArray = () => {
  let array = new Array(5);

  for (let i = 0; i < 5; i++) {
    array[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      array[i][j] = new Array(5);
      for (let k = 0; k < 5; k++) {
        array[i][j][k] = 0;
      }
    }
  }
  return array;
};
export const initLocation = () => {
  let array = new Array(5);

  for (let i = 0; i < 5; i++) {
    array[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
      array[i][j] = 0;
    }
  }
  return array;
};
export const mappingToLocation = (idx) => {
  return (idx + 5) / 3 - 2;
};

export const checkWinner = (board, player) => {
  const size = 5; // Kích thước ma trận
  const winCondition = 4; // Số cục liên tục cần để thắng

  // Kiểm tra hàng dọc theo trục x
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      let count = 0;
      for (let x = 0; x < size; x++) {
        if (board[x][y][z] === player) count++;
        else count = 0;
        if (count === winCondition) return true;
      }
    }
  }

  // Kiểm tra hàng dọc theo trục y
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      let count = 0;
      for (let y = 0; y < size; y++) {
        if (board[x][y][z] === player) count++;
        else count = 0;
        if (count === winCondition) return true;
      }
    }
  }

  // Kiểm tra hàng dọc theo trục z
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let count = 0;
      for (let z = 0; z < size; z++) {
        if (board[x][y][z] === player) count++;
        else count = 0;
        if (count === winCondition) return true;
      }
    }
  }

  // Kiểm tra đường chéo trong mặt phẳng xy
  for (let z = 0; z < size; z++) {
    let count1 = 0, count2 = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][i][z] === player) count1++;
      else count1 = 0;
      if (board[i][size-i-1][z] === player) count2++;
      else count2 = 0;
      if (count1 === winCondition || count2 === winCondition) return true;
    }
  }

  // Kiểm tra đường chéo trong mặt phẳng xz
  for (let y = 0; y < size; y++) {
    let count1 = 0, count2 = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][y][i] === player) count1++;
      else count1 = 0;
      if (board[i][y][size-i-1] === player) count2++;
      else count2 = 0;
      if (count1 === winCondition || count2 === winCondition) return true;
    }
  }

  // Kiểm tra đường chéo trong mặt phẳng yz
  for (let x = 0; x < size; x++) {
    let count1 = 0, count2 = 0;
    for (let i = 0; i < size; i++) {
      if (board[x][i][i] === player) count1++;
      else count1 = 0;
      if (board[x][i][size-i-1] === player) count2++;
      else count2 = 0;
      if (count1 === winCondition || count2 === winCondition) return true;
    }
  }

  // Kiểm tra các đường chéo không gian
  const spaceDiagonals = [
    { dx: 1, dy: 1, dz: 1 },
    { dx: 1, dy: 1, dz: -1 },
    { dx: 1, dy: -1, dz: 1 },
    { dx: 1, dy: -1, dz: -1 },
    { dx: -1, dy: 1, dz: 1 },
    { dx: -1, dy: 1, dz: -1 },
    { dx: -1, dy: -1, dz: 1 },
    { dx: -1, dy: -1, dz: -1 },
  ];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        for (const { dx, dy, dz } of spaceDiagonals) {
          let count = 0;

          for (let i = 0; i < size; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            const nz = z + i * dz;

            if (nx >= 0 && nx < size && ny >= 0 && ny < size && nz >= 0 && nz < size) {
              if (board[nx][ny][nz] === player) {
                count++;
                if (count === winCondition) return true;
              } else {
                break; // Ngừng khi gặp cục khác loại
              }
            } else {
              break; // Ngừng khi vượt ra ngoài kích thước ma trận
            }
          }
        }
      }
    }
  }

  return false;
}; 
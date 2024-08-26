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
export function deepCopyArray3D(array) {
  let newArray = new Array(array.length);

  for (let i = 0; i < array.length; i++) {
    newArray[i] = new Array(array[i].length);
    for (let j = 0; j < array[i].length; j++) {
      newArray[i][j] = new Array(array[i][j].length);
      for (let k = 0; k < array[i][j].length; k++) {
        newArray[i][j][k] = array[i][j][k];
      }
    }
  }

  return newArray;
}
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
    let count1 = 0,
      count2 = 0,
      count3 = 0,
      count4 = 0,
      count5 = 0,
      count6 = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][i][z] === player) count1++;
      else count1 = 0;
      if (board[i][size - i - 1][z] === player) count2++;
      else count2 = 0;
      if (i > 0 && board[i][i - 1][z] === player) count3++;
      else count3 = 0;
      if (i < 4 && board[i][i + 1][z] === player) count4++;
      else count4 = 0;
      if (i > 0 && board[i][size - i][z] === player) count5++;
      else count5 = 0;
      if (i < 4 && board[i][size - i - 2][z] === player) count6++;
      else count6 = 0;
      if (
        count1 === winCondition ||
        count2 === winCondition ||
        count3 === winCondition ||
        count4 === winCondition ||
        count5 === winCondition ||
        count6 === winCondition
      )
        return true;
    }
  }

  // Kiểm tra đường chéo trong mặt phẳng xz
  for (let y = 0; y < size; y++) {
    let count1 = 0,
      count2 = 0,
      count3 = 0,
      count4 = 0,
      count5 = 0,
      count6 = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][y][i] === player) count1++;
      else count1 = 0;
      if (board[i][y][size - i - 1] === player) count2++;
      else count2 = 0;
      if (board[i][y][i - 1] === player && i > 0) count3++;
      else count3 = 0;
      if (board[i][y][i + 1] === player && i < 4) count4++;
      else count4 = 0;
      if (board[i][y][size - i] === player && i > 0) count5++;
      else count5 = 0;
      if (board[i][y][size - i - 2] === player && i < 4) count6++;
      else count6 = 0;
      if (
        count1 === winCondition ||
        count2 === winCondition ||
        count3 === winCondition ||
        count4 === winCondition ||
        count5 === winCondition ||
        count6 === winCondition
      )
        return true;
    }
  }

  // Kiểm tra đường chéo trong mặt phẳng yz
  for (let x = 0; x < size; x++) {
    let count1 = 0,
      count2 = 0,
      count3 = 0,
      count4 = 0,
      count5 = 0,
      count6 = 0;
    for (let i = 0; i < size; i++) {
      if (board[x][i][i] === player) count1++;
      else count1 = 0;
      if (board[x][i][i - 1] === player && i > 0) count3++;
      else count3 = 0;
      if (board[x][i][i + 1] === player && i < 4) count4++;
      else count4 = 0;
      if (board[x][i][size - i - 1] === player) count2++;
      else count2 = 0;
      if (board[x][i][size - i] === player && i > 0) count5++;
      else count5 = 0;
      if (board[x][i][size - i - 2] === player && i < 4) count6++;
      else count6 = 0;
      if (
        count1 === winCondition ||
        count2 === winCondition ||
        count3 === winCondition ||
        count4 === winCondition ||
        count5 === winCondition ||
        count6 === winCondition
      )
        return true;
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

            if (
              nx >= 0 &&
              nx < size &&
              ny >= 0 &&
              ny < size &&
              nz >= 0 &&
              nz < size
            ) {
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

function mapXtoLetter(x) {
  const index = Math.round(((x + 5) / 12) * 4);
  const letter = String.fromCharCode(65 + index);
  return letter;
}

function mapYtoNumber(y) {
  const number = Math.round(((y + 5) / 12) * 4) + 1;
  return number;
}

export const mapToLocationInLayout = (x, z) => {
  return `${mapXtoLetter(x - 1)}${mapYtoNumber(z - 1)}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formattedTime;
};

export const mapValueToLocation = (x) => {
  const mappedValue = 3 * x - 5;
  return mappedValue;
};
export function evalute(state) {
  var score = 0;

  if (checkWinner(state, -1)) {
    score = 1;
  } else if (checkWinner(state, 1)) {
    score = -1;
  } else {
    score = 0;
  }

  return score;
}
export function checkAll(state) {
  return checkWinner(state, -1) || checkWinner(state, 1);
}

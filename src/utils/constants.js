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


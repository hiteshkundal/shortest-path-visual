const getGridWithNewTarget = (args) => {
  const {
    grid, row, col, startMoving, finishMoving,
  } = args;
  // reset previous move node to false
  const previousGrid = grid.map((previousRow) => {
    return previousRow.map((previousCol) => {
      return {
        ...previousCol,
        isStart: startMoving ? false : previousCol.isStart,
        isFinish: finishMoving ? false : previousCol.isFinish,
      };
    });
  });
  const node = previousGrid[row][col];
  // reset current node to true
  const newNode = {
    ...node,
    isStart: startMoving ? true : node.isStart,
    isFinish: finishMoving ? true : node.isFinish,
  };
  previousGrid[row][col] = newNode;
  return {
    previousGrid,
    newNode,
  };
};

export default getGridWithNewTarget;

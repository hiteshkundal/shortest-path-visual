const canWall = (node) => {
  if (node.isStart || node.isFinish) {
    return false;
  }
  return true;
};


const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: canWall(node) ? !node.isWall : node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default getNewGridWithWall;

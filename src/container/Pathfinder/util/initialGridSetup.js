import { numberOfRows, numberOfColums, initialState } from './initialState';

const {
  startingRow, startingCol, finishingRow, finishingCol,
} = initialState();

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === startingRow && col === startingCol,
    isFinish: row === finishingRow && col === finishingCol,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    isWall: false,
  };
};

const initializeGrid = () => {
  const grid = [];

  for (let row = 0; row < numberOfRows; row += 1) {
    const currentRow = [];
    for (let col = 0; col < numberOfColums; col += 1) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return {
    initialGrid: grid,
    initialStartNode: grid[startingRow][startingCol],
    initialFinishNode: grid[finishingRow][finishingCol],
  };
};

export default initializeGrid;

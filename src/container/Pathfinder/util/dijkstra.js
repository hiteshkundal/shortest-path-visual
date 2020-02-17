/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const getAllnodes = (grid) => {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};

const sortNodesByDistance = (nodes) => {
  nodes.sort((a, b) => a.distance - b.distance);
};

const getAllUnvisitedNeighbor = (closetNode, grid) => {
  const nodes = [];
  const { row, col } = closetNode;
  if (row > 0) {
    nodes.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    nodes.push(grid[row + 1][col]);
  }
  if (col > 0) {
    nodes.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    nodes.push(grid[row][col + 1]);
  }

  return nodes.filter((node) => !node.isVisited);
};

const updateUnvisitedNeighbor = (closetNode, grid) => {
  const allUnvisitedNeighbor = getAllUnvisitedNeighbor(closetNode, grid);
  for (const neighbor of allUnvisitedNeighbor) {
    neighbor.distance = closetNode.distance + 1;
    neighbor.previousNode = closetNode;
  }
};

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const allUnvisitedNodes = getAllnodes(grid);
  while (allUnvisitedNodes.length) {
    sortNodesByDistance(allUnvisitedNodes);
    const closetNode = allUnvisitedNodes.shift();

    if (closetNode.isWall) continue;
    if (closetNode.distance === Infinity) {
      return visitedNodesInOrder;
    }
    closetNode.isVisited = true;

    visitedNodesInOrder.push(closetNode);

    if (closetNode.row === finishNode.row && closetNode.col === finishNode.col) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbor(closetNode, grid);
  }
  return visitedNodesInOrder;
}


export function getNodesInShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

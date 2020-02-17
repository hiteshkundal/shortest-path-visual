const animateShortestPath = (nodesInShortestPathOrder) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
      const node = nodesInShortestPathOrder[i];
      if (node.isStart || node.isFinish) {
        if (node.isFinish) {
          resolve();
        }
        continue;
      }
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 40 * i);
    }
  });
};

const animateVisitingNodes = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < visitedNodesInOrder.length; i += 1) {
      const node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder).then(() => {
            resolve();
          });
        }, 10.5 * i);
        return;
      }
      if (node.isStart || node.isFinish) {
        continue;
      }
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  });
};


const animationReset = (visitingNodes) => {
  for (let i = 0; i < visitingNodes.length; i += 1) {
    const node = visitingNodes[i];
    if (i === visitingNodes.length - 1 || i === 0) {
      continue;
    }
    // reset the animation class
    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-reset';
  }
};

export { animateVisitingNodes, animationReset };

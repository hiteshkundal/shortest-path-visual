import React, { useState, useEffect } from 'react';
import Node from '../../component/Node/Node';
import Header from '../../component/Header/Header';
import {
  initializeGrid,
  getNewGridWithWall,
  dijkstra,
  getNodesInShortestPath,
  animateVisitingNodes,
  getGridWithNewTarget,
  animationReset,
} from './util';

import style from './Pathfinder.module.scss';


const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({});
  const [finishNode, setFinishNode] = useState({});
  const [mousePressed, setMousePressed] = useState(false);
  const [startMoving, setStartMoving] = useState(false);
  const [finishMoving, setFinishMoving] = useState(false);
  const [visitingNodes, setVisitingNodes] = useState([]);
  const [disableAnimationButton, setDisableAnimationButton] = useState(false);
  const [isClearingGrid, setIsClearingGrid] = useState(false);
  const [disableClearGridBtn, setDisableClearGridBtn] = useState(true);

  useEffect(() => {
    const { initialGrid, initialStartNode, initialFinishNode } = initializeGrid();
    setGrid(initialGrid);
    setStartNode(initialStartNode);
    setFinishNode(initialFinishNode);
  }, [isClearingGrid]);


  const handleMouseDown = (row, col) => {
    if (disableAnimationButton) {
      return;
    }
    const node = grid[row][col];
    if (node.isStart) {
      setStartMoving(true);
    } else if (node.isFinish) {
      setFinishMoving(true);
    }
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
    setMousePressed(true);
    setDisableClearGridBtn(false);
  };

  const handleMouseEnter = (row, col) => {
    if (disableAnimationButton) {
      return;
    }
    if (!mousePressed) return;
    const argsForNewTarget = {
      grid, row, col, startMoving, finishMoving,
    };
    const { previousGrid, newNode } = getGridWithNewTarget(argsForNewTarget);
    if (startMoving) {
      setStartNode(newNode);
      setGrid(previousGrid);
    } else if (finishMoving) {
      setFinishNode(newNode);
      setGrid(previousGrid);
    } else {
      const newGrid = getNewGridWithWall(grid, row, col);
      setGrid(newGrid);
    }
    setDisableClearGridBtn(false);
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    setStartMoving(false);
    setFinishMoving(false);
    setDisableClearGridBtn(false);
  };

  const startAnimation = () => {
    setDisableAnimationButton(true);
    setDisableClearGridBtn(true);
    const algoStart = grid[startNode.row][startNode.col];
    const algoFinish = grid[finishNode.row][finishNode.col];
    const visitedNodes = dijkstra(grid, algoStart, algoFinish);
    const nodesInShortestPath = getNodesInShortestPath(algoFinish);
    setVisitingNodes(visitedNodes);
    animateVisitingNodes(visitedNodes, nodesInShortestPath).then(() => {
      setDisableClearGridBtn(false);
    });
  };

  const clearGridHandle = () => {
    setDisableAnimationButton(false);
    setIsClearingGrid((prev) => !prev);
    animationReset(visitingNodes);
    setDisableClearGridBtn(true);
  };

  return (
    <div className={style.Pathfinder}>
      <Header
        startAnimation={startAnimation}
        clearGridHandle={clearGridHandle}
        disableAnimationButton={disableAnimationButton}
        disableClearGridBtn={disableClearGridBtn}
      />
      <div className={style.Grid}>
        <h3>Click and drag to create wall between path, move start or finish point.</h3>
        {grid.map((row, rowIndex) => {
          return (
            <div key={`row${rowIndex.toString()}`}>
              {row.map((col, colIndex) => {
                return (
                  <Node
                    key={`col${colIndex.toString()}`}
                    row={col.row}
                    col={col.col}
                    isStart={col.isStart}
                    isFinish={col.isFinish}
                    onMouseDown={() => handleMouseDown(col.row, col.col)}
                    onMouseEnter={() => handleMouseEnter(col.row, col.col)}
                    isWall={col.isWall}
                    mousePressed={mousePressed}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pathfinder;

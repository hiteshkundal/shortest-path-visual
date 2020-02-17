/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';


import './Node.css';

const Node = (props) => {
  const {
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
  } = props;
  const extractClassname = isFinish
    ? 'node-finish'
    : isStart
      ? 'node-start'
      : isWall
        ? 'node-wall'
        : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extractClassname}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />


  );
};

export default Node;

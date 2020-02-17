import React from 'react';

import style from './Header.module.scss';

const Header = (props) => {
  const {
    startAnimation, clearGridHandle, disableAnimationButton, disableClearGridBtn,
  } = props;
  return (
    <header className={style.Header}>
      <h2>Dijkstra&apos;s Animation</h2>
      <div>
        <button
          type="button"
          onClick={startAnimation}
          disabled={disableAnimationButton}
        >
          Find The Shortest Path
        </button>
        <button
          type="button"
          onClick={clearGridHandle}
          disabled={disableClearGridBtn}
        >
          Clear The Grid
        </button>
      </div>

    </header>

  );
};

export default Header;

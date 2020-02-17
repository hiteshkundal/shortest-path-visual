import React from 'react';
import Pathfinder from '../Pathfinder/Pathfinder';

import style from './App.module.scss';

const App = () => {
  window.addEventListener('resize', () => {
    window.location.reload();
  });
  return (
    <div className={style.App}>
      <Pathfinder />
    </div>
  );
};

export default App;

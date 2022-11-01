import React from 'react';

import MoviesPageMain from './MoviesPageMain/MoviesPageMain';
import Navbar from '../Header/Navbar';

// routing for movies page
// do we need className="MoviesPage"?
function MoviesPageRouter() {
  return (
    <div className="MoviesPage">
      <Navbar />
      <MoviesPageMain />
    </div>
  );
}

export default MoviesPageRouter;

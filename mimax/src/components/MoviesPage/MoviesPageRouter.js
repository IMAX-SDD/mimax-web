import React from 'react';

import MoviesPageMain from './MoviesPageMain';
import Navbar from '../Header/Navbar';

// routing for movies page
// do we need className="MoviesPage"?
function MoviesPageRouter() {
  return ( // usage of navbar component
    <div className="MoviesPage">
      <Navbar />
      <MoviesPageMain />
    </div>
  );
}

export default MoviesPageRouter;

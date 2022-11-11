import React from 'react';

import TVShowsPageMain from './TVShowsPageMain';
import Navbar from '../Header/Navbar';

// routing for tv shows page
function TVShowsPageRouter() {
  return (
    <div>
      <Navbar />
      <TVShowsPageMain />
    </div>
  );
}

export default TVShowsPageRouter;

import React from 'react';

import Navbar from '../Header/Navbar';
import ActorsPageMain from './ActorsPageMain';

// routing for actors page page
function ActorsPageRouter() { // usage of navbar instance
  return (
    <div>
      <Navbar />
      <ActorsPageMain />
    </div>
  );
}

export default ActorsPageRouter;

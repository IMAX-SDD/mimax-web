import React from 'react';

import Navbar from '../Header/Navbar';
import ActorsPageMain from './ActorsPageMain/ActorsPageMain';

// routing for actors page page
function ActorsPageRouter() {
  return (
    <div>
      <Navbar />
      <ActorsPageMain />
    </div>
  );
}

export default ActorsPageRouter;

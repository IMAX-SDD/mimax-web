import React from 'react';

import Navbar from '../Header/Navbar';
import DirectorsPageMain from './DirectorsPageMain/DirectorsPageMain';

// routing for directors page
function DirectorsPageRouter() {
  return (
    <div>
      <Navbar />
      <DirectorsPageMain />
    </div>
  );
}

export default DirectorsPageRouter;

import React from 'react';

import Navbar from '../Header/Navbar';
import DirectorsPageMain from './DirectorsPageMain';

// routing for directors page
// not including <DirectorsListMain /> since it does not work
function DirectorsPageRouter() {
  return (
    <div>
      <Navbar />
      <DirectorsPageMain />
    </div>
  );
}

export default DirectorsPageRouter;

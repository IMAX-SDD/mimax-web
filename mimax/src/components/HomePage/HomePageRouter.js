import React from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import ActorsPageMain from '../ActorsPage/ActorsPageMain';
import DirectorsPageMain from '../DirectorsPage/DirectorsPageMain';
import HomePageMain from './HomePageMain';
import MoviesPageMain from '../MoviesPage/MoviesPageMain';
import Navbar from '../Header/Navbar';
import TVShowsPageMain from '../TVShowsPage/TVShowsPageMain';
import MoviesListMain from '../MoviesList/MoviesListMain';

// routing for home page
// do we need className="Homepage", looks like we don't?
function HomePageRouter() {
  return (
    <div className="Homepage">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePageMain />} />
          <Route path="/actors" element={<ActorsPageMain />} />
          <Route path="/directors" element={<DirectorsPageMain />} />
          <Route path="/movieslist" element={<MoviesListMain />} />
          <Route path="/movies" element={<MoviesPageMain />} />
          <Route path="/tvshows" element={<TVShowsPageMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default HomePageRouter;

import React from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import DirectorsPageMain from '../DirectorsPage/DirectorsPageMain';
import HomePageMain from './HomePageMain';
import MoviesPageMain from '../MoviesPage/MoviesPageMain';
import Navbar from '../Header/Navbar';
import MoviesListMain from '../MoviesList/MoviesListMain';
import MoviesListReverse from '../MoviesListReverse/MoviesListReverseMain';
import TVListMain from '../TVList/TVListMain';
import TVShowsPageMain from '../TVShowsPage/TVShowsPageMain';
import ActorsListMain from '../ActorsPage/ActorsListMain';

// routing for home page
// do we need className="Homepage", looks like we don't?
function HomePageRouter() {
  return (
    <div className="Homepage">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePageMain />} />
          <Route path="/actors" element={<ActorsListMain />} />
          <Route path="/directors" element={<DirectorsPageMain />} />
          <Route path="/movieslist" element={<MoviesListMain />} />
          <Route path="/movies" element={<MoviesPageMain />} />
          <Route path="/tvlist" element={<TVListMain />} />
          <Route path="/tvshows" element={<TVShowsPageMain />} />
          <Route path="/movieslistreverse" element={<MoviesListReverse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default HomePageRouter;

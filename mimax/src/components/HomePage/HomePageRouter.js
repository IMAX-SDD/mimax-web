import React from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
// import DirectorsPageMain from '../DirectorsPage/DirectorsPageMain';
import HomePageMain from './HomePageMain';
import MoviesPageMain from '../MoviesPage/MoviesPageMain';
import Navbar from '../Header/Navbar';
import MoviesListMain from '../MoviesList/MoviesListMain';
import TVListMain from '../TVList/TVListMain';
import TVShowsPageMain from '../TVShowsPage/TVShowsPageMain';
import ActorsListMain from '../ActorsPage/ActorsListMain';
import AboutUsMain from '../AboutUsPage/AboutUsMain';
import ActorsPageMain from '../ActorsPage/ActorsPageMain';

// routing for home page
// do we need className="Homepage", looks like we don't?
function HomePageRouter() {
  return (
    <div className="Homepage">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/mimax-web" element={<HomePageMain />} />
          <Route path="/actors" element={<ActorsPageMain />} />
          <Route path="/actorslist" element={<ActorsListMain />} />
          <Route path="/movieslist" element={<MoviesListMain />} />
          <Route path="/movies" element={<MoviesPageMain />} />
          <Route path="/tvlist" element={<TVListMain />} />
          <Route path="/tvshows" element={<TVShowsPageMain />} />          
          <Route path="/aboutus" element={<AboutUsMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default HomePageRouter;

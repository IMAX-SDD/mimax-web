import React from "react";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import ActorsPageMain from "../ActorsPage/ActorsPageMain/ActorsPageMain";
import DirectorsPageMain from "../DirectorsPage/DirectorsPageMain/DirectorsPageMain";
import HomePageMain from "./HomePageMain/HomePageMain";
import MoviesPageMain from "../MoviesPage/MoviesPageMain/MoviesPageMain";
import Navbar from '../Header/Navbar';
import TVShowsPageMain from "../TVShowsPage/TVShowsPageMain/TVShowsPageMain"

// routing for home page
// do we need className="Homepage", looks like we don't?
const HomePageRouter = () => {
    return (
        <div className="Homepage">
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<HomePageMain/>} />
                    <Route path='/actors' element={<ActorsPageMain/>} />
                    <Route path='/directors' element={<DirectorsPageMain/>} />
                    <Route path='/movies' element={<MoviesPageMain/>} />
                    <Route path='/tvshows' element={<TVShowsPageMain/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default HomePageRouter
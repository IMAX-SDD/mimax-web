import React from "react";
import Navbar from '../Header/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Movie from "../Movies_page/Movie";
import Main from "./Main"

const Homepage = () => {
    return (
        <div className="Homepage">
            <Router>
            <Navbar />
            <Routes>
                <Route path='/movies' element={<Movie/>} />
            </Routes>
            </Router>
            <Main />
        </div>
    )
}

export default Homepage
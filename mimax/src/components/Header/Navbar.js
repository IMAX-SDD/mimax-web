import React from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import logo from '../Images/Misc/logo.jpg';

function Navbar() {
  const [toggleBar, setToggleBar] = React.useState(false);

  // hamburger menu on top left
  const hamburgerMenu = (
    <div className="sidebar">
      <button className="close-sidebar-btn" type="button" onClick={() => setToggleBar(!toggleBar)}>
        <FaTimes />
      </button>
      <ul className="bar-links">
        <li>
          <Link to="/#">Home</Link>
        </li>
        <li>
          <Link to="/movieslist">Movies</Link>
        </li>
        <li>
          <a href="/tvlist">TV Shows</a>
        </li>
        <li>
          <a href="/actorslist">Actors</a>
        </li>
        <li>
          <a href="/directors">Directors</a>
        </li>
      </ul>
    </div>
  );

  // HTML for expansion of bar
  return (
    <nav>
      <div className={toggleBar ? 'background-dark' : 'background'}>
        <div className="nav-header">
          <button
            className="nav-bar"
            type="button"
            onClick={() => setToggleBar(!toggleBar)}
          >
            <FaBars />
          </button>
          <a href="/"><img className="logo" src={logo} alt="logo" /></a>
        </div>
        {toggleBar && hamburgerMenu}
      </div>
    </nav>
  );
}

export default Navbar;

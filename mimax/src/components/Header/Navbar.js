import React from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import logo from '../Images/Misc/logo.jpg';
import githublogo from '../Images/Misc/githublogo.png';

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
          <a href="/actorslist">People</a>
        </li>
        {/* <li>
          <a href="/directors">Directors</a>
        </li> */}
        <li>
          <a href="/aboutus">About Us</a>
        </li>

      </ul>
      <div className="fadein" style={{ position: 'absolute', bottom: '10px' }}>
        <a href="https://github.com/IMAX-SDD/mimax-web" target="_blank" rel="noopener noreferrer"><img style={{ width: '100%', height: 'auto' }} src={githublogo} alt="githublogo" /></a>
      </div>
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
          <Link className="logo" to="/#"><img className="logo" src={logo} alt="logo" /></Link>
        </div>
        {toggleBar && hamburgerMenu}
      </div>
    </nav>
  );
}

export default Navbar;

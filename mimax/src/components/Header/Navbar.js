import React from "react";

import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '../Images/Misc/logo.jpg'

const Navbar = () => {
    const [toggleBar, setToggleBar] = React.useState(false);

    // hamburger menu on top left
    const hamburgerMenu = (
        <div className="sidebar">
            <button className='close-sidebar-btn' onClick={() => setToggleBar(!toggleBar)}>
                <FaTimes/>
            </button>
            <ul className="bar-links">
                <li>
                    <Link to='/#'>Home</Link>
                </li>
                <li>
                    <Link to='/movies'>Movies</Link>
                </li>
                <li>
                    <a href='/tvshows'>TV Shows</a>
                </li>
                <li>
                    <a href='/actors'>Actors</a>
                </li>
                <li>
                    <a href='/directors'>Directors</a>
                </li>
            </ul>
        </div>
    ) 

    // HTML for expansion of bar
    return ( 
        <nav>
            <div className={toggleBar ? "background-dark" : "background" }>
                <div className="nav-header">
                    <button className="nav-bar"
                            onClick={() => setToggleBar(!toggleBar)}>
                        <FaBars />
                    </button>
                    <img className="logo" src={logo} alt="logo"/>                    
                </div>
                {toggleBar && hamburgerMenu}
            </div>
        </nav>
    )
}

export default Navbar
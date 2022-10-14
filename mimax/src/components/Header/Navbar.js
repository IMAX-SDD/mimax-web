import React from "react";
// import { Link } from 'react-router-dom';
import logo from "../img/logo.jpg";
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [toggleBar, setToggleBar] = React.useState(false);

    const sidebar = (
        <div className="sidebar">
            <button className='close-sidebar-btn' onClick={() => setToggleBar(!toggleBar)}>
                <FaTimes />
            </button>
            <ul className="bar-links">
                <li>
                    <a href='/#'>Movies</a>
                </li>
                <li>
                    <a href='/#'>TV Shows</a>
                </li>
                <li>
                    <a href='/#'>Actors</a>
                </li>
                <li>
                    <a href='/#'>Directors</a>
                </li>
            </ul>
        </div>
    ) 
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
                {toggleBar && sidebar}
            </div>
        </nav>
    )
}

export default Navbar
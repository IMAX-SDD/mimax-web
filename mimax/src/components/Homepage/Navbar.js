import React from "react";
import logo from "../img/logo.jpg"
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [toggleBar, setToggleBar] = React.useState(false);

    const barLinks = (
        <div className="links">
            <ul className="bar-links">
                <li>
                    <h2>...</h2>
                </li>
                <li>
                    <h2>...</h2>
                </li>
            </ul>
        </div>
    ) 
    return ( 
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    <button className="nav-bar"
                            onClick={() => setToggleBar(!toggleBar)}>
                        <FaBars />
                    </button>
                    <img className="logo" src={logo} alt="logo"/>                    
                </div>
                {toggleBar && barLinks}
            </div>
        </nav>
    )
}

export default Navbar
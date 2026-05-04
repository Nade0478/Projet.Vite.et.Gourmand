import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <NavLink to="/home" activeClassName="active-link" className="navbar-link">
                        Accueil
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/menu" activeClassName="active-link" className="navbar-link">
                        Menu
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/about" activeClassName="active-link" className="navbar-link">
                        À propos
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/contact" activeClassName="active-link" className="navbar-link">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
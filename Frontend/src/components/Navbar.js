// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">e-CrimeConnect </div>
         { /* <div className="navbar-links">
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact Us</a>
            </div>*/}
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
           
        </nav>
    );
};

export default Navbar;

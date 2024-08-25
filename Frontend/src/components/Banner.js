// src/Banner.js
import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/background.jpg';

const Banner = () => {
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div  className="back">
            <div className="banner">
            <div className="time-date">
                <div className="time">{currentTime}</div>
                <div className="date">{currentDate}</div>
            </div>
            <div className="banner-content">
                <h1>Welcome to Our Portal</h1>
                {/* <button className="btn-register">Register</button>
                <button className="btn-login">Login</button> */}
                <Link to="/register">
                        <button className="btn-register">Register</button>
                    </Link>
                    <Link to="/login">
                    <button className="btn-login">Login</button>
                    </Link>
            </div>
            </div>
           
        </div>
    );
};

export default Banner;

import React from 'react';
import './AboutUs.css'; // Add custom styles here

function AboutUs() {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>
            <p>
               e-CrimeConnect is a comprehensive platform dedicated to enhancing the efficiency of crime reporting and management.
               Our mission is to bridge the gap between the public and law enforcement agencies by providing a seamless, secure, and user-friendly interface 
               for filing complaints and reporting crimes online.
            </p>
            <p>
               With e-CrimeConnect, citizens can easily submit complaints, track the status of their cases. 
               Our system ensures transparency, accountability, and timely action, empowering users to take an active role in the justice process.
            </p>
            <p>Regards, from creators:</p>
            <ul>
                <li>Dhanashree Rodge</li>
                <li>Anjali chinchlikar</li>
            </ul>
        </div>
    );
}

export default AboutUs;

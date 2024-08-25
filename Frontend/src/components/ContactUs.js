import React from 'react';
//import './ContactUs.css';

function ContactUs() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any queries or need assistance, please reach out to us through any of the following means:</p>
            
            <div className="contact-info">
                <h3>contact us at</h3>
                <p>Email: <a href="mailto:rodgedhanashree@gmail.com">rodgedhanashree@gmail.com</a></p>
                <p>Email: <a href="mailto:potdaranjali1999@gmail.com">potdaranjali1999@gmail.com</a></p>
                <p>Phone: +1 (123) 456-7890</p>
            </div>

             <div className="contact-info">
                <h3>Mailing Address</h3>
                <p>E-Crime Management System</p>
                <p>123 Justice Ave, Suite 456</p>
                <p>pune, Maharashtra, 411035</p>
                <p>India</p>
            </div>

            
        </div>
    );
}

export default ContactUs;


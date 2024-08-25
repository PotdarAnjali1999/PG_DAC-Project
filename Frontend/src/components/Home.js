import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
//import Home from './components/Home';  
import AboutUs from './components/AboutUs';    // Import AboutUs component
import ContactUs from './components/ContactUs'; // Import ContactUs component
import './App.css';

function App() {
  return (
    // <Router>
       <div className="App">
      <Navbar />
      {/* <Banner /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Banner />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
       </div>
            
     
    // </Router>
   
  );
}
export default Home;
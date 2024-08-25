// 

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import RegistrationForm from './components/RegistrationForm';
import { registerUser } from './Services/api';
import LoginPage from './components/Login';
import './App.css';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import AdminDashboard from './components/admin-dashboard';
import AddPoliceStation from './components/AddPoliceStation';
import AdminFeedback from './components/adminfeedback';
import AddConstableForm from './components/AddConstable';
import ViewComplaints from './components/ViewComplaints';
import AssignConstableForm from './components/AssignConstableForm';
import Criminals from './components/Criminals';
import FeedbackForm from './components/FeedbackForm';
import AddComplaintPage from './components/AddComplaintPage';
import ComplaintsPage from './components/ComplaintsPage';

function App() {
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Example API call or setup
        // await registerUser(someInitialUserData);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/add-police-station" element={<AddPoliceStation />} />
          <Route path="/view-feedback" element={<AdminFeedback />} />
          <Route path="/userform/:userId" element={<UserForm/>}/>
          <Route path="/add-constable" element={<AddConstableForm/>} />
          <Route path="/view-complaints" element={<ViewComplaints />} />
          <Route path="/assign-constable" element={<AssignConstableForm />} />
          <Route path="/view-criminals" element={<Criminals />} />
          <Route path="/addcomplaintPage" element={<AddComplaintPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/feedbackform" element={<FeedbackForm />} />
        </Routes>

 <Footer />
      </div>
    </Router>
  );
}

export default App;
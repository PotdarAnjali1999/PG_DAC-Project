
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { registerUser } from '../Services/api.js';
import  '../Styles/RegistrationForm.css';

export default function AddUser() {
  let navigate = useNavigate();

  // Initialize user state with default values
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    contactNo: '',
    dob: '',
    gender: '',
    address: {
      adrLine1: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    }
  });

  // State to handle success message
  const [successMessage, setSuccessMessage] = useState('');


  const { firstName, lastName, emailId, password, contactNo, dob, gender, address } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target; //phenomina of JS (destructuring)
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setUser(prevUser => ({
        ...prevUser,    //spread operator
        address: {
          ...prevUser.address,
          [key]: value
        }
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };
const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user); // Using registerUser here
    //   navigate('/login'); 
    setSuccessMessage('You have successfully registered! Redirecting to the home page...');
      setTimeout(() => {
        navigate('/');
      }, 3000); // 3-second delay before redirecting to the home page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailId" className="form-label">E-mail</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email ID"
                name="emailId"
                value={emailId}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNo" className="form-label">Contact No</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact No"
                name="contactNo"
                value={contactNo}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter DOB"
                name="dob"
                value={dob}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Gender"
                name="gender"
                value={gender}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address.adrLine1" className="form-label">Address Line 1</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 1"
                name="address.adrLine1"
                value={address.adrLine1}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address.city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                name="address.city"
                value={address.city}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address.state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
                name="address.state"
                value={address.state}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address.country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Country"
                name="address.country"
                value={address.country}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address.zipCode" className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Zip Code"
                name="address.zipCode"
                value={address.zipCode}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            {/* <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link> */}
            <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/")}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../Services/api'; // Import the loginUser function

export default function LoginPage() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    emailId: '',
    password: '',
  });

  const { emailId, password } = credentials;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await loginUser(credentials);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Navigate based on the user's role
        if (user.role === 'ROLE_ADMIN') {
            navigate('/admin-dashboard'); // Navigate to admin dashboard
        } else if (user.role === 'ROLE_USER') {
            navigate('/dashboard'); // Navigate to user dashboard
        } else {
            console.error('Unknown role:', user.role);
            // Handle unknown roles (optional)
        }

        console.log("Login successful");
    } catch (error) {
        console.error('Login failed:', error);
        // Optionally, display an error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    id="emailId"
                    placeholder="Enter Email ID"
                    name="emailId"
                    value={emailId}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    id="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark w-50">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

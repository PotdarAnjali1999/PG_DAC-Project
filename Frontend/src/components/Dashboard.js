import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { FaUserEdit, FaFileAlt, FaCommentDots, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Services/api';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User data:', user); // Debug log to check user data

    // Extract user's name and ID, with fallbacks
    const userName = user?.firstName || 'User';
    const userId = user?.id || null;

    
    // Handle navigation to the update profile page
    const handleUpdateClick = () => {
        if (userId) {
            navigate(`/userform/${userId}`);
        } else {
            console.error('User ID not found.');
        }
    };

    const handleComplaintUpdate = () => {
        navigate('/addcomplaintpage');
    };
    
    const handleFeedback = () => {
        navigate('/feedbackform');
    };

    const handleViewStatus = () => {
        navigate('/complaints'); // Navigate to the complaints page
    };
    
    
 const handleLogoutClick = async () => {
    try {
        await logoutUser(); // Call the logout function
        sessionStorage.clear(); // Clear session storage
        navigate('/'); // Navigate to the  homepage after logout
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

useEffect(() => {
    const user = sessionStorage.getItem('user'); // Check session storage
    if (!user) {
      navigate('/'); // Redirect to login if no user is found
    }
  }, [navigate]);






  
    return (
        <Container fluid className="mt-4">
            <Row className="mb-4">
                <Col className="d-flex justify-content-between align-items-center">
                    <h2>Hello, {userName}</h2>
                    {/* <FaUserEdit size={50} />  */}
                    <Col className="text-end">
                    <Button variant="outline-danger" onClick={handleLogoutClick}>Logout</Button>
                </Col>
            
                </Col>
            </Row>

            
            {/* Dashboard Options */}
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaUserEdit className="me-2" /> Update Profile
                            </Card.Title>
                            <Card.Text>Update your account details.</Card.Text>
                            <Button variant="primary" onClick={handleUpdateClick}>
                                Update
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaFileAlt className="me-2" /> Add Complaint
                            </Card.Title>
                            <Card.Text>File a new complaint.</Card.Text>
                            <Button variant="success" onClick={handleComplaintUpdate}>
                                Add Complaint
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaCommentDots className="me-2" /> Add Feedback
                            </Card.Title>
                            <Card.Text>Provide your feedback.</Card.Text>
                            <Button variant="info" onClick={handleFeedback}>
                                Add Feedback
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaEye className="me-2" /> View Status
                            </Card.Title>
                            <Card.Text>Check the status of your complaints.</Card.Text>
                            <Button onClick={handleViewStatus} variant="primary">
                                View Status
                            </Button>
                          </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;


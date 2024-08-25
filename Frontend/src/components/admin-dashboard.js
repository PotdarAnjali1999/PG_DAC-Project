import React ,{ useEffect }from 'react';
import { Container, Row, Card,Col, Button } from 'react-bootstrap';
import { FaUserShield, FaBuilding, FaFileAlt, FaCommentDots, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Services/api.js'; 

function AdminDashboard() {
    const navigate = useNavigate();

    // Handle navigation to various pages
    const handleAddPoliceStationClick = () => {
        navigate('/add-police-station');
    };

    const handleAddConstableClick = () => {
        navigate('/add-constable');
    };

    const handleViewComplaintsClick = () => {
        navigate('/view-complaints');
    };

    const handleViewFeedbackClick = () => {
        navigate('/view-feedback');
    };

    const handleViewCriminalsClick = () => {
        navigate('/view-criminals');
    };

    const handleAssignConstableClick = () => {
        navigate('/assign-constable');
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
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2>Admin Dashboard</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-danger" onClick={handleLogoutClick}>Logout</Button>
                </Col>
            </Row>

            {/* Admin Dashboard Options */}
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaBuilding className="me-2" /> Add Police Station
                            </Card.Title>
                            <Card.Text>Add a new police station to the system.</Card.Text>
                            <Button variant="primary" onClick={handleAddPoliceStationClick}>
                                Add Police Station
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaUserShield className="me-2" /> Add Constable
                            </Card.Title>
                            <Card.Text>Add a new constable to the police force.</Card.Text>
                            <Button variant="success" onClick={handleAddConstableClick}>
                                Add Constable
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaCommentDots className="me-2" /> View Feedback
                            </Card.Title>
                            <Card.Text>Check feedback provided by users.</Card.Text>
                            <Button variant="info" onClick={handleViewFeedbackClick}>
                                View Feedback
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaUsers className="me-2" /> View Criminals
                            </Card.Title>
                            <Card.Text>See the list of known criminals.</Card.Text>
                            <Button variant="danger" onClick={handleViewCriminalsClick}>
                                View Criminals
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaFileAlt className="me-2" /> View Complaints
                            </Card.Title>
                            <Card.Text>Review complaints filed by users.</Card.Text>
                            <Button variant="warning" onClick={handleViewComplaintsClick}>
                                View Complaints
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaUserShield className="me-2" /> Assign Constable
                            </Card.Title>
                            <Card.Text>Assign a constable to a specific complaint.</Card.Text>
                            <Button variant="success" onClick={handleAssignConstableClick}>
                                Assign Constable
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>    
            </Row>
        </Container>
    );
}

export default AdminDashboard;

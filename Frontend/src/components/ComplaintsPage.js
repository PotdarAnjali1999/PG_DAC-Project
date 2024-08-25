import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Button } from 'react-bootstrap';
import { getUserComplaints } from '../Services/api'; // Ensure this function is defined in your API services
import { useNavigate } from 'react-router-dom';

function ComplaintsPage() {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (userId) {
            getUserComplaints(userId)
                .then(response => setComplaints(response))
                .catch(err => setError('Failed to fetch complaints.'));
        } else {
            setError('User ID not found.');
        }
    }, []);

    return (
        <Container>
            <h2 className="mt-4">Your Complaints</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && complaints.length === 0 && <Alert variant="info">No complaints found.</Alert>}
            {complaints.length > 0 && (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{complaint.complaintTitle}</td>
                                <td>{complaint.status}</td>
                                <td>{complaint.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </Button>
        </Container>
    );
}

export default ComplaintsPage;

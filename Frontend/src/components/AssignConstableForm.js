import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { assignConstableToComplaint } from '../Services/adminApi.js';

function AssignConstableForm() {
    const [complaintId, setComplaintId] = useState('');
    const [policeConstableId, setpoliceConstableId] = useState('');
    const [error, setError] = useState('');
    const [SuccessMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await assignConstableToComplaint(complaintId, policeConstableId);
            setSuccessMessage('Police constable assigned successfully!');
           // Navigate to admin dashboard after a short delay to show the message
           setTimeout(() => {
            navigate('/admin-dashboard'); // Use navigate for navigation
        }, 3000); // Adjust the delay time as needed // Redirect to dashboard after successful assignment
        } catch (error) {
            setError('Failed to assign constable to complaint.');
            setSuccessMessage('Failed to add police station.');
            console.error('Error assigning constable:', error);
            
        }
    };

    return (
        <Container className="mt-4">
            <h2>Assign Constable to Complaint</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="complaintId">
                    <Form.Label>Complaint ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Complaint ID"
                        value={complaintId}
                        onChange={(e) => setComplaintId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="constableId" className="mt-3">
                    <Form.Label>Constable ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Constable ID"
                        value={policeConstableId}
                        onChange={(e) => setpoliceConstableId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Assign Constable
                </Button>
            </Form>
        </Container>
    );
}

export default AssignConstableForm;

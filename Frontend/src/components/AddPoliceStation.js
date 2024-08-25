import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addPoliceStation } from '../Services/adminApi.js';

function AddPoliceStation() {
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addPoliceStation({ name, area });
            setSuccessMessage('Police station added successfully!');
            // Navigate to admin dashboard after a short delay to show the message
            setTimeout(() => {
                navigate('/admin-dashboard'); // Use navigate for navigation
            }, 2000); // Adjust the delay time as needed
            setName(''); // Clear the form
            setArea('');
            console.log('Response:', response);
        } catch (error) {
            console.error('Error adding police station:', error);
            setSuccessMessage('Failed to add police station.');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add Police Station</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPoliceStationName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter police station name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formPoliceStationArea" className="mb-3">
                    <Form.Label>Area</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter area" 
                        value={area} 
                        onChange={(e) => setArea(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Add Police Station
                </Button>
            </Form>
            {successMessage && <p>{successMessage}</p>}
        </Container>
    );
}

export default AddPoliceStation;

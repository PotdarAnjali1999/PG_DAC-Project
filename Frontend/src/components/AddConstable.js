import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { addPoliceConstable, getAllPoliceStations } from '../Services/adminApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddConstableForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [badgeNumber, setBadgeNumber] = useState('');
    const [policeStationId, setpoliceStationId] = useState('');
    const [policeStations, setPoliceStations] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch all police stations when the component mounts
        const fetchPoliceStations = async () => {
            try {
                const stations = await getAllPoliceStations();
                setPoliceStations(stations);
            } catch (error) {
                console.error('Error fetching police stations:', error);
                setError('Failed to fetch police stations');
            }
        };

        fetchPoliceStations();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
       try {
            const constable = {
                firstName,
                lastName,
                badgeNumber,
                policeStationId: policeStationId // Ensure the key matches what the server expects
            };
           console.log("Payload being sent:", constable); 
           await addPoliceConstable(constable);
            setSuccess('Police constable added successfully!');
                        setTimeout(() => {
                navigate('/admin-dashboard'); // Use navigate for navigation
            }, 2000); // Adjust the delay time as needed
            setFirstName('');
            setLastName('');
            setBadgeNumber('');
            setpoliceStationId('');
        } catch (error) {
            console.error('Error adding police constable:', error);
            setError('Failed to add police constable');
        } 
          
    };
    
    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
               </Form.Group>

                <Form.Group as={Col} controlId="formBadgeNumber">
                    <Form.Label>Badge Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter badge number"
                        value={badgeNumber}
                        onChange={(e) => setBadgeNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formPoliceStation">
                    <Form.Label>Police Station</Form.Label>
                    <Form.Control
                        as="select"
                        value={policeStationId}
                        onChange={(e) => setpoliceStationId(e.target.value)}
                                  required
                                  > 
    <option value=" ">Select Police Station</option>
    {policeStations.map(station => (
        <option key={station.policeStationId} value={station.policeStationId}>
            {station.name}
        </option>
    ))}
</Form.Control>

                </Form.Group>

                <Button variant="dark" type="submit">
                    Add Constable
                </Button>
            </Form>
        </div>
    );
};

export default AddConstableForm;

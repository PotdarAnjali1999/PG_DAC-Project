import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllCriminals } from '../Services/adminApi.js'; // Import the API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Table } from 'react-bootstrap';

function Criminals() {
    const [criminals, setCriminals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCriminals = async () => {
            try {
                const data = await getAllCriminals();
                //setCriminals(response.data); // Assuming response.data contains the list of criminals
                setCriminals(Array.isArray(data) ? data : []); // Ensure criminals is an array
                // Navigate to admin dashboard after a short delay to show the message
            setTimeout(() => {
                navigate('/admin-dashboard'); // Use navigate for navigation
            }, 4000); // Adjust the delay time as needed
            } catch (error) {
                setError('Failed to fetch criminals');
                console.error('Error fetching criminals:', error);
            }
        };

        fetchCriminals();
    }, []);

    return (
        <Container fluid className="mt-4">
            <h2>List of Criminals</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        
                        <th>criminal Name</th>
                        <th>criminal Address</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(criminals) && criminals.map((criminal) => (
                   <tr key={criminal.Id}>
                   
                   <td>{criminal.criminalName}</td>
                   <td>{criminal.criminalAddress}</td>
                   </tr>
                ))}
               </tbody>
            </Table>
        </Container>
    );
}

export default Criminals;

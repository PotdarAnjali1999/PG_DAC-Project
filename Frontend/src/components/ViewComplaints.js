import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { getAllComplaints, updateComplaintStatus } from '../Services/adminApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const data = await getAllComplaints();
            setComplaints(data);
        } catch (error) {
            console.error('Failed to fetch complaints:', error);
        }
    };

    const handleStatusChange = async (userId, complaintId, status) => {
        try {
            //localStorage.setItem('complaintId', complaintId); // Store complaintId in local storage
            await updateComplaintStatus(userId, complaintId, status);
            fetchComplaints(); // Refresh complaints list after update
            setTimeout(() => {
                navigate('/admin-dashboard'); // Use navigate for navigation
            }, 2000); // Adjust the delay time as needed
        } catch (error) {
            console.error('Failed to update complaint status:', error);
        }
    };
    

    return (
        <Container className="mt-4">
            <h2>View Complaints</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {complaints.map((complaint) => (
                   <tr key={complaint.complaintId}>
                   <td>{complaint.complaintTitle}</td>
                   <td>{complaint.complaintDescription}</td>
                   <td>{complaint.complaintDate}</td>
                   <td>{complaint.status}</td>
                   <td>
                     <Button variant="success" onClick={() => handleStatusChange(complaint.userId, complaint.complaintId, 'APPROVED')}>
                    Accept
                    </Button>{' '}
                     <Button variant="danger" onClick={() => handleStatusChange(complaint.userId, complaint.complaintId, 'REJECTED')}>
                    Reject
                </Button>
            </td>
        </tr>
    ))}
</tbody>
            </Table>
        </Container>
    );
};

 export default ViewComplaints; 


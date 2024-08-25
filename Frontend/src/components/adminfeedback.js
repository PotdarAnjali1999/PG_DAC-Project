import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getAllFeedbacks  } from '../Services/adminApi.js';
// Import the API function

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const data = await getAllFeedbacks();
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    return (
        <div className="container mt-4">
           
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Content</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => (
                        <tr key={feedback.id}>
                            <td>{feedback.userId}</td>
                            <td>{feedback.content}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminFeedback;


import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { addComplaint } from '../Services/api';
import { useNavigate } from 'react-router-dom';



const AddComplaintPage = () => {
    const [complaint, setComplaint] = useState({
        
        complaintTitle: '',
        complaintDescription: '',
        complaintDate: '',
        category: '',
        location: ''
    });

    const [missingPerson, setMissingPerson] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        missingSince: '',
        lastKnownLocation: '',
        imageUrl: '',
        contactNo: '',
        age: ''
    });

    const handleComplaintChange = (e) => {
        const { name, value } = e.target;
        setComplaint(prevState => ({ ...prevState, [name]: value }));
    };

    const handleMissingPersonChange = (e) => {
        const { name, value } = e.target;
        setMissingPerson(prevState => ({ ...prevState, [name]: value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                complaint,
                missingPersons: complaint.category === 'MISSING_PERSON' ? [missingPerson] : []
            };
    
            const response = await addComplaint(payload.complaint, payload.missingPersons);
            localStorage.setItem("compId",response.data.complaintId);  //set complaint id to localstorage
            console.log('Complaint added successfully:', response.data);
        } catch (error) {
            console.error('Error adding complaint:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Register Complaint</h2>
            <Form onSubmit={handleSubmit}>
                {/* Complaint Form Fields */}
                <Form.Group controlId="formComplaintTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="complaintTitle"
                        value={complaint.complaintTitle}
                        onChange={handleComplaintChange}
                        required
                        minLength="5"
                        maxLength="100"
                    />
                </Form.Group>

                <Form.Group controlId="formComplaintDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="complaintDescription"
                        value={complaint.complaintDescription}
                        onChange={handleComplaintChange}
                        required
                        minLength="10"
                        maxLength="1000"
                    />
                </Form.Group>

                <Form.Group controlId="formComplaintDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="complaintDate"
                        value={complaint.complaintDate}
                        onChange={handleComplaintChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={complaint.category}
                        onChange={handleComplaintChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="FIR">FIR</option>
                        <option value="MISSING_PERSON">MISSING_PERSON</option>
                        {/* Add other categories as needed */}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={complaint.location}
                        onChange={handleComplaintChange}
                        maxLength="255"
                    />
                </Form.Group>

                {/* Missing Person Fields (Conditionally Rendered) */}
                {complaint.category === 'MISSING_PERSON' && (
                    <>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={missingPerson.firstName}
                                onChange={handleMissingPersonChange}
                                required
                                maxLength="50"
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={missingPerson.lastName}
                                onChange={handleMissingPersonChange}
                                required
                                maxLength="50"
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={missingPerson.gender}
                                onChange={handleMissingPersonChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                                <option value="TRANSGENDER">TRANSGENDER</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formMissingSince">
                            <Form.Label>Missing Since</Form.Label>
                            <Form.Control
                                type="date"
                                name="missingSince"
                                value={missingPerson.missingSince}
                                onChange={handleMissingPersonChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastKnownLocation">
                            <Form.Label>Last Known Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastKnownLocation"
                                value={missingPerson.lastKnownLocation}
                                onChange={handleMissingPersonChange}
                                required
                                maxLength="255"
                            />
                        </Form.Group>

                        <Form.Group controlId="formImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={missingPerson.imageUrl}
                                onChange={handleMissingPersonChange}
                                maxLength="255"
                            />
                        </Form.Group>

                        <Form.Group controlId="formContactNo">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactNo"
                                value={missingPerson.contactNo}
                                onChange={handleMissingPersonChange}
                                maxLength="15"
                            />
                        </Form.Group>

                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={missingPerson.age}
                                onChange={handleMissingPersonChange}
                                required
                                min="0"
                                max="150"
                            />
                        </Form.Group>
                    </>
                )}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default AddComplaintPage;

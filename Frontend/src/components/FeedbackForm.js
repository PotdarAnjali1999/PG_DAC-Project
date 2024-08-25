import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { addFeedback } from '../Services/api'; // Import the addFeedback function from your API module

const FeedbackForm = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Retrieve user ID from local storage
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError('User ID is missing.');
      return;
    }

    try {
      // Call the addFeedback API function
      await addFeedback({ content, userId });
      alert('Feedback submitted successfully!');
      setContent(''); // Reset form
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Submit Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FeedbackForm;

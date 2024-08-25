
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/users', // Adjust baseURL as needed
    withCredentials: true
});

export const registerUser = async (user) => {
    try {
        const response = await api.post('/register', user
        // , 
        // {
        //     headers:{"Content-Type":"application/json"}
        // }
        );
        return response.data; // Handle the response data as needed
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};


const authApi = axios.create({
    baseURL: 'http://localhost:8080/auth',
    withCredentials: true, // Ensure cookies are included with requests
});

// Function to login a user
export const loginUser = async (credentials) => {
    try {
        const response = await authApi.post('/login', credentials);
        //return response.data; // Return user data or token if needed
        const userData = response.data; // This should contain user information
        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData));
       return userData; // Return user data or token if needed


    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};

// Function to log out the user
export const logoutUser = async () => {
    try {
        await authApi.post('/logout'); // No response data needed
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};


// Function to fetch user data by ID
export const fetchUserData = async (userId) => {
    try {
        const response = await api.get(`/get/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Function to update user data by ID
export const updateUserData = async (userId, data) => {
    try {
        const response = await api.put(`/updateUser/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

export const addComplaint = async (complaint, missingPersons = []) => {
    try {
        const payload = {
            complaint,
            missingPersons
        };

        // Remove Authorization header if using cookies for session management
        const response = await api.post('/add', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`            }
        });

        return response;
    } catch (error) {
        console.error('Error adding complaint:', error);
        throw error;
    }
};
// Function to add feedback
export const addFeedback = async (feedback) => {
    try {
        const response = await api.post('/feedback', feedback, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};

// //Fetch complaint status by complaint ID
// export const getComplaintStatus = async (complaintId) => {
//     console.log('Fetching status for complaint ID:', complaintId); 
//     try {
//         const response = await api.get(`/complaints/${complaintId}/status`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response ? error.response.data : 'Failed to fetch complaint status');
    
//     }
// };

export const getUserComplaints = async (userId) => {
    try {
        const response = await api.get(`/getAllComplaintsByuserId/${userId}`);
        return response.data; // Assuming this returns an array of complaints
    } catch (error) {
        throw new Error('Failed to fetch user complaints: ' + (error.response ? error.response.data : error.message));
    }
};
export default api;

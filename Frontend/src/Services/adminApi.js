import axios from 'axios';

// Create an axios instance specifically for admin operations
const adminApi = axios.create({
    baseURL: 'http://localhost:8080/admin', // Base URL for admin endpoints
    withCredentials: true, // Ensure cookies are included with requests
});

// Function to add a police station
export const addPoliceStation = async (station) => {
    try {
        const response = await adminApi.post('/addPoliceStation', station);
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error adding police station:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};


// Function to add a police constable
export const addPoliceConstable = async (constable) => {
    try {
        console.log(constable);
        const response = await adminApi.post('/addPoliceConstable', constable);
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error adding police constable:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};




// Function to get all feedbacks
export const getAllFeedbacks = async () => {
    try {
        const response = await adminApi.get('/getfeedbacks');
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};

// Function to get all police stations
export const getAllPoliceStations = async () => {
    try {
        const response = await adminApi.get('/getPoliceStations');
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error fetching police stations:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};

// Function to get all complaints
export const getAllComplaints = async () => {
    try {
        const response = await adminApi.get('/getComplaints');
        console.log('Fetched complaints:', response);
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};


// Function to update complaint status
export const updateComplaintStatus = async (userId, complaintId, newStatus) => {
    try {
        console.log('Sending request with:', { userId, complaintId, newStatus }); // Add this line for debugging
        const response = await adminApi.post('/updateComplaintStatusByUserId', null, {
            params: {
                userId: userId,
                complaintId: complaintId,
                newStatus: newStatus
            }
        });
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error updating complaint status:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};

// Function to get complaint by ID
export const getComplaintById = async (complaintId) => {
    try {
        const response = await adminApi.get(`/getComplaintById`, { params: { complaintId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching complaint:', error);
        throw error;
    }
};

// Function to get constables by station ID
export const getPoliceConstablesByStationId = async (policeStationId) => {
    try {
        const response = await adminApi.get(`/getConstablesByStationId`, { params: {policeStationId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching constables:', error);
        throw error;
    }
};

// Function to assign a constable to a complaint
export const assignConstableToComplaint = async (complaintId, policeConstableId) => {
    const response = await adminApi.post('/assignPoliceConstableToComplaint', null, {
        params: {
            complaintId,
            policeConstableId: policeConstableId,
        },
    });
    return response.data;
};


export const getAllCriminals = async () => {
    try {
        const response = await adminApi.get('/getAllCriminals');
        console.log('Fetched criminals:', response);
        return response.data; // Return the response data as needed
    } catch (error) {
        console.error('Error fetching criminals:', error);
        throw error; // Rethrow or handle the error appropriately
    }
};
export default adminApi;

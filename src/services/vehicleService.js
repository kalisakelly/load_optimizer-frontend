import axios from 'axios';

const API_URL = 'http://localhost:3000/vehicle'; // Replace with your backend URL

const getToken = () => {
    return localStorage.getItem('userToken'); // Retrieve JWT token from localStorage
};

const fetchVehicles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const fetchVehicleById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const createVehicle = async (vehicleData) => {
    const token = getToken();
    const response = await axios.post(API_URL, vehicleData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const updateVehicle = async (id, vehicleData) => {
    const token = getToken();
    const response = await axios.patch(`${API_URL}/${id}`, vehicleData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const deleteVehicle = async (id) => {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export { fetchVehicles, fetchVehicleById, createVehicle, updateVehicle, deleteVehicle };
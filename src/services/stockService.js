import axios from 'axios';

const API_URL = 'http://localhost:3000/stock';

const fetchStocks = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

const createStock = async (newItem, token) => {
    const response = await axios.post(API_URL, newItem, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const updateStock = async (id, updatedItem, token) => {
    const response = await axios.patch(`${API_URL}/${id}`, updatedItem, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
const fetchStockDetails = async (stockId) => {
    const response = await axios.get(`${API_URL}/${stockId}/details`);
    return response.data;
};

const addStockEntry = async (stockId, itemId, quantity) => {
    try {
      const token = localStorage.getItem('userToken'); // Retrieve the JWT token from localStorage
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      const response = await axios.post(
        `${API_URL}/${stockId}/entries`,
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Failed to add stock entry:', error.response?.data || error.message);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

const fetchItems = async () => {
    const response = await axios.get('http://localhost:3000/item'); // Replace with your items endpoint
    return response.data;
  };
  
export { fetchStocks, fetchStockDetails, addStockEntry, createStock, updateStock, fetchItems };


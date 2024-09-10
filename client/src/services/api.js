import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const getDeposits = async () => {   
  try {
    const response = await axios.post(`${API_URL}/getDeposits`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching deposits:', error);
    return [];
  }
};
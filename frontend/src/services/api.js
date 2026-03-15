import axios from 'axios';

const API_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return mock data for frontend development if backend is not ready
    return {
      totalCustomers: 1250,
      highRisk: 145,
      lowRisk: 1105
    };
  }
};

export const predictCustomer = async (customerData) => {
  try {
    const response = await apiClient.post('/predict', customerData);
    return response.data;
  } catch (error) {
    console.error('Error predicting:', error);
    // Mock response
    return {
      probability: Math.random(),
      riskLevel: Math.random() > 0.5 ? 'High Risk' : 'Low Risk',
      id: `CUST-${Math.floor(Math.random() * 10000)}`
    };
  }
};

export const getPredictionHistory = async () => {
  try {
    const response = await apiClient.get('/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    // Mock history
    return Array.from({ length: 15 }).map((_, i) => ({
      key: i.toString(),
      id: `CUST-${2000 + i}`,
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      probability: (Math.random()).toFixed(3),
      riskLevel: Math.random() > 0.5 ? 'High Risk' : 'Low Risk',
    }));
  }
};

export const bulkPredict = async (formData) => {
  try {
    const response = await apiClient.post('/bulk_predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in bulk prediction:', error);
    // Mock bulk prediction response
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `CUST-${8000 + i}`,
      probability: Math.random(),
      riskLevel: Math.random() > 0.5 ? 'High Risk' : 'Low Risk',
    }));
  }
};

export const getFeatureImportance = async () => {
  try {
    const response = await apiClient.get('/feature_importance');
    return response.data;
  } catch (error) {
    console.error('Error fetching feature importance:', error);
    return {
      features: [
        { name: "Credit Utilization", importance: 0.34 },
        { name: "Payment History", importance: 0.27 },
        { name: "Balance", importance: 0.18 },
        { name: "Income", importance: 0.11 },
        { name: "Transactions", importance: 0.10 }
      ]
    };
  }
};

export default apiClient;

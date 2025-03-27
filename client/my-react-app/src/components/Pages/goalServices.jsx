import axios from "axios";

const API_URL = "http://localhost:3000/api/goals";

// Set up headers with authentication
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Create a goal
export const createGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData, getHeaders());
  return response.data;
};

// Get all goals
export const getGoals = async () => {
  const response = await axios.get(API_URL, getHeaders());
  return response.data;
};

// Update savings progress
export const updateGoal = async (goalId, amount) => {
  const response = await axios.put(
    `${API_URL}/${goalId}`,
    { amount },
    getHeaders()
  );
  return response.data;
};

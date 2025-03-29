import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:3000/api", // Backend URL
baseURL: "/api"
});

export const fetchTransactions = () => api.get("/transactions");
export const addTransaction = (data) => api.post("/transactions", data);
export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

// utils/sortTransactions.js
export const sortTransactionsByDate = (transactions) => {
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
};

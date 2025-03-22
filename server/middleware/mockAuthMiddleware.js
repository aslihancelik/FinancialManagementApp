// mockAuthMiddleware.js
// This is a middleware to bypass the authentication of the user until the accounts is merged to the authentication feature of the project

const mockAuthMiddleware = (req, res, next) => {
  // Simulate a logged-in user by adding a user object to the request
  req.user = {
    id: "67x88bc0e55f79b777Z7e002", // Example user ID (it matches a valid user in the database)
  };
  next();
};

module.exports = mockAuthMiddleware;

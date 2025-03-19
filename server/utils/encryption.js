const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // Recommended number of salt rounds for bcrypt

// Encrypt a value (e.g., routing number or account number)
const encrypt = async (value) => {
  if (!value) return null; // Safeguard against null/undefined values
  return await bcrypt.hash(value, SALT_ROUNDS); // Encrypt the value
};

// Compare a value with its hashed version
const compare = async (value, hashedValue) => {
  return await bcrypt.compare(value, hashedValue); // Return true if matched, false otherwise
};

module.exports = {
  encrypt,
  compare,
};

const jwt = require("jsonwebtoken");

// Function to generate a JWT token
// Takes a user ID as a parameter and returns a signed token
const generateToken = (id) => {
  // Sign the token with the user ID and a secret key from environment variables
  // Set the token to expire in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

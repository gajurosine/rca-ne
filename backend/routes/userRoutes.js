const express = require("express");
const { createUser, login, readUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

// Route to create a new user
router.post("/createUser", createUser);

// Route for user login
router.post("/login", login);


// Route to get a specific user by ID
router.get('/:userId', readUser);

// Route to update a specific user by ID
router.put('/user/:userId', updateUser);

// Route to delete a specific user by ID
router.delete('/user/:userId', deleteUser);

module.exports = router;
const express = require("express");
const prisma = require("./helpers/prisma");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

// Use the base router for handling routes
app.use(require("./baseRouter"));

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  prisma.$connect().then(() => {
    console.log("Database connected");
  });
});

module.exports = app;

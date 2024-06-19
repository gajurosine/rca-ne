const express = require("express");
const prisma = require("./helpers/prisma");
const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

require("dotenv").config();

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined

// Use the base router for handling routes
app.use(require("./baseRouter"));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  prisma.$connect().then(() => {
    console.log("Database connected");
  });
});

module.exports = app;

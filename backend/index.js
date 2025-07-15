const express = require("express");
const prisma = require("./helpers/prisma");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Serve static files (like PDF books) from public/books
app.use('/book', express.static(path.join(__dirname, 'public', 'book')));

// ✅ Swagger API docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ✅ All your base routes (might include auth, etc.)
app.use(require("./baseRouter"));

// ✅ Add this if bookRouter is in `routes/bookRouter.js`
const bookRouter = require('./routes/bookRouter');
app.use('/api', bookRouter); // So routes will be like /api/books

// ✅ Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`✅ App listening on http://localhost:${PORT}`);
  prisma.$connect().then(() => {
    console.log("✅ Database connected");
  });
});

module.exports = app;

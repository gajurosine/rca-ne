const express = require("express");
const prisma = require("./helpers/prisma");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const path = require("path");
const cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for frontend access
app.use(cors());

// ✅ Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Serve static files (like PDF books)
app.use('/books', express.static(path.join(__dirname, 'public', 'book')));

// ✅ Swagger API docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ✅ Base routes (e.g., auth, etc.)
app.use(require("./baseRouter"));

// ✅ Book API routes
const bookRouter = require('./routes/bookRoute');
app.use('/api', bookRouter); // e.g., /api/books

// ✅ Serve frontend static files (after API routes)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// ✅ Start server and connect to database
app.listen(PORT, () => {
  console.log(`✅ App listening on http://localhost:${PORT}`);
  prisma.$connect().then(() => {
    console.log("✅ Database connection");
  });
});

module.exports = app;

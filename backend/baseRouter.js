const express = require('express');
const authenticateToken = require('./middleware/auth');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const morgan = require("morgan");
const baseRouter = express.Router();

// Enable CORS preflight requests for all routes
baseRouter.options("*", cors());

// Middleware to set CORS headers  which allow any end point to be run on the server
baseRouter.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.status(200);
    next();
});

// Middleware to parse JSON request bodies
baseRouter.use(express.json());

// Middleware to log HTTP requests
baseRouter.use(morgan('short'));

// Swagger documentation route
baseRouter.use('/api/v1/swagger-doc', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

// User authentication routes
baseRouter.use("/api/v1/auth", require('./routes/userRoutes')
/*
    #swagger.tags = ['Auth']
    #swagger.security = [{
        "bearerAuth": []
    }]
*/
);

// Book management routes with token authentication
baseRouter.use("/api/v1/books", authenticateToken, require('./routes/bookRoute')
/*
    #swagger.tags = ['Books']
    #swagger.security = [{
        "bearerAuth": []
    }]
*/
);

module.exports = baseRouter;

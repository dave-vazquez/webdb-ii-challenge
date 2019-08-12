const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const carsRouter = require('./routes/cars/carsRouter.js');
const swaggerDoc = require('./swaggerDoc.json');

const server = express();

// MIDDLEWARE
server.use(cors());
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use('/api/cars', carsRouter);

// CUSTOM MIDDLEWARE
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err
  });
});

server.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = server;

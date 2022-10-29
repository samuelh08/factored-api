const express = require('express');
const api = require('./api');
const app = express();

app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  const { statusCode = 500 } = error;
  const { name } = error;

  if (name.startsWith('Sequelize')) {
    if (name === 'SequelizeUniqueConstraintError') {
      statuscode = 400;
    }
  }

  if (name === 'UnauthorizedError') {
    statusCode = 401;
  }

  res.status(statusCode).json({
    ...error,
    statusCode,
  });
});

module.exports = app;

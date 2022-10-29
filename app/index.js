const express = require('express');
const cors = require('cors');

const api = require('./api');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  let { statusCode = 500 } = error;
  const { name = '' } = error;

  if (name.startsWith('Sequelize')) {
    if (name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
    }
  }

  res.status(statusCode).json({
    ...error,
    statusCode,
  });
});

module.exports = app;

require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');

// Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customersRouter = require('./routes/customers');
const ridesRouter = require('./routes/rides');
const carsRouter = require('./routes/cars');

// DB connection
require('./configs/database');

const app = express();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Set the public folder to "~/client/build/"
app.use(express.static(path.join(__dirname, '../client/build')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/rides', ridesRouter);
app.use('/api/cars', carsRouter);

// Catch 404 error for any route that start with "/api"
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For any other route redirect to client index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  console.error("----- An error happened -----");
  console.error(err);
  if (process.env.NODE_ENV === 'production')
    res.json(err); // A limited amount of information sent in production
  else
    res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
});

module.exports = app;


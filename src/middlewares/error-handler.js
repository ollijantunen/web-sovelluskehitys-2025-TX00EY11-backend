import {validationResult} from 'express-validator';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req, {strictParams: ['body']});

  console.log(errors);


  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array({onlyFirstError: true}));
    const error = new Error('Bad request');
    error.status = 400;
    error.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {field: error.path, message: error.msg, location: error.location};
    });
    console.log(error.errors);
    console.log(error);

    return next(error);
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors,
    },
  });
};

const customError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export {notFoundHandler, validationErrorHandler, errorHandler, customError};

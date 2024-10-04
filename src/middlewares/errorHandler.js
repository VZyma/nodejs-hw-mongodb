import createHttpError from 'http-errors';

const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Something went wrong';
  let data = error.expose ? error.message : 'Internal Server Error';

  // Обработка ошибок валидации Mongoose
  if (error.name === 'ValidationError') {
    status = 400; // Bad Request
    message = 'Validation Error';
    data = {};

    // Собираем все ошибки валидации в один объект
    for (let field in error.errors) {
      data[field] = error.errors[field].message;
    }
  }

  res.status(status).json({
    status,
    message,
    data,
  });
};

export default errorHandler;
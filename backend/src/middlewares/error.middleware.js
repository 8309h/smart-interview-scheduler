import AppError from '../utils/appError.js';
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const errors = err.errors || [];

  logger.error('[ERROR] Request failed', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new AppError('Resource not found', 404);
  next(error);
};

export default errorHandler;

export const successResponse = ({ res, statusCode = 200, message = 'Success', data = {} }) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export const errorResponse = ({ res, statusCode = 500, message = 'Internal server error', errors = [] }) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};

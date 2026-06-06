import { successResponse } from '../../utils/apiResponse.js';
import { NODE_ENV } from '../../config/index.js';

export const healthCheck = (req, res) => {
  const uptime = `${process.uptime().toFixed(2)} seconds`;
  return successResponse({
    res,
    statusCode: 200,
    message: 'Server is running',
    data: {
      uptime,
      environment: NODE_ENV,
    },
  });
};

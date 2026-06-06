import AppError from '../utils/appError.js';
import logger from '../utils/logger.js';
import { verifyToken } from '../utils/jwt.js';
import Interviewer from '../models/interviewer.model.js';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('[AUTH] Invalid token');
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    const user = await Interviewer.findById(payload.userId);

    if (!user || !user.isActive) {
      logger.error('[AUTH] Invalid token - user not found or inactive');
      return next(new AppError('Unauthorized', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('[AUTH] Invalid token', error);
    return next(new AppError('Invalid or expired token', 401));
  }
};

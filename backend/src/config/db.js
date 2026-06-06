import mongoose from 'mongoose';
import { MONGO_URI } from './index.js';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('[DATABASE] MongoDB connected');
  } catch (err) {
    logger.error('[DATABASE] Failed to connect database', err);
    throw err;
  }
};

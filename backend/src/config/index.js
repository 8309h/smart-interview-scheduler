import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hiresync';
export const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
export const API_PREFIX = process.env.API_PREFIX || '/api/v1';

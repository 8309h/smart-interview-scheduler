import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hiresync';
export const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'change_me_32_characters_minimum_1234';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/v1/auth/google/callback';
export const API_PREFIX = process.env.API_PREFIX || '/api/v1';

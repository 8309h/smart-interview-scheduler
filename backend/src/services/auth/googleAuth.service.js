import { URLSearchParams } from 'url';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '../../config/index.js';
import Interviewer from '../../models/interviewer.model.js';
import AppError from '../../utils/appError.js';
import logger from '../../utils/logger.js';
import { encryptData } from '../../utils/crypto.js';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';
const AUTH_BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPE = ['openid', 'email', 'profile'].join(' ');

export const getGoogleAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${AUTH_BASE_URL}?${params.toString()}`;
};

const getGoogleToken = async (code) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new AppError('Google OAuth credentials are not configured', 500);
  }

  const params = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    logger.error('[AUTH] Google token exchange failed', data);
    throw new AppError('Unable to exchange code for Google token', 500);
  }

  return data;
};

const getGoogleProfile = async (accessToken) => {
  const response = await fetch(USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const profile = await response.json();
  if (!response.ok || profile.error_description) {
    logger.error('[AUTH] Failed to fetch Google profile', profile);
    throw new AppError('Unable to fetch Google profile', 500);
  }

  return profile;
};

export const createOrUpdateUserFromGoogle = async (code) => {
  logger.info('[AUTH] Google login started');

  const tokenResponse = await getGoogleToken(code);
  const profile = await getGoogleProfile(tokenResponse.access_token);

  const encryptedRefreshToken = tokenResponse.refresh_token
    ? encryptData(tokenResponse.refresh_token)
    : undefined;

  const updateData = {
    name: profile.name,
    email: profile.email,
    googleId: profile.sub,
    profilePicture: profile.picture,
    lastLoginAt: new Date(),
  };

  if (encryptedRefreshToken) {
    updateData.encryptedRefreshToken = encryptedRefreshToken;
  }

  const user = await Interviewer.findOneAndUpdate(
    { $or: [{ googleId: profile.sub }, { email: profile.email }] },
    { $set: updateData },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  logger.info('[AUTH] User authenticated');

  return user;
};

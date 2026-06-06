import AppError from '../../utils/appError.js';
import { getGoogleAuthUrl, createOrUpdateUserFromGoogle } from '../../services/auth/googleAuth.service.js';
import { generateToken } from '../../utils/jwt.js';
import logger from '../../utils/logger.js';

export const redirectToGoogle = (req, res) => {
  const redirectUrl = getGoogleAuthUrl();
  return res.redirect(302, redirectUrl);
};

export const handleGoogleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new AppError('Google authorization code is required', 400);
    }

    const user = await createOrUpdateUserFromGoogle(code);
    if (!user) {
      throw new AppError('User creation failed', 500);
    }

    const token = generateToken({ userId: user.id, email: user.email });
    logger.info('[AUTH] JWT generated');

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isActive: user.isActive,
          lastLoginAt: user.lastLoginAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('User not authenticated', 401));
  }

  const user = req.user;
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Current user fetched',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
    },
  });
};

export const logoutUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AppError('User not authenticated', 401));
    }

    req.user.encryptedRefreshToken = null;
    await req.user.save();
    logger.info('[AUTH] Logout successful');

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Logout successful',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

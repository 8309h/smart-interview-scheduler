import { Router } from 'express';
import { redirectToGoogle, handleGoogleCallback, getCurrentUser, logoutUser } from '../../controllers/v1/auth.controller.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { validateQuery } from '../../middlewares/validate.middleware.js';
import { oauthCallbackSchema } from '../../validations/auth.validation.js';

const router = Router();

/**
 * @openapi
 * /auth/google:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Start Google OAuth flow
 *     responses:
 *       302:
 *         description: Redirect to Google for authentication
 */
router.get('/google', redirectToGoogle);

/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Handle Google OAuth callback and generate JWT
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Google authorization code
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Login successful
 *               data:
 *                 token: "jwt-token"
 *                 user:
 *                   id: "user-id"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get('/google/callback', validateQuery(oauthCallbackSchema), handleGoogleCallback);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user fetched
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticateUser, getCurrentUser);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticateUser, logoutUser);

export default router;

import test from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import authRoute from '../routes/v1/auth.route.js';
import errorHandler from '../middlewares/error.middleware.js';
import Interviewer from '../models/interviewer.model.js';
import { generateToken } from '../utils/jwt.js';

const app = express();
app.use('/api/v1/auth', authRoute);
app.use(errorHandler);

test('GET /auth/google should redirect to Google', async () => {
  const response = await request(app).get('/api/v1/auth/google');
  assert.strictEqual(response.status, 302);
  assert.ok(response.headers.location.includes('accounts.google.com'));
});

test('GET /auth/me should return unauthorized without token', async () => {
  const response = await request(app).get('/api/v1/auth/me');
  assert.strictEqual(response.status, 401);
  assert.strictEqual(response.body.success, false);
});

test('GET /auth/me should return current user with valid token', async () => {
  const user = {
    id: '507f191e810c19729de860ea',
    isActive: true,
    name: 'Test User',
    email: 'test@example.com',
    profilePicture: 'https://example.com/avatar.png',
    lastLoginAt: new Date(),
  };
  const originalFindById = Interviewer.findById;
  Interviewer.findById = async () => user;

  const token = generateToken({ userId: user.id, email: user.email });
  const response = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${token}`);

  Interviewer.findById = originalFindById;

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.success, true);
  assert.strictEqual(response.body.data.email, user.email);
});

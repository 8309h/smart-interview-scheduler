import test from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import errorHandler from '../middlewares/error.middleware.js';
import { generateToken } from '../utils/jwt.js';
import Interviewer from '../models/interviewer.model.js';

const app = express();
app.get('/protected', authenticateUser, (req, res) => res.json({ success: true, user: { id: req.user.id } }));
app.use(errorHandler);

test('authenticateUser should reject missing token', async () => {
  const response = await request(app).get('/protected');
  assert.strictEqual(response.status, 401);
  assert.strictEqual(response.body.success, false);
  assert.strictEqual(response.body.statusCode, 401);
});

test('authenticateUser should accept valid token and attach user', async () => {
  const user = { id: '507f191e810c19729de860ea', isActive: true };
  const originalFindById = Interviewer.findById;
  Interviewer.findById = async () => user;

  const token = generateToken({ userId: user.id, email: 'test@example.com' });
  const response = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);

  Interviewer.findById = originalFindById;

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.success, true);
  assert.strictEqual(response.body.user.id, user.id);
});

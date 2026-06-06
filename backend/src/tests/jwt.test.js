import test from 'node:test';
import assert from 'node:assert';
import { generateToken, verifyToken } from '../utils/jwt.js';

test('JWT utility should generate and verify token payload', () => {
  const payload = { userId: '123', email: 'test@example.com' };
  const token = generateToken(payload);
  assert.ok(token, 'Token should be generated');

  const decoded = verifyToken(token);
  assert.strictEqual(decoded.userId, payload.userId);
  assert.strictEqual(decoded.email, payload.email);
});

test('JWT utility should throw for invalid token', () => {
  assert.throws(() => verifyToken('invalid.token'), { message: 'Invalid or expired token' });
});

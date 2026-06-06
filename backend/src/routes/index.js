import { Router } from 'express';
import healthRoute from './v1/health.route.js';
import authRoute from './v1/auth.route.js';

const router = Router();

router.use('/', healthRoute);
router.use('/auth', authRoute);

export default router;

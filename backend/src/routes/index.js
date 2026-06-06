import { Router } from 'express';
import healthRoute from './v1/health.route.js';

const router = Router();

router.use('/', healthRoute);

export default router;

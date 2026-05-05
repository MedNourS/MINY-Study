// Import Router and all routes
import { Router } from 'express';
import userRouter from './user';
import authRouter from './auth';

const router = Router(); // create the main router

// Import authentication middleware for protected routes
import { authenticateWithJWTCookie } from '../middleware/auth';

// Use all routes
router.use('/users', authenticateWithJWTCookie, userRouter);
router.use('/auth', authRouter);

export default router;

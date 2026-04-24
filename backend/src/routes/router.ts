// Import Router and all routes
import { Router } from 'express';
import userRouter from './user';

const router = Router(); // create the main router

// Use all routes
router.use('/users', userRouter);

export default router;

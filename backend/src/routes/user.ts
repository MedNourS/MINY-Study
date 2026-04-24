import { Router } from 'express';
import { getAllUsers } from '../controllers/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

export default userRouter;

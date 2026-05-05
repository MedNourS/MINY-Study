import { Router } from 'express';
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    const userId: number = Number.parseInt(req.params.id);
    const user = await getUserById(userId);
    res.json(user);
});

userRouter.put('/:id', async (req, res) => {
    const userId: number = Number.parseInt(req.params.id);
    const { firstname, lastname, email, password } = req.body;
    const user = await updateUser(userId, firstname, lastname, email, password);
    res.json(user);
});

userRouter.delete('/:id', async (req, res) => {
    const userId: number = Number.parseInt(req.params.id);
    await deleteUser(userId);
    res.status(204).send('User deleted successfully');
});

export default userRouter;

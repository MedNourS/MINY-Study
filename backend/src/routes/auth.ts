import Router from 'express';
import jwt from 'jsonwebtoken';
import { loginUser, registerUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    loginUser(email, password)
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            }

            const secret =
                process.env.JWT_SECRET || 'supersecretjsonwebtokensecret123';
            const token = jwt.sign({ id: (user as any).id, email }, secret, {
                expiresIn: '1h',
            });

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000,
            });

            res.status(200).json({ message: 'Login successful' });
        })
        .catch((error) => {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

authRouter.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    registerUser(firstName, lastName, email, password)
        .then((user) => {
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

authRouter.delete('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' });
});

export default authRouter;

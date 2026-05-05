import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateWithBearerToken(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Bearer token missing' });
    }

    if (token !== 'token1234') {
        return res.status(403).json({ message: 'Invalid token' });
    }

    next();
}

export function authenticateWithJWTCookie(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.cookies['access_token'];
    if (!token) {
        return res.status(401).json({ message: 'JWT cookie missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

import {AppError} from '@shared/AppError/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    //Bearer

    const [, token] = authHeader.split(' ');

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as { sub: string };
        const { nivel } = decodedToken as { nivel: string };
        const { company_id } = decodedToken as { company_id: string };
    

        req.user = {
            id: sub,
            nivel: nivel,
            company_id: company_id
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}

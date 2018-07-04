import { RequestHandler } from 'express';

export const greet: RequestHandler = (_req, res, _next) => {
    res.json({ message: 'hello' });
};

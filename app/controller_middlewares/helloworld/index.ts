import { RequestHandler } from 'express';

export const greetWorld: RequestHandler = (_req, res, _next) => {
    res.json({ message: 'hello, world' });
};

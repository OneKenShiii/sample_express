import { RequestHandler } from 'express';

export const greetSomeone: RequestHandler = (req, res, _next) => {
    const { name } = req.params;

    res.json({ message: `hello, ${name}` });
};

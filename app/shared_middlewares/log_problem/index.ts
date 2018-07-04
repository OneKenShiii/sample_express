import { ErrorRequestHandler } from 'express';
import { inspect } from 'util';

export function logProblem(log = console.error): ErrorRequestHandler {
    return (error, _req, _res, next) => {
        log(inspect(error));
        next(error);
    };
}

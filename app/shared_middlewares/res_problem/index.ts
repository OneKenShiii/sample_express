import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { inspect } from 'util';

export function getErrorStatusCode(error: any) {
    if (error.isBoom) {
        return error.output.statusCode;
    }

    return INTERNAL_SERVER_ERROR;
}

export const resMessageErrors: ErrorRequestHandler = (error, _req, res, _next) => {
    res
        .status(getErrorStatusCode(error))
        .json({ message: 'something broken', errors: [inspect(error)] });
};

export const resOnlyMessage: ErrorRequestHandler = (error, _req, res, _next) => {
    res
        .status(getErrorStatusCode(error))
        .json({ message: 'something broken' });
};

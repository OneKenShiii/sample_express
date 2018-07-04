import { badData } from 'boom';
import { RequestHandler } from 'express';
import Joi = require('joi');

export function validate(prop: 'body' | 'params' | 'query', schemaMap: Joi.SchemaMap): RequestHandler {
    const schema = Joi.object().keys(schemaMap).required();

    return (req, _res, next) => {
        const { error } = Joi.validate(req[prop], schema);

        if (!(error instanceof Error)) {
            next();
        } else {
            next(badData(error.name, error.details));
        }
    };
}

export function body(schemaMap: Joi.SchemaMap) {
    return validate('body', schemaMap);
}

export function params(schemaMap: Joi.SchemaMap) {
    return validate('params', schemaMap);
}

export function query(schemaMap: Joi.SchemaMap) {
    return validate('query', schemaMap);
}

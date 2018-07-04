import { returnSwitch } from '@ag1/return_switch';
import bodyParser = require('body-parser');
import cors = require('cors');
import express = require('express');
import { Express } from 'express';
import helmet = require('helmet');
import morgan = require('morgan');
import { router } from './routes';
import { logProblem } from './shared_middlewares/log_problem';
import { resMessageErrors, resOnlyMessage } from './shared_middlewares/res_problem';

export function addHelmet(e: Express) {
    return e.use(helmet());
}

export function addCors(e: Express) {
    return e.use(cors());
}

export function addBodyParser(e: Express) {
    return e
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }));
}

export function addMorgan(e: Express) {
    return returnSwitch<() => Express>(process.env.NODE_ENV)([
        ['production', () => e.use(morgan('combined'))],
        ['test', () => e],
        [true, () => e.use(morgan('dev'))],
    ])();
}

export function addRouter(e: Express) {
    return e.use(router);
}

export function addLogProblem(e: Express) {
    return e.use(logProblem());
}

export function addResProblem(e: Express) {
    return returnSwitch<() => Express>(process.env.NODE_ENV)([
        ['production', () => e.use(resOnlyMessage)],
        [true, () => e.use(resMessageErrors)],
    ])();
}

export const app = [
    addHelmet,
    addCors,
    addBodyParser,
    addMorgan,
    addRouter,
    addLogProblem,
    addResProblem,
].reduce((e, middleware) => middleware(e), express());

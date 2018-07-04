import { Router } from 'express';
import { greet } from '../controller_middlewares/hello';
import { greetWorld } from '../controller_middlewares/helloworld';
import { greetSomeone } from '../controller_middlewares/hello|_name';

export function mapPathWithMiddleware(router: Router) {
    router.get('/hello', greet);
    router.get('/hello/:name', greetSomeone);
    router.get('/helloworld', greetWorld);

    return router;
}

export const router = mapPathWithMiddleware(Router());

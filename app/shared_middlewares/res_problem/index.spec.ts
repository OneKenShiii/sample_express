import { badData } from 'boom';
import { getErrorStatusCode } from './index';

it('should get statusCode 500', () => {
    const statusCode = getErrorStatusCode(new Error('foo'));

    expect(statusCode)
        .toBe(500);
});

it('should ger statusCode 422', () => {
    const statusCode = getErrorStatusCode(badData());

    expect(statusCode)
        .toBe(422);
});

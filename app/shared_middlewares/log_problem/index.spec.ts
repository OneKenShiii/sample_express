import { inspect } from 'util';
import { logProblem } from './index';

it('should log error', () => {
    const mockLogFn = jest.fn();
    const middleware = logProblem(mockLogFn);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    const error = new Error('foo');

    middleware(error, mockReq, mockRes, mockNextFn);

    expect(mockLogFn.mock.calls.length)
        .toBe(1);

    expect(mockLogFn.mock.calls[0][0])
        .toBe(inspect(error));
});

it('should call next function with error', () => {
    const mockLogFn = jest.fn();
    const middleware = logProblem(mockLogFn);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    const error = new Error('foo');

    middleware(error, mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length)
        .toBe(1);

    expect(mockNextFn.mock.calls[0][0])
        .toBe(error);
});

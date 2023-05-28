import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const { name, message, stack } = err;

    res.status(500).send(message || 'Internal server error');
};

export default errorHandler;

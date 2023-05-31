import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const { name, message, stack } = err;

    if (err.statusCode < 500 && err.statusCode > 300) {
        return res.status(err.statusCode).send(message);
    }
    

    return res.status(500).send('Internal server error');
};

export default errorHandler;

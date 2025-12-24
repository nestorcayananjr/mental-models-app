import type { Request, Response, NextFunction } from 'express';

const mentalModelController = {
    getHelloWorld: async (req: Request, res: Response, next: NextFunction) => {
        res.locals.payload = "Hello World"
        next();
    }
}

export default mentalModelController;
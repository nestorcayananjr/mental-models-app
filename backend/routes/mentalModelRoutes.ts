import express, { Router } from 'express'
import type { Request, Response } from 'express'
import mentalModelController from '../controllers/mentalModelController.ts';

const mentalModelRouter: Router = express.Router();

mentalModelRouter.get("/", mentalModelController.getHelloWorld, (_req: Request, res: Response) => {
    res.status(200).json(res.locals)
})

export default mentalModelRouter;
import express, { Router } from 'express'
import type { Request, Response } from 'express'
import patternController from '../controllers/patternController.js';

const router: Router = express.Router();

router.get("/", patternController.getHelloWorld, (_req: Request, res: Response) => {
    res.status(200).json(res.locals)
})

router.get("/all", patternController.getAllPatterns, (_req: Request, res: Response) => {
    res.status(200).json(res.locals)
})

router.post("/", patternController.createPattern, (req: Request, res: Response) => {
    res.status(202).json(res.locals)
})

router.patch("/:id", patternController.updatePattern, (req: Request, res: Response) => {
    res.status(200).json(res.locals)
})

router.delete("/:id", patternController.deletePattern, (req: Request, res: Response) => {
    res.status(204).json("Successfully deleted")
})

export default router;
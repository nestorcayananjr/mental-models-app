import type { Request, Response, NextFunction } from 'express';
import type { PatternI, ConfidenceUnionType } from '../types.js'
import { prisma } from '../lib/prisma.js';

const BASE_ERROR_MESSAGE = "Error in patternController - "
const VALID_CONFIDENCE_VALUES = ["ONE", "TWO", "THREE", "FOUR", "FIVE"]

const validateString = (string: unknown) => {
    return string && typeof string === 'string' && string.trim() !== ""
}

const isValidConfidenceValue = (status: string) => {
    return VALID_CONFIDENCE_VALUES.includes(status.toUpperCase())
}

const buildPatternDataObject = (data: PatternI) => {
    const patternDTO = {} as PatternI
    console.log(data.confidence)

    if (validateString(data.name)) patternDTO.name = data.name;
    if (validateString(data.category)) patternDTO.category = data.category;
    if (validateString(data.trigger)) patternDTO.trigger = data.trigger;
    if (validateString(data.problem)) patternDTO.problem = data.problem;
    if (validateString(data.solution)) patternDTO.solution = data.solution;

    if (Array.isArray(data.examples)){
        let validStringArray = true;
        for (const el in data.examples){
            if(!validateString(el)) validStringArray = false;
        }

        if (validStringArray) patternDTO.examples = data.examples;
    }

    if (isValidConfidenceValue(data.confidence)) patternDTO.confidence = data.confidence.toUpperCase() as ConfidenceUnionType

    return patternDTO;
}

const patternController = {
    getHelloWorld: async (req: Request, res: Response, next: NextFunction) => {
        res.locals.payload = "Hello World";
        next();
    },

    getAllPatterns: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allPatterns = await prisma.pattern.findMany();
            res.locals.patterns = allPatterns;
            next()
        } catch (e: unknown) {
            res.status(404)
            throw new Error(BASE_ERROR_MESSAGE +  "getAllPatterns" + (e instanceof Error ? e.message : ""))
        }
    },

    createPattern: async (req: Request, res: Response, next: NextFunction) => {
        const patternObject = buildPatternDataObject(req.body)

        try {
            const newPattern = await prisma.pattern.create({data: patternObject})
            res.locals.newPattern = newPattern;
            next()
        } catch (e: unknown) {
            res.status(404)
            throw new Error(BASE_ERROR_MESSAGE + "createPattern" + (e instanceof Error ? e.message : ""))
        }
    },

    updatePattern: async (req: Request, res: Response, next: NextFunction) => {
        const patternObject = buildPatternDataObject(req.body)
        const patternId = req.params.id

        if (patternId === null || typeof patternId !== "string") throw new Error(BASE_ERROR_MESSAGE + "updatePattern: must pass a pattern id")

        try {
            const updatedPattern = await prisma.pattern.update({
                where: {
                    id: patternId
                }, 
                data: patternObject
            })

            res.locals.updatedPatterns = updatedPattern;
            next()
        } catch (e: unknown){
            res.status(404)
            throw new Error(BASE_ERROR_MESSAGE + "updatePattern" + (e instanceof Error ? e.message : ""))
        }
    },

    deletePattern: async (req: Request, res: Response, next: NextFunction) => {
        const patternId = req.params.id

        if (patternId === null || typeof patternId !== "string") throw new Error(BASE_ERROR_MESSAGE + "updatePattern: must pass a pattern id")

        try {
            await prisma.pattern.delete({
                where: {
                    id: patternId
                }
            })
            next()
        } catch (e: unknown) {
            res.status(404)
            throw new Error(BASE_ERROR_MESSAGE + "deletePattern" + (e instanceof Error ? e.message : ""))
        }
    }
}

export default patternController;
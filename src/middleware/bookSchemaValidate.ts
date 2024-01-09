import { Response, Request, NextFunction } from "express"
import { Middleware } from '../factories/modelSchemaFactory';
import { bookSchema } from "../domain/entities";


export const bookSchemaValidateMW: Middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await bookSchema.parseAsync(req.body)
        next()
    } catch (error) {
        res.status(500).json({ error: `One or more fields of the company schema are invalid.: ${error}` })
    }
}
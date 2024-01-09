import { Request, Response, NextFunction } from 'express'


export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}

const modelSchemaFactory = (middlewares: Middleware[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    middlewares.forEach((middleware) => {
      middleware(req, res, next)
    })
  }
}



export default modelSchemaFactory

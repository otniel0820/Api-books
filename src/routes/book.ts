import { Router } from "express"
import { createBook } from "../controllers"
import { bookSchemaValidateMW } from "../middleware/bookSchemaValidate"
import modelSchemaFactory from "../factories/modelSchemaFactory"


const routeBook: any = Router()

routeBook.post('/book', modelSchemaFactory([bookSchemaValidateMW]), createBook)

export default routeBook
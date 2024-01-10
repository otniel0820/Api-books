import { Router } from "express"
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers"
import { bookSchemaValidateMW } from "../middleware/bookSchemaValidate"
import modelSchemaFactory from "../factories/modelSchemaFactory"


const routeBook: any = Router()

routeBook.get('/book', getBooks)
routeBook.get('/book/:id', getBookById)
routeBook.post('/book', modelSchemaFactory([bookSchemaValidateMW]), createBook)
routeBook.put('/book/:id', updateBook)
routeBook.delete('/book/:id', deleteBook)

export default routeBook
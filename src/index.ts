import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import routeBook from "./routes/book";
import routeUpload from "./routes/uploadFile";

dotenv.config();

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/api', routeBook, routeUpload)
const port = process.env.PORT || 8082;

// app.get("/libros", (_req:Request, res:Response) => {
//     res.send("Bienvenido a la app de libros");
//   });

app.listen(port, () => {
  console.log(`BOOKS_API: Listening on port ${port}`);
});

module.exports = app;
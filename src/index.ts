import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import routeBook from "./routes/book";
import routeUpload from "./routes/uploadFile";
// import routeProtected from "./routes/protectedRoute";

dotenv.config();


const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/api', routeBook, routeUpload)
// app.use('/api', routeProtected)
const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`BOOKS_API: Listening on port ${port}`);
});

module.exports = app;
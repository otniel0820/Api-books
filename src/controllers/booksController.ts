import { generateKsuid } from "../domain/utils";
import { BOOK_ID_PREFIX, BookDTO } from "../domain/entities";
import { db } from "../firebase";
import { Response, Request } from "express";
import { errorFactory } from "../factories/errorFactory";
import { firestore } from "firebase-admin";

// crear libro

const createBook = async (req: Request, res: Response) => {
    try {
        const userRef = db
        .collection("books")
        .doc(generateKsuid(BOOK_ID_PREFIX));
        const time = firestore.FieldValue.serverTimestamp()
        const bookData = req.body
        await userRef.set({
            ...bookData,
            createdAt: time,
        })
        console.log("Document successfully created");
        res.status(200).json({ message: "Document successfully created" });
        
    } catch (error) {
        errorFactory(res, 404);
    }
};



export { createBook };
import { generateKsuid } from "../domain/utils";
import { BOOK_ID_PREFIX, BookDTO } from "../domain/entities";
import { db } from "../firebase";
import { Response, Request } from "express";
import { errorFactory } from "../factories/errorFactory";
import { firestore } from "firebase-admin";

//Obtener todos los libros

const getBooks = (req: Request, res: Response) => {
  db.collection("books")
    .get()
    .then((snapshot: firestore.QuerySnapshot) => {
      const documents: BookDTO[] = [];
      snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
        documents.push({ id: doc.id, ...doc.data() } as any);
        documents.sort((bannerA: BookDTO, bannerB: BookDTO) => {
          return Number(bannerA.id) - Number(bannerB.id);
        });
      });
      res.json(documents);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Error geting document" });
    });
};

// crear libro

const createBook = async (req: Request, res: Response) => {
  try {
    const userRef = db.collection("books").doc(generateKsuid(BOOK_ID_PREFIX));
    const time = firestore.FieldValue.serverTimestamp();
    const bookData = req.body;
    await userRef.set({
      ...bookData,
      createdAt: time,
    });
    console.log("Document successfully created");
    res.status(200).json({ message: "Document successfully created" });
  } catch (error) {
    errorFactory(res, 404);
  }
};

// Actualizar un libro

const updateBook = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const userRef = db.collection("books").doc(id);
    const time = firestore.FieldValue.serverTimestamp();
    const bookData = req.body;
    await userRef.update({ ...bookData, updatedAt: time });
    console.log("Document successfully created");
    res.status(200).json({ message: "Document successfully updated" });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: `Error updating company ${error}` });
  }
};

//Obtener book por id

const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bookRef = db.collection("books").doc(id);

  try {
    const documentSnapshot = await bookRef.get();

    if (documentSnapshot.exists) {
      const bookById = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      } as any;
      res.status(200).json(bookById);
    } else {
      res.status(404).send(errorFactory("Document not found", 404));
    }
  } catch (error) {
    console.error("Error getting book by ID:", error);
    res.status(500).send(errorFactory("Internal server error", 500));
  }
};

//Eliminar libro

const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await db.collection("books").doc(id).delete();
      res.status(200).json({ message: "Deleted book" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: `Error deleting book ${error}` });
    }
  };

export { createBook, getBooks, updateBook, getBookById, deleteBook };

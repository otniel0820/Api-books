import { Response, Request } from "express";
import { getDownloadURL } from "firebase-admin/storage";
import { admin } from "../firebase/admin";


const bucket = admin.storage().bucket("apibooks-2cc67.appspot.com");

//cargar archivos
const uploadFiles = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(404).json({ error: "No file provided.", status: 404 });
  }
  try {
    const file = req.file;
    const fileName = file.originalname;


    // Upload the file to Firebase Storage
    const fileUpload = bucket.file("imgBook/" + fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file?.mimetype,
      }
    });

    stream.on("error", (err) => {
      console.error("Error uploading file:", err);
      res.status(500).json({ error: "Error uploading file." });
    });

    stream.on("finish", async () => {
      // File uploaded successfully, generate the download URL
      const downloadURL = await getDownloadURL(fileUpload);
      res.status(200).json({ data: downloadURL });
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  // assignFile,
  uploadFiles,
};
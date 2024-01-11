import { Router } from "express"
import { uploadFiles } from "../controllers/uploadFileStorage"
import multer from 'multer';



const routeUpload: any = Router()

export const upload = multer({ storage: multer.memoryStorage() });


routeUpload.post('/upload',upload.single('fileImg'), uploadFiles)



export default routeUpload

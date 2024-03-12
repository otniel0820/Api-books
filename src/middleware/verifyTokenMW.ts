// import { Request, Response, NextFunction } from "express";
// import { admin } from "../firebase/admin";
// import { Middleware } from "../factories/modelSchemaFactory";


// export const verifyTokenMW: Middleware = (req: Request, res: Response, next: NextFunction) => {
//   const idToken = req.headers.authorization?.split(" ")[1]


//   admin
//     .auth()
//     .verifyIdToken(idToken || "")
//     .then((decodedToken: any) => {
//         console.log('decodeToken:', decodedToken);
        
//       admin.auth().getUser(decodedToken.uid)

//       next();
//     })
//     .catch((error: any) => {
//       res.status(401).json({ error: `Invalid Token: ${error}` }) 
//     });
// }


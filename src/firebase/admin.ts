import admin from "firebase-admin"
import {
  initializeApp,
  ServiceAccount,
  applicationDefault,
  cert,
} from "firebase-admin/app";

if (process.env.NODE_ENV !== "production") {
  try {
    const serviceAccount = require("../../serviceAccount.json");
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (e) {
    console.log(e);
  }
} else {
  initializeApp({
    credential: applicationDefault(),
  });
}
const db = admin.firestore();


export { admin, db };

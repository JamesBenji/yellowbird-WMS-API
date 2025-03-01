import * as admin from "firebase-admin";
import { config } from "dotenv";

config();

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n")
}

export const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    return admin.app();
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw new Error("Failed to initialize Firebase services");
  }
};
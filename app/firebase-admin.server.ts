import * as admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseClientConfig = {
  apiKey: process.env.CLIENT_FIREBASE_PROJECT_WEB_API_KEY,
  projectId: process.env.CLIENT_FIREBASE_PROJECT_ID,
  authDomain: process.env.CLIENT_FIREBASE_AUTH_DOMAIN,
};

// TODO error-handling
if (!process.env.SERVER_FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(
    `Environment variable "SERVER_APP_FIREBASE_SERVICE_ACCOUNT" is missing`
  );
}

const serviceAccountConfig = JSON.parse(
  process.env.SERVER_FIREBASE_SERVICE_ACCOUNT
);

const adminApp =
  getApps().length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert({ ...serviceAccountConfig }),
      })
    : getApp();

export const db = getFirestore(adminApp);
export const auth = admin.auth(adminApp);

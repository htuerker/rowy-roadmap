import * as admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseClientConfig = {
  apiKey: process.env.CLIENT_FIREBASE_PROJECT_WEB_API_KEY,
  projectId: process.env.CLIENT_FIREBASE_PROJECT_ID,
  authDomain: process.env.CLIENT_FIREBASE_AUTH_DOMAIN,
};

const serviceAccountConfig: {} | null = process.env
  .SERVER_FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.SERVER_FIREBASE_SERVICE_ACCOUNT)
  : null;

let adminApp;
if (serviceAccountConfig) {
  adminApp =
    getApps().length === 0
      ? admin.initializeApp({
          credential: admin.credential.cert({ ...serviceAccountConfig }),
        })
      : getApp();
}

export const db = adminApp ? getFirestore(adminApp) : null;
export const auth = adminApp ? admin.auth(adminApp) : null;

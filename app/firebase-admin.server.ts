import * as admin from "firebase-admin";
import { getApps, getApp } from "firebase-admin/app";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getFirestore } from "firebase-admin/firestore";

class RoadmapItem {
  constructor(
    readonly id: string,
    readonly feature: string,
    readonly description: string,
    readonly status: string,
    readonly votesSummary: any,
    readonly updatedBy: any,
    readonly createdBy: any
  ) {}

  static fromFirestore(snapshot: QueryDocumentSnapshot): RoadmapItem {
    const data = snapshot.data()!;
    return new RoadmapItem(
      snapshot.ref.id,
      data.feature,
      data.description,
      data.status,
      data.votesSummary,
      data._updatedBy,
      data._createdBy
    );
  }
}

// const mockData = [
//   {
//     id: 1,
//     feature: "Pied Piper Integration",
//     description:
//       "We would love to have an integration with the world's best compression software!",
//     status: "In Progress",
//     votesSummary: { Yes: 2, Meh: 1, Urgent: 5 },
//   },
//   {
//     id: 2,
//     feature: "Custom Fields",
//     description: "We need to be able to add custom fields to the forms.",
//     status: "Complete",
//     votesSummary: { Yes: 2, Meh: 2, Urgent: 5 },
//   },
//   {
//     id: 3,
//     feature: "Social media shares",
//     description:
//       "Would be cool if our users can share the content from the app.",
//     status: "Pending",
//     votesSummary: { Yes: 2, Meh: 5, Urgent: 1 },
//   },
//   {
//     id: 4,
//     feature: "Pied Piper Integration",
//     description:
//       "We would love to have an integration with the world's best compression software!",
//     status: "In Progress",
//     votesSummary: { Yes: 2, Meh: 1, Urgent: 5 },
//   },
//   {
//     id: 5,
//     feature: "Custom Fields",
//     description: "We need to be able to add custom fields to the forms.",
//     status: "Complete",
//     votesSummary: { Yes: 2, Meh: 2, Urgent: 5 },
//   },
//   {
//     id: 6,
//     feature: "Social media shares",
//     description:
//       "Would be cool if our users can share the content from the app.",
//     status: "Pending",
//     votesSummary: { Yes: 2, Meh: 5, Urgent: 1 },
//   },
// ];

export const firebaseClientConfig = {
  apiKey: process.env.CLIENT_FIREBASE_PROJECT_WEB_API_KEY,
  projectId: process.env.CLIENT_FIREBASE_PROJECT_ID,
  authDomain: process.env.CLIENT_FIREBASE_AUTH_DOMAIN,
};

const serviceAccount = require("./service-account.json");
const adminApp =
  getApps().length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : getApp();

const db = getFirestore(adminApp);
export const auth = admin.auth(adminApp);

async function getAll() {
  const ref = db.collection("Roadmap");
  const snapshot = await ref.get();

  return snapshot.docs.map(RoadmapItem.fromFirestore);
}

async function submitVote({ docId, vote }: any) {
  return fetch(process.env.ROWY_VOTE_WEBHOOK_URL!, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      docId: docId,
      vote: "yes",
    }),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export { getAll, submitVote };

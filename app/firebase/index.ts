import { initializeApp, getApps, getApp } from "firebase/app";
import type { QueryDocumentSnapshot } from "firebase/firestore/lite";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import "firebase/firestore";

class Item {
  constructor(
    readonly id: string,
    readonly feature: string,
    readonly description: string,
    readonly status: string,
    readonly votesSummary: any
  ) {}

  static fromFirestore(snapshot: QueryDocumentSnapshot): Item {
    const data = snapshot.data()!;
    return new Item(
      snapshot.ref.id,
      data.feature,
      data.description,
      data.status,
      data.votesSummary
    );
  }
}

const mockData = [
  {
    id: 1,
    feature: "Pied Piper Integration",
    description:
      "We would love to have an integration with the world's best compression software!",
    status: "In Progress",
    votesSummary: { Yes: 2, Meh: 1, Urgent: 5 },
  },
  {
    id: 2,
    feature: "Custom Fields",
    description: "We need to be able to add custom fields to the forms.",
    status: "Complete",
    votesSummary: { Yes: 2, Meh: 2, Urgent: 5 },
  },
  {
    id: 3,
    feature: "Social media shares",
    description:
      "Would be cool if our users can share the content from the app.",
    status: "Pending",
    votesSummary: { Yes: 2, Meh: 5, Urgent: 1 },
  },
];

const config = {
  apiKey: process.env.FIREBASE_PROJECT_WEB_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = getApps().length === 0 ? initializeApp(config) : getApp();

async function getAll() {
  // const ref = collection(getFirestore(app), "Roadmap");
  // const snapshot = await getDocs(ref);
  // const items = snapshot.docs.map(Item.fromFirestore);
  // return items;
  return mockData;
}

async function submitVote({ docId, vote }: any) {
  // return fetch(process.env.ROWY_VOTE_WEBHOOK_URL!, {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   method: "POST",
  //   body: JSON.stringify({
  //     docId: docId,
  //     vote: "yes",
  //   }),
  // });
}

export { getAll, submitVote };

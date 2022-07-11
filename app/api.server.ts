import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import { db } from "./firebase-admin.server";

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

  static fromFirestore(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): RoadmapItem {
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

export async function getAll() {
  const ref = db.collection("Roadmap");
  const snapshot = await ref.get();

  return snapshot.docs.map(RoadmapItem.fromFirestore);
}

export async function getItem(id: string) {
  const ref = db.collection("Roadmap").doc(id);
  const data = await ref.get();
  return RoadmapItem.fromFirestore(data);
}

export async function getVotes(id: string) {
  const ref = db.collection("Roadmap").doc(id).collection("votes");
  const snapshot = await ref.get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function getLogs(id: string) {
  const ref = db.collection("Roadmap").doc(id).collection("logs");
  const snapshot = await ref.get();
  return snapshot.docs;
}

export async function createVote({ docId, vote }: any) {
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

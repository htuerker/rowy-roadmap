import { getUser } from "~/session.server";
import { db } from "./firebase-admin.server";
import { RoadmapItem } from "./models/RoadmapItem";
import { Vote } from "./models/Vote";

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
  return snapshot.docs.map(Vote.fromFirestore);
}

export async function createVote(request: Request, { itemId, vote }: any) {
  const currentUser = await getUser(request);
  if (!currentUser) {
    throw new Error("Authentication required to vote!");
  }

  const ref = db.collection("Roadmap").doc(itemId).collection("votes");
  ref.add({ vote, comment: "Hello, World", createdBy: "Burhan" });
  // if current user has already voted
  // update vote if it is changed
  // else throw error
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
  // })
  //   .then((response) => console.log(response))
  //   .catch((error) => console.log(error));
}

import { collectionName, schemaName } from "./constants/index";
import { redirect } from "@remix-run/node";
import { getUser } from "~/session.server";
import { db } from "./firebase-admin.server";
import { RoadmapItem } from "./models/RoadmapItem";
import { TimelogItem } from "./models/TimelogItem";
import { User } from "./models/User";
import { UserVote } from "./models/UserVote";
import { Vote } from "./models/Vote";

export async function getSchema() {
  const schemaRef = db
    .collection("_rowy_")
    .doc("settings")
    .collection("schema")
    .doc(schemaName);
  const schemaSnapshot = await schemaRef.get();
  return schemaSnapshot.data();
}
export async function getStatusOptions() {
  const schema = await getSchema();
  if (!schema) {
    throw new Error("Couldn't find schema!");
  }
  const options = schema.columns?.status?.config?.options;
  return options;
}

export async function getAll(
  request: Request,
  options?: { status?: string | null }
) {
  const currentUser = await getUser(request);
  const itemsRef = options?.status
    ? db.collection(collectionName).where("status", "==", options.status)
    : db.collection(collectionName);
  const userVotesRef =
    currentUser &&
    db.collectionGroup("votes").where("_createdBy.uid", "==", currentUser.uid);

  const [itemsSnaphot, userVotesSnaphot] = await Promise.all([
    itemsRef.get(),
    userVotesRef?.get(),
  ]);
  return [
    itemsSnaphot.docs.map(RoadmapItem.fromFirestore),
    userVotesSnaphot?.docs.map(UserVote.fromFirestore),
  ];
}

export async function getItem(id: string) {
  const ref = db.collection(collectionName).doc(id);
  const data = await ref.get();
  return RoadmapItem.fromFirestore(data);
}

export async function getVotes(id: string) {
  const ref = db.collection(collectionName).doc(id).collection("votes");
  const snapshot = await ref.get();
  return snapshot.docs.map(Vote.fromFirestore);
}

export async function getTimelog(id: string) {
  const ref = db.collection(collectionName).doc(id).collection("timelog");
  const snapshot = await ref.get();
  return snapshot.docs.map(TimelogItem.fromFirestore);
}

export async function createVote(
  request: Request,
  { itemId, vote, comment }: any
) {
  const currentUser = await getUser(request);
  // TODO error handling / redirect to login
  if (!currentUser) {
    throw redirect("/auth/login");
    // throw new Error("User is not authenticated");
  }

  const votesRef = db
    .collection(collectionName)
    .doc(itemId)
    .collection("votes");
  const userVoteRef = db
    .collection(collectionName)
    .doc(itemId)
    .collection("votes")
    .where("_createdBy.uid", "==", currentUser.uid);
  const userVoteSnap = await userVoteRef.get();
  if (userVoteSnap.docs[0]) {
    // alrady voted
    const currentVote = Vote.fromFirestore(userVoteSnap.docs[0]);
    if (currentVote.vote !== vote) {
      // update vote if changed
      await Promise.all(
        userVoteSnap.docs.map((doc) => doc.ref.update({ vote }))
      );
    } else {
      // delete vote if
      await Promise.all(userVoteSnap.docs.map((doc) => doc.ref.delete()));
    }
  } else {
    // create new vote
    await votesRef.add({
      vote,
      comment,
      _createdBy: User.toFirestore(currentUser),
    });
  }
}

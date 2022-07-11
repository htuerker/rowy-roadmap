import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";

export class Vote {
  constructor(
    readonly vote: string,
    readonly comment: string,
    readonly email: string,
    readonly createdAt: any,
    readonly createdBy: any
  ) {}

  static fromFirestore(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Vote {
    const data = snapshot.data();
    if (!data) {
      throw new Error("Invalid RoadmapItem");
    }
    return new Vote(
      data.vote,
      data.comment,
      data.email,
      data.createdAt,
      data.createdBy
    );
  }
  static toFirestore(object: Vote) {}
}

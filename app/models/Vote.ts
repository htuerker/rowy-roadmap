import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
  Timestamp,
} from "firebase-admin/firestore";
import { User } from "./User";

export class Vote {
  constructor(
    readonly vote: string,
    readonly comment: string,
    readonly email: string,
    readonly createdAt: Timestamp,
    readonly createdBy: User
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
      data._createdAt,
      User.fromAuditField(data._createdBy)
    );
  }
  static toFirestore(object: Vote) {}
}

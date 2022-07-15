import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import { User } from "./User";

export class RoadmapItem {
  constructor(
    readonly id: string,
    readonly feature: string,
    readonly description: string,
    readonly status: string,
    readonly votesSummary: any,
    readonly updatedBy: User,
    readonly createdBy: User
  ) {}

  static fromFirestore(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): RoadmapItem {
    const data = snapshot.data();
    if (!data) {
      throw new Error("Invalid RoadmapItem");
    }
    return new RoadmapItem(
      snapshot.ref.id,
      data.feature,
      data.description,
      data.status,
      data.votesSummary,
      User.fromAuditField(data._createdBy),
      User.fromAuditField(data._updatedBy)
    );
  }
}

import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";

export class RoadmapItem {
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
      data._updatedBy,
      data._createdBy
    );
  }
}

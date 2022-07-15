import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import { User } from "./User";

export class Timelog {
  constructor(readonly actor: User, readonly changedFields: any[]) {}

  static fromFirestore(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Timelog {
    const data = snapshot.data();
    if (!data) {
      throw new Error("Invalid Timelog");
    }
    return new Timelog(User.fromAuditField(data.actor), data.changedFields);
  }
}

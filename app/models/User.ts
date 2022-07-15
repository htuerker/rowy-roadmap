import type { Timestamp, DocumentData } from "firebase-admin/firestore";
import type { DecodedIdToken } from "firebase-admin/auth";

export class User {
  constructor(
    readonly displayName: string,
    readonly email: string,
    readonly emailVerified: boolean,
    readonly photoURL: string,
    readonly roles: String[],
    readonly uid: string,
    // required for audit users
    readonly timestamp?: Timestamp
  ) {}

  static fromAuditField(data: DocumentData): User {
    return new User(
      data.displayName,
      data.email,
      data.emailVerified,
      data.photoURL,
      data.roles,
      data.uid,
      data.timestamp
    );
  }
  static fromDecodedIdToken(decodedIdToken: DecodedIdToken): User {
    return new User(
      decodedIdToken.name,
      decodedIdToken.email ?? "",
      decodedIdToken.email_verified ?? false,
      decodedIdToken.picture ?? "",
      decodedIdToken.roles ?? [],
      decodedIdToken.uid
    );
  }
}

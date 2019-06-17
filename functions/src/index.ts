import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

// https://firebase.google.com/docs/functions/typescript

export const onCreateLink = functions.firestore
  .document("links/{linkId}")
  .onCreate(async (document: DocumentSnapshot) => {
    await document.ref.update("created", admin.firestore.Timestamp.now());
  });

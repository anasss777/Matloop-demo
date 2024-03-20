"use client";

import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { useEffect } from "react";

const JustTesting = () => {
  // useEffect(() => {
  //   const postRef = firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc("s5U3gZlLKmq5MhFwjupX");

  //   postRef
  //     .get()
  //     .then((doc: firebase.firestore.DocumentSnapshot) => {
  //       if (doc.exists) {
  //         const commentsIds = doc
  //           ?.data()
  //           ?.comments?.map((comment: Comment) => comment.id);
  //         const commentsRefs = commentsIds?.map((commentId: string) =>
  //           firebase.firestore().doc(`comments/${commentId}`)
  //         );

  //         // Delete each comment
  //         commentsRefs.forEach(
  //           (commentRef: firebase.firestore.DocumentReference) => {
  //             // Get the comment document
  //             commentRef
  //               .get()
  //               .then((commentDoc: firebase.firestore.DocumentSnapshot) => {
  //                 if (commentDoc.exists) {
  //                   // Get the file paths
  //                   const uploadedImages =
  //                     commentDoc.data()?.uploadedImages || [];
  //                   const uploadedFiles =
  //                     commentDoc.data()?.uploadedFiles || [];

  //                   // Delete each file
  //                   [...uploadedImages, ...uploadedFiles].forEach(
  //                     (filePath: string) => {
  //                       firebase
  //                         .storage()
  //                         .ref(filePath)
  //                         .delete()
  //                         .then(() => {
  //                           console.log("File deleted successfully.");
  //                         })
  //                         .catch((error: any) => {
  //                           console.error("Error deleting file: ", error);
  //                         });
  //                     }
  //                   );
  //                 } else {
  //                   console.log("No such comment document!");
  //                 }
  //               })
  //               .catch((error: any) => {
  //                 console.log("Error getting comment document:", error);
  //               });
  //           }
  //         );
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  const deleteAFile = (filePath: string) => {
    firebase
      .storage()
      .refFromURL(filePath)
      .delete()
      .then(() => {
        console.log("File deleted successfully.");
      })
      .catch((error: any) => {
        console.error("Error deleting file: ", error);
      });
  };

  return (
    <div>
      <button
        className={`btn`}
        onClick={() =>
          deleteAFile(
            "https://firebasestorage.googleapis.com/v0/b/matloop-33263.appspot.com/o/files%2FTurkish%20homework.pdf?alt=media&token=c562424e-3f22-4e9f-a509-a43db351459c"
          )
        }
      >
        Delete a file from storage
      </button>
    </div>
  );
};

export default JustTesting;

import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { DevicePost } from "@/types/post";
import { Profile } from "@/types/profile";

type Props = {
  poster: Profile;
  postTitle: string;
  deviceType: string;
  deviceBrand: string;
  minPrice: string;
  maxPrice: string;
  deviceCondition: string[];
  deviceOS: string;
  deviceStorage: string;
  selectedCountry: string;
  city: string;
  description: string;
};

type PropsEdit = {
  postId: string;
  postTitle: string;
  deviceType: string;
  deviceBrand: string;
  minPrice: string;
  maxPrice: string;
  deviceCondition: string[];
  deviceOS: string;
  deviceStorage: string;
  selectedCountry: string;
  city: string;
  description: string;
};

export const addDevicePost = ({
  poster,
  postTitle,
  deviceType,
  deviceBrand,
  minPrice,
  maxPrice,
  deviceCondition,
  deviceOS,
  deviceStorage,
  selectedCountry,
  city,
  description,
}: Props) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const docRefProfiles = firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid);
      docRefProfiles
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log("User found!");
            let newPostRef = firebase
              .firestore()
              .collection("electronicDevices")
              .doc();

            await newPostRef
              .set({
                postId: newPostRef.id,
                poster,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                postTitle,
                deviceType,
                deviceBrand,
                priceRange: [Number(minPrice), Number(maxPrice)],
                deviceCondition,
                deviceOS,
                deviceStorage,
                region: `${selectedCountry}, ${city}`,
                description,
                isPromoted: false,
                category: "electronicDevices",
              })
              .then(async () => {
                console.log("Document written with ID: ", newPostRef.id);
                await firebase
                  .firestore()
                  .collection("profiles")
                  .doc(docRefProfiles.id)
                  .update({
                    electronicDevicesPosts:
                      firebase.firestore.FieldValue.arrayUnion(newPostRef.id),
                  });
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
};

export const EditDevicePost = async ({
  postId,
  postTitle,
  deviceType,
  deviceBrand,
  minPrice,
  maxPrice,
  deviceCondition,
  deviceOS,
  deviceStorage,
  selectedCountry,
  city,
  description,
}: PropsEdit) => {
  const postRef = firebase
    .firestore()
    .collection("electronicDevices")
    .doc(postId);

  // Fetch the current data of the post
  const doc = await postRef.get();
  if (!doc.exists) {
    console.log("Post does not exist!");
    return;
  }

  // update data
  postRef
    .update({
      postTitle,
      deviceType,
      deviceBrand,
      priceRange: [Number(minPrice), Number(maxPrice)],
      deviceCondition,
      deviceOS,
      deviceStorage,
      region: `${selectedCountry}, ${city}`,
      description,
    })
    .then(() => {
      console.log("Post updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating post: ", error);
    });
};

export const deleteDevicePost = (post: DevicePost) => {
  const postRef = firebase
    .firestore()
    .collection("electronicDevices")
    .doc(post.postId);

  postRef
    .get()
    .then(async (doc: firebase.firestore.DocumentSnapshot) => {
      if (doc.exists) {
        const commentsIds = doc
          ?.data()
          ?.comments?.map((comment: Comment) => comment.id);
        const commentsRefs = commentsIds?.map((commentId: string) =>
          firebase.firestore().doc(`comments/${commentId}`)
        );

        // Delete Comments' files and images from Firebase Storage
        if (commentsRefs) {
          const commentSnaps = await Promise.all(
            commentsRefs.map(
              async (
                ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
              ) => await ref.get()
            )
          );

          const commentsData: Comment[] = commentSnaps?.map(
            (commentSnap) => ({ ...commentSnap.data() } as Comment)
          );

          commentsData.forEach((commentData) => {
            const singleCommentAllFiles = [
              ...commentData.uploadedImages,
              ...commentData.uploadedFiles,
            ];

            singleCommentAllFiles.forEach((filePath) => {
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
            });
          });
        } else {
          console.log("commentsRefs not found!");
        }

        // Delete each comment
        if (commentsRefs) {
          commentsRefs.forEach(
            (commentRef: firebase.firestore.DocumentReference) => {
              commentRef
                .delete()
                .then(() => {
                  console.log("Comment deleted successfully.");
                })
                .catch((error: any) => {
                  console.error("Error deleting comment: ", error);
                });
            }
          );
        }

        // Remove the post id from the user's document
        const userRef = firebase
          .firestore()
          .collection("profiles")
          .doc(post.poster.userId);

        userRef
          .update({
            electronicDevicesPosts: firebase.firestore.FieldValue.arrayRemove(
              post.postId
            ),
          })
          .then(() => {
            console.log(
              "Post ID removed successfully from the user's document."
            );
          })
          .catch((error: any) => {
            console.error("Error removing post ID: ", error);
          });

        // Delete post
        postRef
          .delete()
          .then(() => {
            console.log("Post deleted successfully.");
          })
          .catch((error: any) => {
            console.error("Error deleting post: ", error);
          });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error: any) => {
      console.log("Error getting document:", error);
    });
};

export const addDeviceComment = async (
  post: DevicePost,
  content: string,
  commentor: Profile,
  uploadedImages: FileList | null,
  uploadedFiles: FileList | null
) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const docRefProfiles = firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid);
      docRefProfiles
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log("User found!");

            // Upload images and get their download URLs
            let imageUrls = [];
            if (uploadedImages) {
              for (let i = 0; i < uploadedImages.length; i++) {
                let imageRef = firebase
                  .storage()
                  .ref()
                  .child(`images/${uploadedImages[i].name}`);
                await imageRef.put(uploadedImages[i]);
                let url = await imageRef.getDownloadURL();
                imageUrls.push(url);
              }
            }

            // Upload files and get their download URLs
            let fileUrls = [];
            if (uploadedFiles) {
              for (let i = 0; i < uploadedFiles.length; i++) {
                let fileRef = firebase
                  .storage()
                  .ref()
                  .child(`files/${uploadedFiles[i].name}`);
                await fileRef.put(uploadedFiles[i]);
                let url = await fileRef.getDownloadURL();
                fileUrls.push(url);
              }
            }

            let docRefComment = await firebase
              .firestore()
              .collection("comments")
              .add({
                content,
                commentor,
                uploadedImages: imageUrls,
                uploadedFiles: fileUrls,
              });

            await docRefComment.update({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              commentId: docRefComment.id,
            });

            console.log("Document written with ID: ", docRefComment.id);

            // Add the whole comment document to the post
            await firebase
              .firestore()
              .collection("electronicDevices")
              .doc(post.postId)
              .update({
                comments:
                  firebase.firestore.FieldValue.arrayUnion(docRefComment),
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
};

export const deleteDeviceComment = async (
  post: DevicePost,
  commentId: string
) => {
  const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const docRefProfiles = firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid);
      docRefProfiles
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log("User found!");

            // Get the comment document
            let docRefComment = firebase
              .firestore()
              .collection("comments")
              .doc(commentId);

            const comment = await docRefComment.get();

            if (!comment?.exists) {
              console.log("No such comment!");
              return;
            }

            // Delete images and files from Firebase storage
            const { uploadedImages, uploadedFiles } = comment.data() as Comment;

            const deleteFromStorage = async (url: string) => {
              let fileRef = firebase.storage().refFromURL(url);
              await fileRef.delete();
            };

            if (uploadedImages) {
              for (let url of uploadedImages) {
                await deleteFromStorage(url);
              }
            }

            if (uploadedFiles) {
              for (let url of uploadedFiles) {
                await deleteFromStorage(url);
              }
            }

            // Remove the comment reference from the electronicDevices document
            await firebase
              .firestore()
              .collection("electronicDevices")
              .doc(post.postId)
              .update({
                comments:
                  firebase.firestore.FieldValue.arrayRemove(docRefComment),
              });

            // Delete the comment document
            await docRefComment.delete();

            console.log("Comment deleted with ID: ", commentId);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
};

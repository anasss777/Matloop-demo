import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { RealEstatePost } from "@/types/post";
import { Profile } from "@/types/profile";

type Props = {
  poster: Profile;
  postTitle: string;
  propertyType: string;
  ownershipType: string;
  rentType: string;
  selectedCountry: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  numberOfRooms: string;
  minAge: string;
  maxAge: string;
  description: string;
  language: string;
};

type PropsEdit = {
  postId: string;
  postTitle: string;
  propertyType: string;
  ownershipType: string;
  rentType: string;
  selectedCountry: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  numberOfRooms: string;
  minAge: string;
  maxAge: string;
  description: string;
};

export const addRealEstatePost = ({
  poster,
  postTitle,
  propertyType,
  ownershipType,
  rentType,
  selectedCountry,
  city,
  minPrice,
  maxPrice,
  numberOfRooms,
  minAge,
  maxAge,
  description,
  language,
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
              .collection("realEstatePosts")
              .doc();

            await newPostRef
              .set({
                postId: newPostRef.id,
                poster,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                postTitle,
                propertyType,
                ownershipType,
                rentType,
                address: `${selectedCountry}, ${city}`,
                priceRange: [Number(minPrice), Number(maxPrice)],
                numberOfRooms,
                ageRange: [Number(minAge) || 0, Number(maxAge) || 0],
                description,
                isPromoted: false,
                category: "realEstates",
                language,
              })
              .then(async () => {
                console.log("Document written with ID: ", newPostRef.id);
                await firebase
                  .firestore()
                  .collection("profiles")
                  .doc(docRefProfiles.id)
                  .update({
                    realEstatePosts: firebase.firestore.FieldValue.arrayUnion(
                      newPostRef.id
                    ),
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

export const EditRealEstatePost = async ({
  postId,
  postTitle,
  propertyType,
  ownershipType,
  rentType,
  selectedCountry,
  city,
  minPrice,
  maxPrice,
  numberOfRooms,
  minAge,
  maxAge,
  description,
}: PropsEdit) => {
  const postRef = firebase
    .firestore()
    .collection("realEstatePosts")
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
      propertyType,
      ownershipType,
      rentType,
      address: `${selectedCountry}, ${city}`,
      priceRange: [Number(minPrice), Number(maxPrice)],
      numberOfRooms,
      ageRange: [Number(minAge), Number(maxAge)],
      description,
    })
    .then(() => {
      console.log("Post updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating post: ", error);
    });
};

export const deleteRealEstatePost = (post: RealEstatePost) => {
  const postRef = firebase
    .firestore()
    .collection("realEstatePosts")
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
            realEstatePosts: firebase.firestore.FieldValue.arrayRemove(
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

export const addRealEstateComment = async (
  post: RealEstatePost,
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
                let timestamp = new Date().getTime();
                let fileName = `${timestamp}_${uploadedImages[i].name}`;
                let imageRef = firebase
                  .storage()
                  .ref()
                  .child(`images/${fileName}`);
                await imageRef.put(uploadedImages[i]);
                let url = await imageRef.getDownloadURL();
                imageUrls.push(url);
              }
            }

            // Upload files and get their download URLs
            let fileUrls = [];
            if (uploadedFiles) {
              for (let i = 0; i < uploadedFiles.length; i++) {
                let timestamp = new Date().getTime();
                let fileName = `${timestamp}_${uploadedFiles[i].name}`;
                let fileRef = firebase
                  .storage()
                  .ref()
                  .child(`files/${fileName}`);
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
              .collection("realEstatePosts")
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

export const deleteRealEstateComment = async (
  post: RealEstatePost,
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

            // Remove the comment reference from the realEstatePosts document
            await firebase
              .firestore()
              .collection("realEstatePosts")
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

import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { CarPost } from "@/types/post";
import { Profile } from "@/types/profile";

type Props = {
  poster: Profile;
  postTitle: string;
  carBrand: string;
  carType: string[];
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  maxDistance: string;
  gearType: string[];
  selectedCountry: string;
  city: string;
  fuelType: string[];
  description: string;
};

type PropsEdit = {
  postId: string;
  postTitle: string;
  carBrand: string;
  carType: string[];
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  maxDistance: string;
  gearType: string[];
  selectedCountry: string;
  city: string;
  fuelType: string[];
  description: string;
};

export const addCarPost = ({
  poster,
  postTitle,
  carBrand,
  carType,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  maxDistance,
  gearType,
  selectedCountry,
  city,
  fuelType,
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
            let newPostRef = firebase.firestore().collection("posts").doc();

            await newPostRef
              .set({
                postId: newPostRef.id,
                poster,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                postTitle,
                carBrand,
                carType,
                priceRange: [Number(minPrice), Number(maxPrice)],
                yearRange: [
                  Number(minYear) || undefined,
                  Number(maxYear) || undefined,
                ],
                maxDistance,
                gearType,
                region: `${selectedCountry}, ${city}`,
                fuelType,
                description,
                isPromoted: false,
                category: "cars",
              })
              .then(async () => {
                console.log("Document written with ID: ", newPostRef.id);
                await firebase
                  .firestore()
                  .collection("profiles")
                  .doc(docRefProfiles.id)
                  .update({
                    posts: firebase.firestore.FieldValue.arrayUnion(
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

export const EditCarPost = async ({
  postId,
  postTitle,
  carBrand,
  carType,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  maxDistance,
  gearType,
  selectedCountry,
  city,
  fuelType,
  description,
}: PropsEdit) => {
  const postRef = firebase.firestore().collection("posts").doc(postId);

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
      carBrand,
      carType,
      priceRange: [Number(minPrice), Number(maxPrice)],
      yearRange: [Number(minYear) || undefined, Number(maxYear) || undefined],
      maxDistance,
      gearType,
      region: `${selectedCountry}, ${city}`,
      fuelType,
      description,
    })
    .then(() => {
      console.log("Post updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating post: ", error);
    });
};

export const addComment = async (
  post: CarPost,
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
              .collection("posts")
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

export const deletePost = (post: CarPost) => {
  const postRef = firebase.firestore().collection("posts").doc(post.postId);

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

        // Remove the post id from the user's document
        const userRef = firebase
          .firestore()
          .collection("profiles")
          .doc(post.poster.userId);

        userRef
          .update({
            posts: firebase.firestore.FieldValue.arrayRemove(post.postId),
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

export const deleteAllPosts = () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("carsPosts");

  collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  });
};

export const deleteAllProfiles = () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("profiles");

  collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  });
};

import firebase from "@/firebase";

type Props = {
  image: File;
  profileID: string;
};

export const updateProfileImage = async ({ image, profileID }: Props) => {
  const profileRef = firebase.firestore().collection("profiles").doc(profileID);

  // Fetch the current data of the profile
  const doc = await profileRef.get();
  if (!doc.exists) {
    console.log("Profile does not exist!");
    return;
  }

  const docData = doc.data();
  if (!docData) {
    console.log("No data found in the document!");
    return;
  }

  // Create a reference to the file in Firebase Storage
  const storageRef = firebase.storage().ref();

  if (docData.profileImageSrc) {
    let oldImageSrc;

    // Check if docData.profileImageSrc is a full URL or a path
    try {
      new URL(docData.profileImageSrc);
      // If no error is thrown, docData.profileImageSrc is a full URL
      oldImageSrc = firebase.storage().refFromURL(docData.profileImageSrc);
    } catch (_) {
      // If an error is thrown, docData.profileImageSrc is a path
      oldImageSrc = storageRef.child(docData.profileImageSrc);
    }

    // Delete the old image from Firebase Storage
    oldImageSrc
      .delete()
      .then(() => {
        console.log("Old image deleted successfully!");
        uploadNewImage();
      })
      .catch((error) => {
        console.error("Error deleting old image: ", error);
      });
  } else {
    uploadNewImage();
  }

  function uploadNewImage() {
    const newImageRef = storageRef.child(
      `images/${profileID}/${image.name}${profileID}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(image).then((snapshot) => {
      console.log(`Uploaded a ${image.name} image!`);

      // Get the download URL of the image and update the profile
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        profileRef
          .update({
            profileImageSrc: downloadURL,
          })
          .then(() => {
            console.log("Profile updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating profile: ", error);
          });
      });
    });
  }
};

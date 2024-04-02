import firebase from "@/firebase";
import { Profile } from "@/types/profile";

type Props = {
  poster: Profile;
  postTitle: string;
  theType: string;
  theBrand: string;
  minPrice: string;
  maxPrice: string;
  deviceCondition: string[];
  theOS: string;
  theStorage: string;
  selectedCountry: string;
  city: string;
  description: string;
};

export const addDevicePost = ({
  poster,
  postTitle,
  theType,
  theBrand,
  minPrice,
  maxPrice,
  deviceCondition,
  theOS,
  theStorage,
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
                theType,
                theBrand,
                priceRange: [Number(minPrice), Number(maxPrice)],
                deviceCondition,
                theOS,
                theStorage,
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
